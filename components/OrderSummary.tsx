'use client'

import { OrderState, getOrderedRows, calcGrandTotals } from '@/lib/calculations'
import { exportOrderXlsx } from '@/lib/exportOrder'

interface Props {
  order: OrderState
  clientName: string
  onClose: () => void
  onReset: () => void
}

export default function OrderSummary({ order, clientName, onClose, onReset }: Props) {
  const rows = getOrderedRows(order)
  const grand = calcGrandTotals(order)

  function handleExport() { exportOrderXlsx(order, clientName) }
  function handleConfirm() { handleExport(); onReset(); onClose() }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="summary-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl"
        style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-start justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <h2 id="summary-title" className="text-[17px] font-bold" style={{ color: 'var(--text)' }}>Order Summary</h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text3)' }}>
              {clientName
                ? <>Client: <span style={{ color: 'var(--text2)' }}>{clientName}</span></>
                : 'No client name provided'}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close summary"
            className="rounded-lg p-1.5 transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2"
            style={{ color: 'var(--text3)', '--tw-ring-color': 'var(--border2)' } as React.CSSProperties}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface3)')}
            onMouseLeave={e => (e.currentTarget.style.background = '')}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3l12 12M15 3L3 15" />
            </svg>
          </button>
        </div>

        {/* Table */}
        {rows.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-16 text-[17px] font-medium" style={{ color: 'var(--text3)' }}>
            No items ordered yet.
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10">
                <tr style={{ background: 'var(--surface3)', borderBottom: '1px solid var(--border2)' }}
                    className="text-[11px] uppercase tracking-wider">
                  <th scope="col" className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--text2)' }}>SKU</th>
                  <th scope="col" className="text-right py-3 px-4 font-semibold w-20" style={{ color: 'var(--text2)' }}>Boxes</th>
                  <th scope="col" className="text-right py-3 px-4 font-semibold w-20" style={{ color: 'var(--text2)' }}>Packs</th>
                  <th scope="col" className="text-right py-3 px-4 font-semibold w-24" style={{ color: 'var(--text2)' }}>Pallets</th>
                  <th scope="col" className="text-right py-3 px-4 font-semibold w-28" style={{ color: 'var(--text2)' }}>Weight (kg)</th>
                  <th scope="col" className="text-right py-3 px-4 font-bold w-28" style={{ background: 'var(--surface2)', color: 'var(--value)' }}>Value (EUR)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.product.article}
                    className="transition-colors duration-100"
                    style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}
                  >
                    <td className="py-2.5 px-4 font-medium leading-snug" style={{ color: 'var(--text)' }}>{row.product.sku}</td>
                    <td className="py-2.5 px-4 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{row.boxes}</td>
                    <td className="py-2.5 px-4 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{row.packs}</td>
                    <td className="py-2.5 px-4 text-right tabular-nums" style={{ color: 'var(--text3)' }}>{row.pallets.toFixed(3)}</td>
                    <td className="py-2.5 px-4 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{row.weightGross.toFixed(2)}</td>
                    <td className="py-2.5 px-4 text-right font-semibold tabular-nums" style={{ color: 'var(--value)' }}>€{row.totalValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: 'var(--surface3)', borderTop: '2px solid var(--border2)' }}>
                  <td className="py-3 px-4 text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--text)' }}>Grand Total</td>
                  <td className="py-3 px-4 text-right font-bold tabular-nums" style={{ color: 'var(--text)' }}>{grand.boxes}</td>
                  <td className="py-3 px-4 text-right font-bold tabular-nums" style={{ color: 'var(--text)' }}>{grand.packs}</td>
                  <td className="py-3 px-4 text-right tabular-nums" style={{ color: 'var(--text3)' }}>{grand.pallets.toFixed(3)}</td>
                  <td className="py-3 px-4 text-right tabular-nums" style={{ color: 'var(--text2)' }}>{grand.weightGross.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right font-bold tabular-nums text-[17px]" style={{ color: 'var(--value)' }}>€{grand.totalValue.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 flex flex-col sm:flex-row gap-2 justify-end" style={{ borderTop: '1px solid var(--border)' }}>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg font-medium text-sm transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2"
            style={{ border: '1px solid var(--border2)', color: 'var(--text2)', '--tw-ring-color': 'var(--border2)' } as React.CSSProperties}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface3)')}
            onMouseLeave={e => (e.currentTarget.style.background = '')}
          >
            Back to Order
          </button>
          <button
            onClick={handleExport}
            disabled={rows.length === 0}
            className="px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'var(--accent)', '--tw-ring-color': 'var(--accent)' } as React.CSSProperties}
          >
            Download XLSX
          </button>
          <button
            onClick={handleConfirm}
            disabled={rows.length === 0}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'var(--cta)', color: '#0A0B12', '--tw-ring-color': 'var(--cta)' } as React.CSSProperties}
          >
            Confirm & Export
          </button>
        </div>
      </div>
    </div>
  )
}
