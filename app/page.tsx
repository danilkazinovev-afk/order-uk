'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import OrderTable from '@/components/OrderTable'
import OrderSummary from '@/components/OrderSummary'
import { calcGrandTotals, OrderState } from '@/lib/calculations'

export default function Home() {
  const [order, setOrder] = useState<OrderState>({})
  const [clientName, setClientName] = useState('')
  const [showSummary, setShowSummary] = useState(false)

  const handleChange = useCallback((article: string, value: number) => {
    setOrder((prev) => {
      if (value === 0) {
        const next = { ...prev }
        delete next[article]
        return next
      }
      return { ...prev, [article]: value }
    })
  }, [])

  const handleReset = useCallback(() => {
    setOrder({})
    setClientName('')
  }, [])

  const grand = calcGrandTotals(order)
  const hasOrder = grand.boxes > 0

  const statItems = [
    { label: 'Boxes',   value: grand.boxes,                          style: { color: 'var(--text)' } },
    { label: 'Packs',   value: grand.packs,                          style: { color: 'var(--text)' } },
    { label: 'Pallets', value: grand.pallets.toFixed(2),              style: { color: 'var(--text)' } },
    { label: 'Weight',  value: `${grand.weightGross.toFixed(1)} kg`,  style: { color: 'var(--text)' } },
    { label: 'Total',   value: `€${grand.totalValue.toFixed(2)}`,     style: { color: 'var(--value)', fontSize: '1rem', fontWeight: 700 } as React.CSSProperties },
  ]

  const clientInputStyle = {
    background: 'var(--surface2)',
    border: '1px solid var(--border2)',
    color: 'var(--text)',
    '--tw-ring-color': 'var(--accent)',
  } as React.CSSProperties

  return (
    <div className="h-dvh flex flex-col overflow-hidden" style={{ background: 'var(--bg)' }}>

      {/* ── Desktop header ── */}
      <header
        className="shrink-0 z-40 hidden md:block"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      >
        <div className="px-5 py-3 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Image src="/logo.jpg" alt="Logo" width={72} height={72} className="rounded-lg shrink-0" />
            <Image src="/sherlock.png" alt="Sherlock Secrets" width={48} height={48} className="rounded-md shrink-0 object-contain" style={{ marginTop: '5px' }} />
            <Image src="/tea-moments.png" alt="Tea Moments" width={48} height={48} className="rounded-md shrink-0 object-contain" style={{ marginTop: '-2px' }} />
            <div className="h-5 w-px" style={{ background: 'var(--border2)' }} />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[17px] tracking-tight" style={{ color: 'var(--text)' }}>Tea Order Form</span>
              <span className="text-[12px] uppercase tracking-widest font-medium mt-0.5" style={{ color: 'var(--text3)' }}>Wholesale</span>
            </div>
            <div className="h-5 w-px" style={{ background: 'var(--border2)' }} />
            <label htmlFor="client-name" className="sr-only">Client name</label>
            <input
              id="client-name"
              type="text"
              placeholder="Client name..."
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-sm w-48 transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2"
              style={clientInputStyle}
            />
          </div>
          <div className="flex items-center gap-6">
            {statItems.map((s) => (
              <div key={s.label} className="text-center min-w-[48px]">
                <div className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: 'var(--text3)' }}>{s.label}</div>
                <div className="font-bold tabular-nums mt-0.5" style={s.style}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {hasOrder && (
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2"
                style={{ border: '1px solid var(--border2)', color: 'var(--text2)', '--tw-ring-color': 'var(--border2)' } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface3)')}
                onMouseLeave={e => (e.currentTarget.style.background = '')}
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setShowSummary(true)}
              disabled={!hasOrder}
              className="px-5 py-2 rounded-lg text-white font-semibold text-sm transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: 'var(--cta)', '--tw-ring-color': 'var(--cta)' } as React.CSSProperties}
            >
              Review Order →
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile header ── */}
      <header
        className="shrink-0 z-40 md:hidden"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      >
        <div className="px-4 pt-3 pb-2 flex items-center gap-3">
          <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded-lg shrink-0" />
          <Image src="/sherlock.png" alt="Sherlock Secrets" width={30} height={30} className="rounded-md shrink-0 object-contain" />
          <Image src="/tea-moments.png" alt="Tea Moments" width={30} height={30} className="rounded-md shrink-0 object-contain" />
          <div className="h-5 w-px mx-0.5" style={{ background: 'var(--border2)' }} />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[15px] tracking-tight" style={{ color: 'var(--text)' }}>Tea Order Form</span>
            <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: 'var(--text3)' }}>Wholesale</span>
          </div>
        </div>
        <div className="px-4 pb-3">
          <label htmlFor="client-name-mobile" className="sr-only">Client name</label>
          <input
            id="client-name-mobile"
            type="text"
            placeholder="Client name..."
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-150 focus:outline-none focus:ring-2"
            style={clientInputStyle}
          />
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col overflow-y-auto md:overflow-hidden md:p-4 min-h-0">
        <div
          className="md:flex-1 md:rounded-xl md:overflow-hidden relative"
          style={{ border: '1px solid var(--border)', background: 'var(--surface)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
        >
          <OrderTable order={order} onChange={handleChange} />
        </div>
      </main>

      {/* ── Mobile bottom bar ── */}
      <div
        className="md:hidden shrink-0 px-4 py-3 flex items-center gap-3"
        style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', boxShadow: '0 -1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex-1 flex items-center gap-4 min-w-0 overflow-hidden">
          {hasOrder ? (
            <>
              <div className="text-center">
                <div className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: 'var(--text3)' }}>Boxes</div>
                <div className="font-bold tabular-nums text-sm" style={{ color: 'var(--text)' }}>{grand.boxes}</div>
              </div>
              <div className="text-center">
                <div className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: 'var(--text3)' }}>Weight</div>
                <div className="font-bold tabular-nums text-sm" style={{ color: 'var(--text)' }}>{grand.weightGross.toFixed(1)} kg</div>
              </div>
              <div className="text-center">
                <div className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: 'var(--text3)' }}>Total</div>
                <div className="font-bold tabular-nums text-sm" style={{ color: 'var(--value)' }}>€{grand.totalValue.toFixed(2)}</div>
              </div>
            </>
          ) : (
            <p className="text-[12px]" style={{ color: 'var(--text3)' }}>Add items to build your order</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {hasOrder && (
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2"
              style={{ border: '1px solid var(--border2)', color: 'var(--text2)', '--tw-ring-color': 'var(--border2)' } as React.CSSProperties}
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setShowSummary(true)}
            disabled={!hasOrder}
            className="px-4 py-2 rounded-lg text-white font-semibold text-sm transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'var(--cta)', '--tw-ring-color': 'var(--cta)' } as React.CSSProperties}
          >
            Review →
          </button>
        </div>
      </div>

      {showSummary && (
        <OrderSummary
          order={order}
          clientName={clientName}
          onClose={() => setShowSummary(false)}
          onReset={handleReset}
        />
      )}
    </div>
  )
}
