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
  const [sessionId, setSessionId] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  
  // Function to generate session ID in DDMMYYHHMMSS format
  const generateSessionId = () => {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = String(now.getFullYear()).slice(-2)
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${day}${month}${year}${hours}${minutes}${seconds}`
  }

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current
      setTimeout(() => {
        container.scrollTop = container.scrollHeight
      }, 100)
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])

  // Initialize chat on mount
  useEffect(() => {
    // Check if session ID exists in localStorage
    const savedSessionId = localStorage.getItem('quickly4u_session_id')
    
    let currentSessionId: string
    if (savedSessionId) {
      // Use existing session ID
      currentSessionId = savedSessionId
    } else {
      // Generate new session ID and store it
      currentSessionId = generateSessionId()
      localStorage.setItem('quickly4u_session_id', currentSessionId)
    }
    
    setSessionId(currentSessionId)
    
    // Initialize chat with greeting message
    const greetingMessage: Message = {
      id: "1",
      text: `Hey there! 👋 I'm powered by Quickly4u's RAG technology. Try asking me anything about your business needs - I'll show you how intelligent conversation should work!`,
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages([greetingMessage])
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentMessage = inputValue
    setInputValue("")
    setIsTyping(true)

    // Send to webhook
    try {
      const webhookData: WebhookData = {
        message: currentMessage,
        timestamp: new Date().toISOString(),
        sessionId: sessionId,
        userAgent: navigator.userAgent
      }

      const response = await fetch("/api/webhook/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      const result = await response.json()
      
      if (result.success) {
        let displayText = result.botResponse // fallback
        
        // If we have webhook data, extract the output field
        if (result.webhookData && result.webhookData.output) {
          displayText = result.webhookData.output
        } else if (result.webhookData) {
          // If no output field, try other common fields or fallback to JSON
          displayText = result.webhookData.message || result.webhookData.response || result.webhookData.reply || JSON.stringify(result.webhookData, null, 2)
        }
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: displayText,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      } else {
        // Fallback response
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm sorry, I couldn't process your request at the moment. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error('Chat error:', error)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing some technical difficulties. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
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

  const resetChat = () => {
    // Generate new session ID and store it
    const newSessionId = generateSessionId()
    setSessionId(newSessionId)
    localStorage.setItem('quickly4u_session_id', newSessionId)
    
    setMessages([])
    setInputValue('')
    setIsTyping(false)
    
    // Initialize with greeting message
    const greetingMessage: Message = {
      id: "1",
      text: `Hey there! 👋 I'm powered by Quickly4u's RAG technology. Try asking me anything about your business needs - I'll show you how intelligent conversation should work!`,
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages([greetingMessage])
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-quickly-purple to-quickly-orange flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Quickly4u Demo</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-slate-500">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-quickly-orange/10 text-quickly-orange border-quickly-orange/20">
              <Zap className="w-3 h-3 mr-1" />
              RAG Powered
            </Badge>
            <Button
              onClick={resetChat}
              variant="outline"
              size="sm"
              className="text-xs px-2 py-1 h-auto"
            >
              Reset
            </Button>
          </div>
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
            Session ID: {sessionId}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
