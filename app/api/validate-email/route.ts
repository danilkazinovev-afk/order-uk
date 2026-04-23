export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return Response.json({ error: 'Email required' }, { status: 400 })
  }

  const apiKey = process.env.BOUNCER_API_KEY
  if (!apiKey) {
    console.warn('BOUNCER_API_KEY not set — skipping email verification')
    return Response.json({ status: 'unknown' })
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(
      `https://api.usebouncer.com/v1.1/email/verify?email=${encodeURIComponent(email)}`,
      { headers: { 'x-api-key': apiKey }, signal: controller.signal }
    )
    clearTimeout(timeoutId)

    if (!res.ok) {
      console.error('Bouncer API returned', res.status)
      return Response.json({ status: 'unknown' })
    }

    const json = await res.json()
    const status: string = json?.data?.status ?? 'unknown'
    return Response.json({ status })
  } catch (err) {
    clearTimeout(timeoutId)
    console.error('Bouncer API failed:', err)
    return Response.json({ status: 'unknown' })
  }
}
