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

    // Log the received data (in production, you'd save this to a database)
    console.log("Chat webhook received:", {
      message: data.message,
      timestamp: data.timestamp,
      sessionId: data.sessionId,
      userAgent: data.userAgent,
      ip: request.ip || "unknown",
    })

    // Here you would typically:
    // 1. Save the chat data to your database
    // 2. Trigger analytics events
    // 3. Send data to your CRM
    // 4. Process the message for insights

    // Example: Send to external webhook (replace with your actual endpoint)
    try {
      // Uncomment and replace with your actual webhook URL
      /*
      await fetch('https://your-webhook-endpoint.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-api-key' // if needed
        },
        body: JSON.stringify({
          ...data,
          source: 'quickly4u-website',
          ip: request.ip
        })
      })
      */
    } catch (webhookError) {
      console.error("External webhook failed:", webhookError)
      // Don't fail the request if external webhook fails
    }

    return NextResponse.json({
      success: true,
      message: "Chat data received successfully",
      sessionId: data.sessionId,
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
