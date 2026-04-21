import { categories, Product } from '@/data/products'

export interface OrderRow {
  product: Product
  categoryName: string
  boxes: number
  packs: number
  pallets: number
  weightGross: number
  totalValue: number
}

export interface CategoryTotals {
  boxes: number
  packs: number
  pallets: number
  weightGross: number
  totalValue: number
}

export type OrderState = Record<string, number>

export function calcRow(product: Product, boxes: number): Omit<OrderRow, 'product' | 'categoryName'> {
  return {
    boxes,
    packs: boxes * product.packsInBox,
    pallets: boxes > 0 ? boxes / product.boxesOnPallet : 0,
    weightGross: boxes * product.weightBoxGross,
    totalValue: boxes * product.packsInBox * product.pricePerPack,
  }
}

export function calcCategoryTotals(categoryId: string, order: OrderState): CategoryTotals {
  const category = categories.find(c => c.id === categoryId)
  if (!category) return { boxes: 0, packs: 0, pallets: 0, weightGross: 0, totalValue: 0 }

  return category.products.reduce(
    (acc, product) => {
      const boxes = order[product.article] ?? 0
      const row = calcRow(product, boxes)
      return {
        boxes: acc.boxes + row.boxes,
        packs: acc.packs + row.packs,
        pallets: acc.pallets + row.pallets,
        weightGross: acc.weightGross + row.weightGross,
        totalValue: acc.totalValue + row.totalValue,
      }
    },
    { boxes: 0, packs: 0, pallets: 0, weightGross: 0, totalValue: 0 }
  )
}

export function calcGrandTotals(order: OrderState): CategoryTotals {
  return categories.reduce(
    (acc, category) => {
      const totals = calcCategoryTotals(category.id, order)
      return {
        boxes: acc.boxes + totals.boxes,
        packs: acc.packs + totals.packs,
        pallets: acc.pallets + totals.pallets,
        weightGross: acc.weightGross + totals.weightGross,
        totalValue: acc.totalValue + totals.totalValue,
      }
    },
    { boxes: 0, packs: 0, pallets: 0, weightGross: 0, totalValue: 0 }
  )
}

export function getOrderedRows(order: OrderState): OrderRow[] {
  const rows: OrderRow[] = []
  for (const category of categories) {
    for (const product of category.products) {
      const boxes = order[product.article] ?? 0
      if (boxes > 0) {
        rows.push({ product, categoryName: category.name, ...calcRow(product, boxes) })
      }
    }
  }
  return rows
}
