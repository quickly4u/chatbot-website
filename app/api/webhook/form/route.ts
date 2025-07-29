import { type NextRequest, NextResponse } from "next/server"

interface FormData {
  name: string
  email: string
  mobile: string
  company: string
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.mobile || !data.company) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      )
    }

    // Generate session ID from name + email + mobile
    const sessionId = `${data.name}${data.email}${data.mobile}`.replace(/\s+/g, '').toLowerCase()

    // Send to the specified webhook
    try {
      const response = await fetch('https://n8n.quickly4u.com/webhook/c9e17d01-566a-4bb3-8ae2-b16a9ec65023', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          company: data.company,
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
          source: 'quickly4u-website'
        })
      })

      if (!response.ok) {
        console.error('External webhook failed:', response.status, response.statusText)
      }
    } catch (webhookError) {
      console.error("External webhook failed:", webhookError)
      // Don't fail the request if external webhook fails
    }



    return NextResponse.json({
      success: true,
      message: "Form data received successfully",
      sessionId: sessionId,
      userData: {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        company: data.company
      }
    })
  } catch (error) {
    console.error("Form webhook error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process form data" },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
