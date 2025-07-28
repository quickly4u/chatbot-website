"use client"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Zap } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  isTyping?: boolean
}

interface WebhookData {
  message: string
  timestamp: string
  sessionId: string
  userAgent: string
}

export default function InteractiveChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const sessionId = useRef(Math.random().toString(36).substring(7))

  // Predefined responses for demo purposes
  const botResponses = [
    "That's a great question! Our RAG technology can help with exactly that kind of query by understanding your business context.",
    "I can see how that would be frustrating with traditional chatbots. Quickly4u learns from your specific business data to provide accurate responses.",
    "Our system processes your documents and creates intelligent responses rather than following rigid scripts.",
    "That's exactly the kind of complex question our AI excels at. It would analyze your knowledge base and provide a contextual answer.",
    "Great point! Unlike basic chatbots, our system understands nuance and can handle multi-part questions intelligently.",
    "I'd be happy to show you how our RAG technology would handle that scenario. Would you like to schedule a personalized demo?",
    "That's a perfect use case for Quickly4u! Our system would understand your industry-specific terminology and provide expert-level responses.",
    "Excellent question! Our AI doesn't just match keywords - it truly understands context and generates human-like responses.",
  ]

  const scrollToBottom = () => {
    // Use scrollTop instead of scrollIntoView to prevent page-level scrolling
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        container.scrollTop = container.scrollHeight
      }, 100)
    }
  }

  useEffect(() => {
    // Only scroll to bottom if we have more than the initial message
    if (messages.length > 1) {
      scrollToBottom()
    }
  }, [messages])

  useEffect(() => {
    // Initial greeting message - don't trigger scroll
    const initialMessage: Message = {
      id: "1",
      text: "Hey! 👋 I'm powered by Quickly4u's RAG technology. Try asking me anything about your business needs - I'll show you how intelligent conversation should work!",
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages([initialMessage])
  }, [])

  const sendWebhookData = async (message: string) => {
    const webhookData: WebhookData = {
      message,
      timestamp: new Date().toISOString(),
      sessionId: sessionId.current,
      userAgent: navigator.userAgent,
    }

    try {
      const response = await fetch("/api/webhook/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      if (!response.ok) {
        console.warn("Webhook failed, but continuing with demo functionality")
      }
    } catch (error) {
      console.warn("Webhook error:", error)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Send webhook data
    await sendWebhookData(inputValue)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-quickly-blue to-quickly-purple rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Quickly4u Demo</CardTitle>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-xs text-slate-500">{isConnected ? "Online" : "Offline"}</span>
              </div>
            </div>
          </div>
          <Badge className="bg-quickly-orange/10 text-quickly-orange border-quickly-orange/20">
            <Zap className="w-3 h-3 mr-1" />
            RAG Powered
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          className="h-80 overflow-y-auto px-4 space-y-4 scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user"
                      ? "bg-quickly-blue"
                      : "bg-gradient-to-br from-quickly-purple to-quickly-orange"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.sender === "user" ? "bg-quickly-blue text-white" : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-slate-500"}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-quickly-purple to-quickly-orange flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-100 rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your business needs..."
              className="flex-1 border-slate-300 focus:border-quickly-blue focus:ring-quickly-blue"
              disabled={isTyping}
              autoFocus={false}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-quickly-blue to-quickly-purple hover:from-quickly-blue/90 hover:to-quickly-purple/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">
            This demo showcases Quickly4u's conversational intelligence
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
