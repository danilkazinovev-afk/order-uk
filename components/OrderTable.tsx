'use client'

import React from 'react'
import { categories } from '@/data/products'
import { calcRow, calcCategoryTotals, OrderState } from '@/lib/calculations'

interface Props {
  order: OrderState
  onChange: (article: string, value: number) => void
  hasOrder: boolean
}

const CATEGORY_THEME: Record<string, { bg: string; text: string; border: string }> = {
  'tea-family':      { bg: 'var(--cat-blue-bg)',   text: 'var(--cat-blue-text)',   border: 'var(--cat-blue-border)' },
  'sherlock-leaf':   { bg: 'var(--cat-violet-bg)',  text: 'var(--cat-violet-text)', border: 'var(--cat-violet-border)' },
  'sherlock-teabags':{ bg: 'var(--cat-violet-bg)',  text: 'var(--cat-violet-text)', border: 'var(--cat-violet-border)' },
  'sherlock-sachets':{ bg: 'var(--cat-violet-bg)',  text: 'var(--cat-violet-text)', border: 'var(--cat-violet-border)' },
  'tm-sachets':      { bg: 'var(--cat-teal-bg)',    text: 'var(--cat-teal-text)',   border: 'var(--cat-teal-border)' },
  'tm-pyramids':     { bg: 'var(--cat-teal-bg)',    text: 'var(--cat-teal-text)',   border: 'var(--cat-teal-border)' },
  'tm-caddy':        { bg: 'var(--cat-teal-bg)',    text: 'var(--cat-teal-text)',   border: 'var(--cat-teal-border)' },
  'tm-assorted':     { bg: 'var(--cat-teal-bg)',    text: 'var(--cat-teal-text)',   border: 'var(--cat-teal-border)' },
  'tm-tube':         { bg: 'var(--cat-teal-bg)',    text: 'var(--cat-teal-text)',   border: 'var(--cat-teal-border)' },
}

function fmt(n: number, decimals = 2) {
  return n > 0 ? n.toFixed(decimals) : null
}

