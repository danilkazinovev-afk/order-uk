import ExcelJS from 'exceljs'
import { categories } from '@/data/products'
import { calcRow, calcCategoryTotals, calcGrandTotals, OrderState } from './calculations'

interface ContactInfo {
  firstName: string
  lastName: string
  email: string
  company: string
}

const GREEN_FILL: ExcelJS.Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFD9EAD3' },
}

const HEADER_FILL: ExcelJS.Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFD3D3D3' },
}

const CATEGORY_FILL: ExcelJS.Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFF2F2F2' },
}

const GRAND_FILL: ExcelJS.Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFDCE6F1' },
}

export async function exportOrderXlsx(order: OrderState, clientName: string, contact?: ContactInfo) {
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Order')

  ws.columns = [
    { width: 12 }, { width: 16 }, { width: 55 },
    { width: 13 }, { width: 18 }, { width: 16 }, { width: 18 }, { width: 18 },
    { width: 14 }, { width: 14 }, { width: 14 }, { width: 20 }, { width: 16 },
  ]

  if (contact) {
    ws.addRow(['First Name', contact.firstName, '', 'Last Name', contact.lastName])
    ws.addRow(['Email', contact.email, '', 'Company', contact.company])
    ws.addRow([])
  }

  const headerRow = ws.addRow([
    'Article', 'Bar code', 'SKU',
    'Weight pcs (g)', 'Price per pack (EUR)',
    'Qty packs in box', 'Qty boxes on pallet', 'Weight box gross (kg)',
    'Order (boxes)', 'Order (packs)', 'Order (pallets)',
    'Total Weight gross (kg)', 'Total value (EUR)',
  ])
  headerRow.font = { bold: true }
  headerRow.fill = HEADER_FILL

  for (const category of categories) {
    const catRow = ws.addRow([category.name, '', '', '', '', '', '', '', '', '', '', '', ''])
    catRow.font = { bold: true, italic: true }
    catRow.fill = CATEGORY_FILL

    for (const product of category.products) {
      const boxes = order[product.article] ?? 0
      const calc = calcRow(product, boxes)
      const row = ws.addRow([
        product.article,
        product.barcode,
        product.sku,
        product.weightPcs,
        product.pricePerPack,
        product.packsInBox,
        product.boxesOnPallet,
        product.weightBoxGross,
        calc.boxes,
        calc.packs,
        +calc.pallets.toFixed(3),
        +calc.weightGross.toFixed(2),
        +calc.totalValue.toFixed(2),
      ])

      if (boxes > 0) {
        row.fill = GREEN_FILL
        row.font = { bold: true }
      }
    }

    const totals = calcCategoryTotals(category.id, order)
    const subtotalRow = ws.addRow([
      `SUBTOTAL: ${category.name}`, '', '', '', '', '', '', '',
      totals.boxes,
      totals.packs,
      +totals.pallets.toFixed(3),
      +totals.weightGross.toFixed(2),
      +totals.totalValue.toFixed(2),
    ])
    subtotalRow.font = { bold: true }

    ws.addRow([])
  }

  const grand = calcGrandTotals(order)
  const grandRow = ws.addRow([
    'GRAND TOTAL', '', '', '', '', '', '', '',
    grand.boxes,
    grand.packs,
    +grand.pallets.toFixed(3),
    +grand.weightGross.toFixed(2),
    +grand.totalValue.toFixed(2),
  ])
  grandRow.font = { bold: true }
  grandRow.fill = GRAND_FILL

  const buffer = await wb.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const date = new Date().toISOString().split('T')[0]
  a.download = `order_${clientName.replace(/\s+/g, '_') || 'client'}_${date}.xlsx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
