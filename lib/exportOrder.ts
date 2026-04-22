import * as XLSX from 'xlsx'
import { categories } from '@/data/products'
import { calcRow, calcCategoryTotals, calcGrandTotals, OrderState } from './calculations'

interface ContactInfo {
  firstName: string
  lastName: string
  email: string
  company: string
}

export function exportOrderXlsx(order: OrderState, clientName: string, contact?: ContactInfo) {
  const rows: (string | number)[][] = []

  if (contact) {
    rows.push(['First Name', contact.firstName, '', 'Last Name', contact.lastName])
    rows.push(['Email', contact.email, '', 'Company', contact.company])
    rows.push([])
  }

  const header = [
    'Article', 'Bar code', 'SKU',
    'Weight pcs (g)', 'Price per pack (EUR)',
    'Qty packs in box', 'Qty boxes on pallet', 'Weight box gross (kg)',
    'Order (boxes)', 'Order (packs)', 'Order (pallets)',
    'Total Weight gross (kg)', 'Total value (EUR)',
  ]
  rows.push(header)

  for (const category of categories) {
    rows.push([category.name, '', '', '', '', '', '', '', '', '', '', '', ''])

    for (const product of category.products) {
      const boxes = order[product.article] ?? 0
      const calc = calcRow(product, boxes)
      rows.push([
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
    }

    const totals = calcCategoryTotals(category.id, order)
    rows.push([
      `SUBTOTAL: ${category.name}`, '', '', '', '', '', '', '',
      totals.boxes,
      totals.packs,
      +totals.pallets.toFixed(3),
      +totals.weightGross.toFixed(2),
      +totals.totalValue.toFixed(2),
    ])

    rows.push([])
  }

  const grand = calcGrandTotals(order)
  rows.push([
    'GRAND TOTAL', '', '', '', '', '', '', '',
    grand.boxes,
    grand.packs,
    +grand.pallets.toFixed(3),
    +grand.weightGross.toFixed(2),
    +grand.totalValue.toFixed(2),
  ])

  const ws = XLSX.utils.aoa_to_sheet(rows)

  ws['!cols'] = [
    { wch: 12 }, { wch: 16 }, { wch: 55 },
    { wch: 13 }, { wch: 18 }, { wch: 16 }, { wch: 18 }, { wch: 18 },
    { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 20 }, { wch: 16 },
  ]

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Order')

  const date = new Date().toISOString().split('T')[0]
  const filename = `order_${clientName.replace(/\s+/g, '_') || 'client'}_${date}.xlsx`
  XLSX.writeFile(wb, filename)
}
