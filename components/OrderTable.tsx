'use client'

import React, { useState } from 'react'
import { categories } from '@/data/products'
import { calcRow, calcCategoryTotals, OrderState } from '@/lib/calculations'

interface Props {
  order: OrderState
  onChange: (article: string, value: number) => void
}

const CATEGORY_THEME: Record<string, { bg: string; text: string; border: string }> = {
  'sherlock-leaf':    { bg: 'var(--cat-amber-bg)',   text: 'var(--cat-amber-text)',   border: 'var(--cat-amber-border)' },
  'sherlock-teabags': { bg: 'var(--cat-orange-bg)',  text: 'var(--cat-orange-text)',  border: 'var(--cat-orange-border)' },
  'sherlock-sachets': { bg: 'var(--cat-rose-bg)',    text: 'var(--cat-rose-text)',    border: 'var(--cat-rose-border)' },
  'tm-sachets':       { bg: 'var(--cat-teal-bg)',    text: 'var(--cat-teal-text)',    border: 'var(--cat-teal-border)' },
  'tm-pyramids':      { bg: 'var(--cat-emerald-bg)', text: 'var(--cat-emerald-text)', border: 'var(--cat-emerald-border)' },
  'tm-caddy':         { bg: 'var(--cat-sky-bg)',     text: 'var(--cat-sky-text)',     border: 'var(--cat-sky-border)' },
  'tm-assorted':      { bg: 'var(--cat-violet-bg)',  text: 'var(--cat-violet-text)',  border: 'var(--cat-violet-border)' },
  'tm-tube':          { bg: 'var(--cat-cyan-bg)',    text: 'var(--cat-cyan-text)',    border: 'var(--cat-cyan-border)' },
}

function fmt(n: number, decimals = 2) {
  return n > 0 ? n.toFixed(decimals) : null
}

