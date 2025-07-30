'use client'

const GTM_ID = 'GTM-XXXXXX' // Replace with your GTM container ID

export default function NoScriptGTM() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
