'use client'

import { useState } from 'react'
import { OrderState, getOrderedRows, calcGrandTotals } from '@/lib/calculations'
import { exportOrderXlsx } from '@/lib/exportOrder'

interface Props {
  order: OrderState
  clientName: string
  onClose: () => void
  onReset: () => void
}

const inputCls = "w-full px-2 py-2 rounded-lg text-sm transition-all duration-150 focus:outline-none focus:ring-2"
const inputStyle = (hasError?: boolean): React.CSSProperties => ({
  background: 'var(--surface2)',
  border: `1px solid ${hasError ? '#EF4444' : 'var(--border2)'}`,
  color: 'var(--text)',
  ['--tw-ring-color' as string]: hasError ? '#EF4444' : 'var(--accent)',
})

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

type BouncerState = null | 'checking' | 'ok' | 'blocked' | 'warn'

function SpinnerIcon() {
  return (
    <svg className="animate-spin" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="6" stroke="var(--border2)" strokeWidth="2" />
      <path d="M7.5 1.5A6 6 0 0 1 13.5 7.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="6.5" fill="#DCFCE7" />
      <path d="M4.5 7.5l2.5 2.5 4-4.5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WarnIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="6.5" fill="#FEF9C3" />
      <path d="M7.5 4.5v3.5M7.5 10.5h.01" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function OrderSummary({ order, clientName, onClose, onReset }: Props) {
  const rows = getOrderedRows(order)
  const grand = calcGrandTotals(order)

  const [firstName, setFirstName]               = useState('')
  const [lastName, setLastName]                 = useState('')
  const [email, setEmail]                       = useState('')
  const [company, setCompany]                   = useState('')
  const [firstNameTouched, setFirstNameTouched] = useState(false)
  const [lastNameTouched, setLastNameTouched]   = useState(false)
  const [emailTouched, setEmailTouched]         = useState(false)
  const [submitting, setSubmitting]             = useState(false)
  const [submitError, setSubmitError]           = useState<string | null>(null)

  const [bouncerState, setBouncerState]         = useState<BouncerState>(null)
  const [lastCheckedEmail, setLastCheckedEmail] = useState('')

  const hasDigits = (v: string) => /\d/.test(v)

  const firstNameError = firstNameTouched
    ? firstName.trim() === '' ? 'Required'
    : hasDigits(firstName) ? 'No numbers allowed' : null
    : null
  const lastNameError = lastNameTouched
    ? lastName.trim() === '' ? 'Required'
    : hasDigits(lastName) ? 'No numbers allowed' : null
    : null
  const emailFormatError = emailTouched && email.length > 0 && !validateEmail(email)

  const canSubmit =
    firstName.trim() !== '' && !hasDigits(firstName) &&
    lastName.trim() !== '' && !hasDigits(lastName) &&
    email.trim() !== '' && validateEmail(email) &&
    bouncerState !== 'blocked' &&
    bouncerState !== 'checking'

  const contact = { firstName, lastName, email, company }

  async function checkBouncer(emailToCheck: string): Promise<BouncerState> {
    setBouncerState('checking')
    try {
      const res = await fetch(`/api/validate-email?email=${encodeURIComponent(emailToCheck)}`)
      const data = await res.json()
      const status: string = res.ok ? (data.status ?? 'unknown') : 'unknown'
      const next: BouncerState =
        status === 'deliverable' ? 'ok' :
        (status === 'undeliverable' || status === 'risky') ? 'blocked' :
        'warn'
      setBouncerState(next)
      setLastCheckedEmail(emailToCheck)
      return next
    } catch (err) {
      console.error('Email validation error:', err)
      setBouncerState('warn')
      setLastCheckedEmail(emailToCheck)
      return 'warn'
    }
  }

  async function handleEmailBlur() {
    setEmailTouched(true)
    if (email.trim() && validateEmail(email) && email !== lastCheckedEmail) {
      await checkBouncer(email)
    }
  }

  function handleEmailChange(v: string) {
    setEmail(v)
    if (v !== lastCheckedEmail) setBouncerState(null)
  }

  function handleExport() { exportOrderXlsx(order, clientName, contact) }

  async function handleConfirm() {
    setSubmitError(null)

    // Run bouncer check on submit if email hasn't been checked yet
    if (validateEmail(email) && email !== lastCheckedEmail) {
      const result = await checkBouncer(email)
      if (result === 'blocked') return
    } else if (bouncerState === 'blocked') {
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          contact,
          items: rows.map((r) => ({
            article:      r.product.article,
            barcode:      r.product.barcode,
            sku:          r.product.sku,
            categoryName: r.categoryName,
            boxes:        r.boxes,
            packs:        r.packs,
            pallets:      r.pallets,
            weightGross:  r.weightGross,
            totalValue:   r.totalValue,
          })),
          totals: {
            boxes:       grand.boxes,
            packs:       grand.packs,
            pallets:     grand.pallets,
            weightGross: grand.weightGross,
            totalValue:  grand.totalValue,
          },
        }),
      })
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(error ?? `HTTP ${res.status}`)
      }
      handleExport()
      onReset()
      onClose()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="summary-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="w-full sm:max-w-4xl h-[95dvh] sm:h-auto sm:max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-2xl"
        style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-start justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <h2 id="summary-title" className="text-[17px] font-bold" style={{ color: 'var(--text)' }}>Order Summary</h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text3)' }}>
              {clientName
                ? <>Client: <span style={{ color: 'var(--text2)' }}>{clientName}</span></>
                : 'Review your order and fill in contact details'}
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

        {/* Scrollable body: contact form + order table */}
        <div className="flex-1 overflow-y-auto min-h-0">

          {/* Contact fields */}
          <div className="px-4 py-4 grid grid-cols-2 gap-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
            <div>
              <label htmlFor="cs-first-name" className="block text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text3)' }}>First name</label>
              <input
                id="cs-first-name"
                type="text"
                autoComplete="given-name"
                placeholder="Jane"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                onBlur={() => setFirstNameTouched(true)}
                className={inputCls}
                style={inputStyle(!!firstNameError)}
              />
              {firstNameError && <p className="mt-1 text-[11px]" style={{ color: '#EF4444' }}>{firstNameError}</p>}
            </div>
            <div>
              <label htmlFor="cs-last-name" className="block text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text3)' }}>Last name</label>
              <input
                id="cs-last-name"
                type="text"
                autoComplete="family-name"
                placeholder="Smith"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                onBlur={() => setLastNameTouched(true)}
                className={inputCls}
                style={inputStyle(!!lastNameError)}
              />
              {lastNameError && <p className="mt-1 text-[11px]" style={{ color: '#EF4444' }}>{lastNameError}</p>}
            </div>

            {/* Email — with bouncer status icon */}
            <div>
              <label htmlFor="cs-email" className="block text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text3)' }}>Email</label>
              <div className="relative">
                <input
                  id="cs-email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@company.com"
                  value={email}
                  onChange={e => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  className={`${inputCls} ${bouncerState !== null ? 'pr-9' : ''}`}
                  style={inputStyle(emailFormatError || bouncerState === 'blocked')}
                  aria-invalid={emailFormatError || bouncerState === 'blocked'}
                  aria-describedby="cs-email-msg"
                />
                {bouncerState === 'checking' && (
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <SpinnerIcon />
                  </span>
                )}
                {bouncerState === 'ok' && (
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <CheckIcon />
                  </span>
                )}
                {bouncerState === 'warn' && (
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <WarnIcon />
                  </span>
                )}
              </div>
              {emailFormatError && !bouncerState && (
                <p id="cs-email-msg" className="mt-1 text-[11px]" style={{ color: '#EF4444' }}>
                  Please enter a valid email address.
                </p>
              )}
              {bouncerState === 'blocked' && (
                <p id="cs-email-msg" className="mt-1 text-[11px]" style={{ color: '#EF4444' }}>
                  This email address can&apos;t be reached. Please use a valid work email.
                </p>
              )}
              {bouncerState === 'warn' && (
                <p id="cs-email-msg" className="mt-1 text-[11px]" style={{ color: '#CA8A04' }}>
                  Could not fully verify this email — double-check before submitting.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cs-company" className="block text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text3)' }}>Company name</label>
              <input
                id="cs-company"
                type="text"
                autoComplete="organization"
                placeholder="Acme Ltd."
                value={company}
                onChange={e => setCompany(e.target.value)}
                className={inputCls}
                style={inputStyle()}
              />
            </div>
          </div>

          {/* Order items */}
          {rows.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-[17px] font-medium" style={{ color: 'var(--text3)' }}>
              No items ordered yet.
            </div>
          ) : (
            <>
              {/* Mobile card list */}
              <div className="block sm:hidden">
                {rows.map((row) => (
                  <div key={row.product.article} className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className="text-[13px] font-medium leading-snug mb-1" style={{ color: 'var(--text)' }}>{row.product.sku}</div>
                    <div className="flex items-center justify-between gap-2 text-[12px] tabular-nums">
                      <div className="flex gap-3" style={{ color: 'var(--text2)' }}>
                        <span>{row.boxes} boxes</span>
                        <span>{row.packs} packs</span>
                        <span style={{ color: 'var(--text3)' }}>{row.weightGross.toFixed(2)} kg</span>
                      </div>
                      <span className="font-semibold" style={{ color: 'var(--value)' }}>€{row.totalValue.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'var(--surface3)', borderTop: '2px solid var(--border2)' }}>
                  <div>
                    <div className="text-[12px] font-bold uppercase tracking-wide" style={{ color: 'var(--text)' }}>Grand Total</div>
                    <div className="text-[12px] tabular-nums mt-0.5" style={{ color: 'var(--text2)' }}>
                      {grand.boxes} boxes · {grand.packs} packs · {grand.weightGross.toFixed(2)} kg
                    </div>
                  </div>
                  <span className="text-[17px] font-bold tabular-nums" style={{ color: 'var(--value)' }}>€{grand.totalValue.toFixed(2)}</span>
                </div>
              </div>

              {/* Desktop table */}
              <table className="hidden sm:table w-full text-sm">
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
            </>
          )}

        </div>

        {/* Footer */}
        <div className="px-4 py-4 flex flex-col sm:flex-row gap-2 sm:justify-end sm:items-center" style={{ borderTop: '1px solid var(--border)' }}>
          {submitError && (
            <p className="text-sm sm:mr-auto" style={{ color: '#EF4444' }}>
              {submitError}
            </p>
          )}
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-sm transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2"
            style={{ border: '1px solid var(--border2)', color: 'var(--text2)', '--tw-ring-color': 'var(--border2)' } as React.CSSProperties}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface3)')}
            onMouseLeave={e => (e.currentTarget.style.background = '')}
          >
            Back to Order
          </button>
          <button
            onClick={handleExport}
            disabled={rows.length === 0}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'var(--value)', '--tw-ring-color': 'var(--value)' } as React.CSSProperties}
          >
            Download XLSX
          </button>
          <button
            onClick={handleConfirm}
            disabled={rows.length === 0 || !canSubmit || submitting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'var(--cta)', color: '#fff', '--tw-ring-color': 'var(--cta)' } as React.CSSProperties}
          >
            {submitting ? 'Sending…' : bouncerState === 'checking' ? 'Verifying…' : 'Confirm & Send Order Form'}
          </button>
        </div>
      </div>
    </div>
  )
}
