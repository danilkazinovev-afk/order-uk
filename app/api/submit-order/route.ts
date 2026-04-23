import { createClient } from '@supabase/supabase-js'

interface ContactInfo {
  firstName: string
  lastName: string
  email: string
  company: string
}

interface OrderItem {
  article: string
  barcode: string
  sku: string
  categoryName: string
  boxes: number
  packs: number
  pallets: number
  weightGross: number
  totalValue: number
}

interface Totals {
  boxes: number
  packs: number
  pallets: number
  weightGross: number
  totalValue: number
}

interface SubmitOrderBody {
  clientName: string
  contact: ContactInfo
  items: OrderItem[]
  totals: Totals
}

function sanitize(str: string): string {
  return str.replace(/[<>'"]/g, '')
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return Response.json({ error: 'Supabase env vars not configured' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  })

  let body: SubmitOrderBody
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { clientName, contact, items, totals } = body

  // Type-check all string fields before any string operations
  if (
    typeof clientName !== 'string' ||
    typeof contact?.firstName !== 'string' ||
    typeof contact?.lastName !== 'string' ||
    typeof contact?.email !== 'string' ||
    typeof contact?.company !== 'string'
  ) {
    return Response.json({ error: 'Invalid input' }, { status: 400 })
  }

  // Reject XSS attempts and enforce length limits
  const MAX_STR = 200
  const stringFields = [clientName, contact.firstName, contact.lastName, contact.email, contact.company]
  if (stringFields.some(f => f.includes('<') || f.length > MAX_STR)) {
    return Response.json({ error: 'Invalid input' }, { status: 400 })
  }

  // Server-side email format validation
  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
    return Response.json({ error: 'Invalid email' }, { status: 400 })
  }

  if (!items?.length) {
    return Response.json({ error: 'No items in order' }, { status: 400 })
  }

  // Cap items to prevent DB flooding
  if (items.length > 200) {
    return Response.json({ error: 'Too many items' }, { status: 400 })
  }

  // Validate all numeric fields — prevents NaN/Infinity crashes in .toFixed()
  // boxes/packs must be positive integers; pallets/weight/value can be decimals
  // Per-item box count: 1–99. Totals are sums across up to 200 items so cap higher.
  const isItemInt  = (n: unknown) => typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= 99
  const isTotalInt = (n: unknown) => typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= 200 * 99
  const isDec      = (n: unknown) => typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= 10_000_000

  const totalsOk = isTotalInt(totals?.boxes) && isTotalInt(totals?.packs) &&
    isDec(totals?.pallets) && isDec(totals?.weightGross) && isDec(totals?.totalValue)
  if (!totalsOk) {
    return Response.json({ error: 'Invalid totals' }, { status: 400 })
  }
  for (const item of items) {
    if (!isItemInt(item.boxes) || !isTotalInt(item.packs) || !isDec(item.pallets) ||
        !isDec(item.weightGross) || !isDec(item.totalValue)) {
      return Response.json({ error: 'Invalid item data' }, { status: 400 })
    }
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      client_name:  sanitize(clientName ?? ''),
      first_name:   sanitize(contact.firstName ?? ''),
      last_name:    sanitize(contact.lastName ?? ''),
      email:        sanitize(contact.email ?? ''),
      company:      sanitize(contact.company ?? ''),
      total_boxes:        totals.boxes,
      total_packs:        totals.packs,
      total_pallets:      +totals.pallets.toFixed(3),
      total_weight_kg:    +totals.weightGross.toFixed(2),
      total_value_eur:    +totals.totalValue.toFixed(2),
    })
    .select('id')
    .single()

  if (orderError) {
    return Response.json({ error: orderError.message }, { status: 500 })
  }

  const orderItems = items.map((item) => ({
    order_id:     order.id,
    article:      item.article,
    barcode:      item.barcode,
    sku:          item.sku,
    quantity_boxes: item.boxes,
    packs:          item.packs,
    pallets:        +item.pallets.toFixed(3),
    weight_kg:      +item.weightGross.toFixed(2),
    value_eur:      +item.totalValue.toFixed(2),
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

  if (itemsError) {
    return Response.json({ error: itemsError.message }, { status: 500 })
  }

  return Response.json({ orderId: order.id }, { status: 201 })
}