export default function OrderTable({ order, onChange, hasOrder }: Props) {
  return (
    <div className="overflow-auto h-full absolute inset-0">
      <table className="w-full text-xs border-collapse min-w-[1100px]">
        <thead className="sticky top-0 z-10">
          <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border2)' }}
              className="text-[11px] uppercase tracking-wider">
            {[
              { label: 'Article',           sub: '',          align: 'left',  w: 'w-24' },
              { label: 'Bar code',          sub: '',          align: 'left',  w: 'w-36' },
              { label: 'SKU',               sub: '',          align: 'left',  w: 'min-w-[280px]' },
              { label: 'Wt pcs',            sub: 'g',         align: 'right', w: 'w-20' },
              { label: 'Price/pack',        sub: 'EUR',       align: 'right', w: 'w-24' },
              { label: 'Packs',             sub: 'in box',    align: 'right', w: 'w-20' },
              { label: 'Boxes',             sub: 'on pallet', align: 'right', w: 'w-22' },
              { label: 'Box wt',            sub: 'gross kg',  align: 'right', w: 'w-22' },
            ].map(({ label, sub, align, w }) => (
              <th key={label} scope="col"
                className={`px-3 py-3 font-semibold ${w} text-${align}`}
                style={{ color: 'var(--text2)', borderRight: '1px solid var(--border)' }}
              >
                {label}
                {sub && <span className="block font-normal normal-case" style={{ color: 'var(--text3)' }}>{sub}</span>}
              </th>
            ))}
            <th scope="col"
              className="px-3 py-3 text-center font-bold w-24 text-sm normal-case tracking-normal"
              style={{
                color: 'var(--accent)',
                borderLeft: '1px solid var(--border)',
                borderRight: '1px solid var(--border)',
                background: 'var(--surface2)',
              }}
            >
              Order
              <span className="block font-normal text-[10px] uppercase tracking-wider" style={{ color: 'var(--accent2)' }}>boxes</span>
            </th>
            {[
              { label: 'Packs',   sub: '',        w: 'w-20' },
              { label: 'Pallets', sub: '',        w: 'w-20' },
              { label: 'Weight',  sub: 'gross kg', w: 'w-24' },
            ].map(({ label, sub, w }) => (
              <th key={label} scope="col"
                className={`px-3 py-3 text-right font-semibold ${w}`}
                style={{ color: 'var(--text2)', borderRight: '1px solid var(--border)' }}
              >
                {label}
                {sub && <span className="block font-normal normal-case" style={{ color: 'var(--text3)' }}>{sub}</span>}
              </th>
            ))}
            <th scope="col" className="px-3 py-3 text-right font-bold w-28"
              style={{ background: 'var(--surface2)', color: 'var(--value)' }}
            >
              Value
              <span className="block font-normal text-[10px] uppercase tracking-wider" style={{ color: 'var(--value2)' }}>EUR</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const totals = calcCategoryTotals(category.id, order)
            const theme = CATEGORY_THEME[category.id] ?? { bg: 'var(--surface2)', text: 'var(--text2)', border: 'var(--border2)' }
            const hasOrders = totals.boxes > 0

            return (
              <React.Fragment key={category.id}>
                {/* Category header */}
                <tr style={{
                  background: 'var(--surface2)',
                  borderLeft: `3px solid ${theme.border}`,
                  borderTop: '2px solid var(--border)',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <td colSpan={8} className="px-4 py-2 font-semibold text-[12px] tracking-wide" style={{ color: theme.text }}>
                    {category.name}
                  </td>
                  <td className="px-3 py-2 text-center font-bold text-sm"
                    style={{ color: hasOrders ? 'var(--accent)' : 'transparent', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}
                  >
                    {hasOrders ? totals.boxes : ''}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold" style={{ color: hasOrders ? 'var(--text2)' : 'transparent' }}>
                    {hasOrders ? totals.packs : ''}
                  </td>
                  <td className="px-3 py-2 text-right" style={{ color: hasOrders ? 'var(--text3)' : 'transparent' }}>
                    {hasOrders ? totals.pallets.toFixed(3) : ''}
                  </td>
                  <td className="px-3 py-2 text-right" style={{ color: hasOrders ? 'var(--text2)' : 'transparent' }}>
                    {hasOrders ? totals.weightGross.toFixed(2) : ''}
                  </td>
                  <td className="px-3 py-2 text-right font-bold" style={{ color: hasOrders ? 'var(--value)' : 'transparent' }}>
                    {hasOrders ? `€${totals.totalValue.toFixed(2)}` : ''}
                  </td>
                </tr>

                {/* Product rows */}
                {category.products.map((product, i) => {
                  const boxes = order[product.article] ?? 0
                  const calc = calcRow(product, boxes)
                  const ordered = boxes > 0
                  return (
                    <tr
                      key={product.article}
                      className="transition-colors duration-100"
                      style={{
                        background: ordered ? '#F5F3FF' : 'var(--surface)',
                        borderBottom: '1px solid var(--border)',
                        borderLeft: ordered ? '3px solid var(--accent)' : '3px solid transparent',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface3)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ordered ? '#F5F3FF' : 'var(--surface)' }}
                    >
                      <td className="px-3 py-2 font-mono text-[11px]" style={{ color: 'var(--text3)' }}>{product.article}</td>
                      <td className="px-3 py-2 font-mono text-[11px]" style={{ color: 'var(--text3)' }}>{product.barcode}</td>
                      <td className="px-3 py-2 font-medium leading-snug" style={{ color: 'var(--text)' }}>{product.sku}</td>
                      <td className="px-3 py-2 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{product.weightPcs}</td>
                      <td className="px-3 py-2 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{product.pricePerPack.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{product.packsInBox}</td>
                      <td className="px-3 py-2 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{product.boxesOnPallet}</td>
                      <td className="px-3 py-2 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{product.weightBoxGross}</td>
                      <td className="px-3 py-2" style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                        <label className="sr-only" htmlFor={`order-${product.article}`}>Order boxes for {product.sku}</label>
                        <input
                          id={`order-${product.article}`}
                          type="number"
                          min={0}
                          value={boxes === 0 ? '' : boxes}
                          placeholder="0"
                          onChange={(e) => {
                            const v = parseInt(e.target.value, 10)
                            onChange(product.article, isNaN(v) || v < 0 ? 0 : v)
                          }}
                          className="w-full text-center rounded-lg px-2 py-1.5 font-semibold tabular-nums transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2"
                          style={{
                            background: 'var(--surface)',
                            border: '1.5px solid var(--border2)',
                            color: 'var(--text)',
                            '--tw-ring-color': 'var(--accent)',
                          } as React.CSSProperties}
                        />
                      </td>
                      <td className="px-3 py-2 text-right font-medium tabular-nums" style={{ color: calc.packs > 0 ? 'var(--text)' : 'var(--text3)' }}>
                        {fmt(calc.packs, 0) ?? ''}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums" style={{ color: 'var(--text3)' }}>
                        {fmt(calc.pallets, 3) ?? ''}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums" style={{ color: calc.weightGross > 0 ? 'var(--text2)' : 'var(--text3)' }}>
                        {fmt(calc.weightGross) ?? ''}
                      </td>
                      <td className="px-3 py-2 text-right font-semibold tabular-nums" style={{ color: calc.totalValue > 0 ? 'var(--value)' : 'var(--text3)' }}>
                        {calc.totalValue > 0 ? `€${calc.totalValue.toFixed(2)}` : ''}
                      </td>
                    </tr>
                  )
                })}
              </React.Fragment>
            )
          })}
          {!hasOrder && (
            <tr>
              <td colSpan={13} className="px-4 py-8 text-center text-sm font-medium" style={{ color: 'var(--text3)' }}>
                Enter quantities in the{' '}
                <span className="font-semibold" style={{ color: 'var(--cta)' }}>Order (boxes)</span>
                {' '}column to build your order.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
