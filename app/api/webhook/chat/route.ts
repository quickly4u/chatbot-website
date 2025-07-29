import { type NextRequest, NextResponse } from "next/server"

interface ChatWebhookData {
  message: string
  timestamp: string
  sessionId: string
  userAgent: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ChatWebhookData = await request.json()

    // Log the received data
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    console.log("Chat webhook received:", {
      message: data.message,
      timestamp: data.timestamp,
      sessionId: data.sessionId,
      userAgent: data.userAgent,
      ip: clientIP,
    })

    let webhookResponseData = null
    let botResponse = "I'm sorry, I couldn't process your request at the moment. Please try again."

    // Send to external webhook
    try {
      const response = await fetch('https://n8n.quickly4u.com/webhook/6249c2e4-9bb6-4793-a6ec-a56ea19eef68', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: data.message,
          sessionId: data.sessionId,
          timestamp: data.timestamp,
          userAgent: data.userAgent,
          source: 'quickly4u-website',
          ip: clientIP
        })
      })

      if (response.ok) {
        const webhookResult = await response.json()
        webhookResponseData = webhookResult
        // Extract the bot response from the webhook result for fallback
        botResponse = webhookResult.response || webhookResult.message || webhookResult.reply || "Thank you for your message! Our AI is processing your request."
      } else {
        console.error('External webhook failed:', response.status, response.statusText)
      }
    } catch (webhookError) {
      console.error("External webhook failed:", webhookError)
      // Use fallback response
    }

    return NextResponse.json({
      success: true,
      message: "Chat data received successfully",
      sessionId: data.sessionId,
      botResponse: botResponse,
      webhookData: webhookResponseData
    })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ success: false, error: "Failed to process chat data" }, { status: 500 })
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
