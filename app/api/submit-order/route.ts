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

  if (!items?.length) {
    return Response.json({ error: 'No items in order' }, { status: 400 })
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      client_name:  clientName,
      first_name:   contact.firstName,
      last_name:    contact.lastName,
      email:        contact.email,
      company:      contact.company,
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