function handleOrderTab(article: string, e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key !== 'Tab') return
  const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('[data-order-input]'))
    .filter(el => el.offsetParent !== null)
  const idx = inputs.findIndex(el => el.dataset.orderInput === article)
  if (idx < 0) return
  const next = e.shiftKey ? inputs[idx - 1] : inputs[idx + 1]
  if (next) {
    e.preventDefault()
    next.focus()
    next.select()
  }
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="13" height="13" viewBox="0 0 13 13" fill="none"
      style={{
        transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
        transition: 'transform 150ms ease',
        flexShrink: 0,
      }}
    >
      <path d="M2 4.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative flex items-center">
      <svg className="absolute left-2.5 pointer-events-none" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: 'var(--text3)' }}>
        <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search products…"
        className="w-full pl-8 pr-7 py-1.5 text-sm rounded-lg focus:outline-none focus:ring-2"
        style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border2)',
          color: 'var(--text)',
          ['--tw-ring-color' as string]: 'var(--accent)',
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2.5 cursor-pointer"
          style={{ color: 'var(--text3)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M2 2l8 8M10 2L2 10" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default function OrderTable({ order, onChange }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [query, setQuery] = useState('')

  const searchTerm = query.toLowerCase().trim()

  function toggleCategory(id: string) {
    if (searchTerm) return
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function matchProduct(p: { sku: string; article: string; barcode: string }) {
    return (
      p.sku.toLowerCase().includes(searchTerm) ||
      p.article.toLowerCase().includes(searchTerm) ||
      p.barcode.toLowerCase().includes(searchTerm)
    )
  }

  const visibleCategories = searchTerm
    ? categories.map(cat => ({ ...cat, products: cat.products.filter(matchProduct) })).filter(cat => cat.products.length > 0)
    : categories

  return (
    <>
      {/* ── Mobile card view ── */}
      <div className="block md:hidden">

        {/* Search */}
        <div className="sticky top-0 z-20 px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {visibleCategories.length === 0 ? (
          <div className="py-16 text-center text-sm" style={{ color: 'var(--text3)' }}>
            No products match &ldquo;{query}&rdquo;
          </div>
        ) : visibleCategories.map((category) => {
          const totals = calcCategoryTotals(category.id, order)
          const theme = CATEGORY_THEME[category.id] ?? { bg: 'var(--surface2)', text: 'var(--text2)', border: 'var(--border2)' }
          const isCollapsed = !searchTerm && !!collapsed[category.id]

          return (
            <div key={category.id}>
              {/* Category header */}
              <div
                className="sticky top-[48px] z-10 px-4 py-2.5 flex items-center justify-between text-[13px] font-semibold tracking-wide cursor-pointer select-none"
                onClick={() => toggleCategory(category.id)}
                style={{
                  background: 'var(--surface2)',
                  borderLeft: `3px solid ${theme.border}`,
                  borderTop: '2px solid var(--border)',
                  borderBottom: '1px solid var(--border)',
                  color: theme.text,
                }}
              >
                <span className="flex items-center gap-2">
                  <ChevronIcon collapsed={isCollapsed} />
                  {category.name}
                </span>
                {totals.boxes > 0 && (
                  <span className="text-[12px] font-bold shrink-0 ml-2" style={{ color: 'var(--value)' }}>
                    €{totals.totalValue.toFixed(2)} · {totals.boxes} boxes
                  </span>
                )}
              </div>

              {/* Product cards */}
              {!isCollapsed && category.products.map((product) => {
                const boxes = order[product.article] ?? 0
                const calc = calcRow(product, boxes)
                const ordered = boxes > 0
                return (
                  <div
                    key={product.article}
                    className="px-4 py-3"
                    style={{
                      background: ordered ? '#F0FDF4' : 'var(--surface)',
                      borderBottom: '1px solid var(--border)',
                      borderLeft: ordered ? '3px solid #22C55E' : '3px solid transparent',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="font-medium text-[14px] leading-snug" style={{ color: 'var(--text)' }}>{product.sku}</div>
                        <div className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--text3)' }}>
                          {product.article} · {product.barcode}
                        </div>
                        <div className="flex flex-wrap gap-x-3 mt-1 text-[11px]" style={{ color: 'var(--text2)' }}>
                          <span>€{product.pricePerPack.toFixed(2)}/pack</span>
                          <span>{product.packsInBox} packs/box</span>
                          <span>{product.weightBoxGross} kg/box</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button type="button" aria-label="Decrease"
                          onClick={() => onChange(product.article, Math.max(0, boxes - 1))}
                          className="w-9 h-9 flex items-center justify-center rounded-lg text-lg font-medium cursor-pointer focus:outline-none transition-colors duration-100"
                          style={{ border: '1px solid var(--border2)', color: 'var(--text3)', background: 'var(--surface2)' }}
                        >−</button>
                        <input
                          type="number" min={0}
                          value={boxes === 0 ? '' : boxes}
                          data-order-input={product.article}
                          onFocus={(e) => e.target.select()}
                          onWheel={(e) => e.currentTarget.blur()}
                          onKeyDown={(e) => handleOrderTab(product.article, e)}
                          onChange={(e) => {
                            const v = parseInt(e.target.value, 10)
                            onChange(product.article, isNaN(v) || v < 0 ? 0 : Math.min(v, 299))
                          }}
                          className="w-14 text-center rounded-lg py-2 font-semibold tabular-nums focus:outline-none focus:ring-2"
                          placeholder="0"
                          style={{
                            background: ordered ? '#DCFCE7' : '#F9F5FF',
                            border: '1.5px solid var(--border2)',
                            color: 'var(--text)',
                            ['--tw-ring-color' as string]: 'var(--accent)',
                          }}
                        />
                        <button type="button" aria-label="Increase"
                          onClick={() => onChange(product.article, Math.min(boxes + 1, 299))}
                          className="w-9 h-9 flex items-center justify-center rounded-lg text-lg font-medium cursor-pointer focus:outline-none transition-colors duration-100"
                          style={{ border: '1px solid var(--border2)', color: 'var(--text3)', background: 'var(--surface2)' }}
                        >+</button>
                      </div>
                    </div>
                    {ordered && (
                      <div className="flex gap-4 mt-2 text-[12px] tabular-nums">
                        <span style={{ color: 'var(--text2)' }}>{calc.packs} packs</span>
                        <span style={{ color: 'var(--text3)' }}>{calc.pallets.toFixed(3)} pal</span>
                        <span style={{ color: 'var(--text2)' }}>{calc.weightGross.toFixed(2)} kg</span>
                        <span className="font-semibold" style={{ color: 'var(--value)' }}>€{calc.totalValue.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* ── Desktop table view ── */}
      <div className="hidden md:flex flex-col h-full absolute inset-0">

        {/* Search bar */}
        <div className="shrink-0 px-4 py-2" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {/* Scrollable table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-[13px] border-collapse min-w-[1100px]">
            <thead className="sticky top-0 z-10">
              <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border2)' }}
                  className="text-[11px] uppercase tracking-wider">
                {[
                  { label: 'Article',    sub: '',          align: 'left',  w: 'w-24' },
                  { label: 'Bar code',   sub: '',          align: 'left',  w: 'w-36' },
                  { label: 'SKU',        sub: '',          align: 'left',  w: 'min-w-[280px]' },
                  { label: 'Wt pcs',     sub: 'g',         align: 'right', w: 'w-20' },
                  { label: 'Price/pack', sub: 'EUR',       align: 'right', w: 'w-24' },
                  { label: 'Packs',      sub: 'in box',    align: 'right', w: 'w-20' },
                  { label: 'Boxes',      sub: 'on pallet', align: 'right', w: 'w-22' },
                  { label: 'Box wt',     sub: 'gross kg',  align: 'right', w: 'w-22' },
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
                  className="px-3 py-3 text-center font-bold w-30 text-sm normal-case tracking-normal"
                  style={{ color: 'var(--accent)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: '#F9F5FF' }}
                >
                  Order
                  <span className="block font-normal text-[10px] uppercase tracking-wider" style={{ color: 'var(--accent2)' }}>boxes</span>
                  <span className="block font-normal normal-case tracking-normal text-[9px] mt-0.5" style={{ color: 'var(--text3)' }}>(Enter quantities to build your order)</span>
                </th>
                {[
                  { label: 'Packs',   sub: '',         w: 'w-20' },
                  { label: 'Pallets', sub: '',         w: 'w-20' },
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
              {visibleCategories.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-16 text-center text-sm" style={{ color: 'var(--text3)' }}>
                    No products match &ldquo;{query}&rdquo;
                  </td>
                </tr>
              ) : visibleCategories.map((category) => {
                const totals = calcCategoryTotals(category.id, order)
                const theme = CATEGORY_THEME[category.id] ?? { bg: 'var(--surface2)', text: 'var(--text2)', border: 'var(--border2)' }
                const hasOrders = totals.boxes > 0
                const isCollapsed = !searchTerm && !!collapsed[category.id]

                return (
                  <React.Fragment key={category.id}>
                    {/* Category header row */}
                    <tr
                      className="cursor-pointer select-none"
                      onClick={() => toggleCategory(category.id)}
                      style={{
                        background: 'var(--surface2)',
                        borderLeft: `3px solid ${theme.border}`,
                        borderTop: '2px solid var(--border)',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <td colSpan={8} className="px-4 py-2 font-semibold text-[14px] tracking-wide" style={{ color: theme.text }}>
                        <span className="flex items-center gap-2">
                          <ChevronIcon collapsed={isCollapsed} />
                          {category.name}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center font-bold text-sm"
                        style={{ color: hasOrders ? 'var(--accent)' : 'transparent', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: '#F9F5FF' }}
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
                    {!isCollapsed && category.products.map((product) => {
                      const boxes = order[product.article] ?? 0
                      const calc = calcRow(product, boxes)
                      const ordered = boxes > 0
                      return (
                        <tr
                          key={product.article}
                          className="transition-colors duration-100"
                          style={{
                            background: ordered ? '#F0FDF4' : 'var(--surface)',
                            borderBottom: '1px solid var(--border)',
                            borderLeft: ordered ? '3px solid #22C55E' : '3px solid transparent',
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface3)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ordered ? '#F0FDF4' : 'var(--surface)' }}
                        >
                          <td className="px-3 py-2 font-mono text-[11px]" style={{ color: 'var(--text3)' }}>{product.article}</td>
                          <td className="px-3 py-2 font-mono text-[11px]" style={{ color: 'var(--text3)' }}>{product.barcode}</td>
                          <td className="px-3 py-2 font-medium leading-snug text-[15px]" style={{ color: 'var(--text)' }}>{product.sku}</td>
                          <td className="px-3 py-2 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{product.weightPcs}</td>
                          <td className="px-3 py-2 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{product.pricePerPack.toFixed(2)}</td>
                          <td className="px-3 py-2 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{product.packsInBox}</td>
                          <td className="px-3 py-2 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{product.boxesOnPallet}</td>
                          <td className="px-3 py-2 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{product.weightBoxGross}</td>
                          <td className="px-2 py-2" style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: ordered ? '#DCFCE7' : '#F9F5FF' }}>
                            <label className="sr-only" htmlFor={`order-${product.article}`}>Order boxes for {product.sku}</label>
                            <div className="flex items-center gap-1">
                              <button type="button" aria-label="Decrease"
                                onClick={() => onChange(product.article, Math.max(0, boxes - 1))}
                                className="shrink-0 w-5 h-5 flex items-center justify-center rounded text-base leading-none cursor-pointer focus:outline-none transition-colors duration-100"
                                style={{ color: 'var(--text3)', background: 'transparent' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
                              >−</button>
                              <input
                                id={`order-${product.article}`}
                                type="number" min={0}
                                value={boxes === 0 ? '' : boxes}
                                data-order-input={product.article}
                                onFocus={(e) => e.target.select()}
                                onWheel={(e) => e.currentTarget.blur()}
                                onKeyDown={(e) => handleOrderTab(product.article, e)}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value, 10)
                                  onChange(product.article, isNaN(v) || v < 0 ? 0 : Math.min(v, 299))
                                }}
                                className="w-full text-center rounded-lg px-2 py-1.5 font-semibold tabular-nums transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2"
                                style={{
                                  background: 'var(--surface)',
                                  border: '1.5px solid var(--border2)',
                                  color: 'var(--text)',
                                  ['--tw-ring-color' as string]: 'var(--accent)',
                                  minWidth: 0,
                                }}
                              />
                              <button type="button" aria-label="Increase"
                                onClick={() => onChange(product.article, Math.min(boxes + 1, 299))}
                                className="shrink-0 w-5 h-5 flex items-center justify-center rounded text-base leading-none cursor-pointer focus:outline-none transition-colors duration-100"
                                style={{ color: 'var(--text3)', background: 'transparent' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
                              >+</button>
                            </div>
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
