"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Brain,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Bot,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  Play,
  Phone,
  Calendar,
} from "lucide-react"

import InteractiveChatbot from "@/components/interactive-chatbot"
import ContactModal from "@/components/contact-modal"
import { useEffect, useState } from "react"

// Animated emoji component
function MadeWithLoveMessage() {
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0)
  const emojis = [
    { emoji: '❤️', className: 'text-red-500' },
    { emoji: '🎉', className: '' },
    { emoji: '🎂', className: '' },
    { emoji: '💪', className: '' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojiIndex((prev) => (prev + 1) % emojis.length)
    }, 1000) // Change emoji every 1 second

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center text-gray-500 text-sm">
      <div className="flex items-center justify-center space-x-1">
        <span>Made with</span>
        <div className="relative inline-block w-6 h-6">
          <span 
            key={currentEmojiIndex}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${
              emojis[currentEmojiIndex].className
            } animate-pulse`}
          >
            {emojis[currentEmojiIndex].emoji}
          </span>
        </div>
        <span>in</span>
        <span>🌍</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [isYearly, setIsYearly] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  
  // Add this useEffect right after the component declaration
  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 scroll-smooth">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-quickly-blue to-quickly-purple rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent">
                Quickly4u
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}
                className="text-slate-600 hover:text-quickly-blue transition-colors"
              >
                Technology
              </button>
              <button
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="text-slate-600 hover:text-quickly-blue transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                className="text-slate-600 hover:text-quickly-blue transition-colors"
              >
                Pricing
              </button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-quickly-blue to-quickly-purple hover:from-quickly-blue/90 hover:to-quickly-purple/90 text-white px-4 py-1 text-sm"
                onClick={() => setIsContactModalOpen(true)}
              >
                Contact Sales
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-quickly-blue/5 to-quickly-purple/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-quickly-orange/10 text-quickly-orange border-quickly-orange/20 hover:bg-quickly-orange/20">
                🚀 Next-Gen AI Chatbots
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Turn Your Chatbot Into a{" "}
                <span className="bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent">
                  Business Expert
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Stop losing customers to robotic responses. Quickly4u learns your business inside-out and delivers
                intelligent, human-like conversations that actually help.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-quickly-blue to-quickly-purple hover:from-quickly-blue/90 hover:to-quickly-purple/90 text-lg px-8 py-4"
                  onClick={() => window.open('https://cal.com/quickly4u/quicklydemochatbot', '_blank')}
                >
                  Book a Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-quickly-blue text-quickly-blue hover:bg-quickly-blue hover:text-white text-lg px-8 py-4 bg-transparent"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Contact Sales
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-lg font-bold text-quickly-blue">Smart & Instant</div>
                  <div className="text-slate-600 text-sm">Answers any business question in seconds</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-quickly-purple">Easy Setup</div>
                  <div className="text-slate-600 text-sm">Upload docs, train AI, go live in minutes</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-quickly-orange">Always Learning</div>
                  <div className="text-slate-600 text-sm">Gets smarter with every conversation</div>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Chatbot */}
            <div className="lg:pl-8">
              <InteractiveChatbot />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Your Current Chatbot is <span className="text-red-600">Costing You Customers</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Traditional chatbots follow rigid scripts, provide repetitive responses, and frustrate customers with "I
              don't understand" messages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">The Hidden Costs of Basic Chatbots:</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">67% of customers abandon conversations</div>
                    <div className="text-slate-600">with unhelpful chatbots</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">40% drop in customer satisfaction</div>
                    <div className="text-slate-600">with scripted responses</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">3+ hours daily handling</div>
                    <div className="text-slate-600">"chatbot failures" by support teams</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Lost sales opportunities</div>
                    <div className="text-slate-600">due to poor first impressions</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl">
              <div className="text-center">
                <Bot className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-slate-900 mb-4">
                  What if your chatbot could actually understand your business?
                </h4>
                <p className="text-slate-600 mb-6">
                  Imagine intelligent, contextual responses that feel human and provide real value to your customers.
                </p>
                <Button
                  onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-gradient-to-r from-quickly-blue to-quickly-purple hover:from-quickly-blue/90 hover:to-quickly-purple/90"
                >
                  See the Solution
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-gradient-to-br from-quickly-blue/5 to-quickly-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Introducing RAG Technology:{" "}
              <span className="bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent">
                The Future of Business Conversations
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Retrieval-Augmented Generation (RAG) combines the power of your business knowledge with advanced AI to
              create truly intelligent conversations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-quickly-blue to-quickly-purple rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Intelligent Knowledge Retrieval</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Instantly access your entire business knowledge base</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Understands context and nuance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Provides answers with source attribution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-quickly-purple to-quickly-orange rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Dynamic Response Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>No more robotic, repetitive responses</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Each conversation is uniquely crafted</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Maintains conversation flow</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-quickly-orange to-quickly-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Custom Business Training</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Upload PDFs, documents, websites</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Learns your specific terminology</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Continuously improves with each interaction</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-quickly-blue to-quickly-orange rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Enterprise-Ready Deployment</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Multi-platform integration</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>White-label customization</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Advanced analytics and monitoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Transforming Conversations{" "}
              <span className="bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent">
                Across Every Industry
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Customer Support Revolution</CardTitle>
                <CardDescription>
                  Turn your knowledge base into a 24/7 expert support agent. Handle complex technical questions with the
                  intelligence of your best support representative.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Sales & Lead Generation</CardTitle>
                <CardDescription>
                  Qualify leads with intelligent conversations that understand your products, pricing, and value
                  propositions. Generate personalized quotes while you sleep.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Internal Knowledge Assistant</CardTitle>
                <CardDescription>
                  Give employees instant access to HR policies, IT procedures, and training materials. Reduce internal
                  support tickets by 70%.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">E-commerce Shopping Guide</CardTitle>
                <CardDescription>
                  Help customers find exactly what they need with intelligent product recommendations, real-time
                  inventory checking, and personalized shopping assistance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Professional Service Automation</CardTitle>
                <CardDescription>
                  Automate appointment scheduling, client onboarding, and FAQ handling while maintaining the personal
                  touch your clients expect.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-quickly-blue/5 to-quickly-purple/5">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-quickly-blue to-quickly-purple rounded-lg flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Your Industry Next</CardTitle>
                <CardDescription>
                  Ready to see how Quickly4u can transform conversations in your specific industry? Let's explore the
                  possibilities together.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-quickly-blue to-quickly-purple hover:from-quickly-blue/90 hover:to-quickly-purple/90"
                  onClick={() => window.open('https://cal.com/quickly4u/quicklydemochatbot', '_blank')}
                >
                  Book a Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Built for Business Intelligence,{" "}
              <span className="bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent">
                Designed for Results
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-quickly-blue to-quickly-purple rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No-Code Intelligence Builder</h3>
                  <p className="text-slate-600 mb-3">
                    Visual conversation flow designer with drag-and-drop knowledge base integration and pre-built
                    templates for instant deployment.
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Visual conversation flow designer</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Drag-and-drop knowledge base integration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Pre-built templates for instant deployment</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-quickly-purple to-quickly-orange rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Advanced Analytics Dashboard</h3>
                  <p className="text-slate-600 mb-3">
                    Track conversation success rates, identify knowledge gaps, and measure ROI with comprehensive
                    performance metrics.
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Conversation success rates and satisfaction scores</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Knowledge gap identification</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>ROI tracking and performance metrics</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-quickly-orange to-quickly-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise Security & Compliance</h3>
                  <p className="text-slate-600 mb-3">
                    Industry-standard security with end-to-end encryption and privacy-first data handling—no third-party sharing.
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Security best practices</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>End-to-end encryption</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Privacy-first data handling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-quickly-blue to-quickly-orange rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Multi-Platform Deployment</h3>
                  <p className="text-slate-600 mb-3">
                    Deploy across websites, mobile apps, social media, WhatsApp Business, and voice assistants with
                    comprehensive API access.
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Website widgets and mobile apps</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>WhatsApp Business, Facebook Messenger, Slack</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Voice assistant compatibility and API access</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-quickly-purple to-quickly-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Cutting-Edge AI Integration</h3>
                  <p className="text-slate-600 mb-3">
                    Powered by GPT-4, Claude 3.5, and Gemini Pro with custom fine-tuning and support for 85+ languages.
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>GPT-4, Claude 3.5, and Gemini Pro support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Custom fine-tuning for industry terminology</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Multi-language support (85+ languages)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-quickly-blue/5 to-quickly-purple/5">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Ready to Experience the Difference?</h4>
                    <p className="text-slate-600 mb-4">
                      See how these features work together to create truly intelligent conversations.
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-quickly-blue to-quickly-purple hover:from-quickly-blue/90 hover:to-quickly-purple/90"
                      onClick={() => window.open('https://cal.com/quickly4u/quicklydemochatbot', '_blank')}
                    >
                      Book a Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Join 500+ Businesses Already Experiencing{" "}
              <span className="bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent">
                the RAG Advantage
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent mb-2">
                95-99%
              </div>
              <div className="text-slate-600">accuracy on business-specific queries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-quickly-purple to-quickly-orange bg-clip-text text-transparent mb-2">
                30%
              </div>
              <div className="text-slate-600">reduction in customer support costs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-quickly-orange to-quickly-blue bg-clip-text text-transparent mb-2">
                67%
              </div>
              <div className="text-slate-600">increase in qualified leads</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent mb-2">
                {"<2s"}
              </div>
              <div className="text-slate-600">24/7 intelligent response time</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-quickly-orange text-quickly-orange" />
                  ))}
                </div>
                <blockquote className="text-lg text-slate-700 mb-4">
                  "TechStart Solutions reduced support tickets by 78% and increased customer satisfaction scores by 45%
                  within 3 months of implementing Quickly4u."
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-quickly-blue to-quickly-purple rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">TS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Sarah Chen</div>
                    <div className="text-slate-600 text-sm">CTO, TechStart Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-quickly-orange text-quickly-orange" />
                  ))}
                </div>
                <blockquote className="text-lg text-slate-700 mb-4">
                  "RetailMax generated an additional $120K in sales through intelligent product recommendations and
                  automated customer support."
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-quickly-purple to-quickly-orange rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">RM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Michael Rodriguez</div>
                    <div className="text-slate-600 text-sm">CEO, RetailMax</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <Badge variant="outline" className="px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Security Focused
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              Data Encryption
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              99.9% Uptime SLA
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              24/7 Enterprise Support
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Invest in Intelligence,{" "}
              <span className="bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent">
                Not Just Technology
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              The average business saves $2,400/month in support costs while generating $5,000+ in additional revenue.
              Your ROI typically pays for Quickly4u within the first month.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-slate-600 ${!isYearly ? 'font-semibold text-quickly-blue' : ''}`}>Monthly</span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="billing-toggle" 
                  className="sr-only" 
                  checked={isYearly}
                  onChange={() => setIsYearly(!isYearly)}
                />
                <label htmlFor="billing-toggle" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <div className={`block w-14 h-8 rounded-full transition-colors ${isYearly ? 'bg-quickly-blue' : 'bg-slate-300'}`}></div>
                    <div className={`dot absolute top-1 bg-white w-6 h-6 rounded-full transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </div>
                </label>
              </div>
              <span className={`text-slate-600 ${isYearly ? 'font-semibold text-quickly-blue' : ''}`}>Yearly</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">2 months free</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-slate-900">Professional</CardTitle>
                <CardDescription className="text-slate-600 mb-4">Perfect for Growing Businesses</CardDescription>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl text-slate-400 line-through">{isYearly ? '$588' : '$149'}</span>
                  <span className="text-4xl font-bold text-quickly-blue">{isYearly ? '$490' : '$49'}</span>
                </div>
                <div className="text-slate-600">{isYearly ? '/year' : '/month'}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>3 intelligent chatbots with full RAG capabilities</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>1GB knowledge base storage</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>5,000 AI-powered conversations/month</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Multi-platform deployment</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Priority support and training</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-8 bg-quickly-blue hover:bg-quickly-blue/90"
                  onClick={() => window.open('https://cal.com/quickly4u/quicklydemochatbot', '_blank')}
                >
                  Book a Call
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow relative bg-gradient-to-br from-quickly-blue/5 to-quickly-purple/5">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-quickly-blue to-quickly-purple text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-slate-900">Enterprise</CardTitle>
                <CardDescription className="text-slate-600 mb-4">
                  Complete Business Intelligence Solution
                </CardDescription>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl text-slate-400 line-through">{isYearly ? '$3588' : '$499'}</span>
                  <span className="text-4xl font-bold bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent">{isYearly ? '$2990' : '$299'}</span>
                </div>
                <div className="text-slate-600">{isYearly ? '/year' : '/month'}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Unlimited intelligent chatbots</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>10GB+ knowledge base storage</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Unlimited conversations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>White-label customization</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-8 bg-gradient-to-r from-quickly-blue to-quickly-purple hover:from-quickly-blue/90 hover:to-quickly-purple/90"
                  onClick={() => window.open('https://cal.com/quickly4u/quicklydemochatbot', '_blank')}
                >
                  Book a Call
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-slate-900">Enterprise Plus</CardTitle>
                <CardDescription className="text-slate-600 mb-4">Tailored Intelligence Solutions</CardDescription>
                <div className="text-4xl font-bold text-quickly-orange mb-2">Custom</div>
                <div className="text-slate-600">Pricing</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Custom AI model fine-tuning</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Dedicated cloud infrastructure</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Advanced security features</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Custom compliance requirements</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Dedicated success manager</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full mt-8 border-quickly-orange text-quickly-orange hover:bg-quickly-orange hover:text-quickly-blue bg-transparent"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Separator */}
          <div className="flex items-center justify-center my-12">
            <div className="flex-grow border-t border-slate-300"></div>
            <div className="mx-4 text-slate-500 font-medium">Enterprise Solutions</div>
            <div className="flex-grow border-t border-slate-300"></div>
          </div>
          
          {/* On-Premise Plan - Compact */}
          <div className="max-w-5xl mx-auto">
            <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 border-2 border-quickly-blue/20 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-quickly-blue/5 to-quickly-purple/5"></div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-quickly-blue/10 to-quickly-purple/10 rounded-full -translate-y-24 translate-x-24"></div>
              

              
              <div className="relative z-10">
                <CardHeader className="text-center pb-6 pt-12">
                  <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
                    On-Premise Deployment
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600 mb-6">
                    Complete ownership with your own infrastructure and LLM API
                  </CardDescription>
                  
                  {/* Pricing Display - Inline */}
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent">
                      $2,999
                    </div>
                    <div className="text-slate-600">
                      <div className="text-lg font-semibold">One-time cost</div>
                      <div className="text-sm text-quickly-blue font-medium">No recurring fees</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* What's Included */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-quickly-blue/10">
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-quickly-blue mr-2" />
                        What's Included
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-quickly-blue to-quickly-purple rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 text-sm font-medium">Complete on-premise deployment</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-quickly-blue to-quickly-purple rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 text-sm font-medium">Use your own LLM API (OpenAI, Claude, etc.)</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-quickly-blue to-quickly-purple rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 text-sm font-medium">Full source code access & customization</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-quickly-blue to-quickly-purple rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 text-sm font-medium">Complete data control & privacy</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-quickly-blue to-quickly-purple rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 text-sm font-medium">90 days implementation support</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Perfect For */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-quickly-purple/10">
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <Star className="w-5 h-5 text-quickly-purple mr-2" />
                        Perfect For
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-quickly-purple to-quickly-orange rounded-full flex items-center justify-center flex-shrink-0">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 text-sm font-medium">High-security requirements</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-quickly-purple to-quickly-orange rounded-full flex items-center justify-center flex-shrink-0">
                            <Globe className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 text-sm font-medium">Data sovereignty compliance</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-quickly-purple to-quickly-orange rounded-full flex items-center justify-center flex-shrink-0">
                            <Brain className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 text-sm font-medium">Custom AI model integration</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-quickly-purple to-quickly-orange rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 text-sm font-medium">Large enterprise deployments</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-quickly-purple to-quickly-orange rounded-full flex items-center justify-center flex-shrink-0">
                            <BarChart3 className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 text-sm font-medium">Cost control for high-volume usage</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* CTA Section - Compact */}
                  <div className="mt-8 text-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-quickly-blue to-quickly-purple hover:from-quickly-blue/90 hover:to-quickly-purple/90 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => window.open('https://cal.com/quickly4u/quicklydemochatbot', '_blank')}
                    >
                      Schedule Enterprise Consultation
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <p className="text-slate-600 mt-3 text-sm">
                      Get a personalized demo and implementation timeline
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Stylish Brand Name */}
            <div className="text-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-quickly-blue to-quickly-purple bg-clip-text text-transparent">
                quickly4u
              </span>
              <p className="text-gray-600 mt-2 text-sm">
                The Evolution of Conversation
              </p>
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <button
                onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}
                className="text-gray-600 hover:text-quickly-blue transition-colors"
              >
                Technology
              </button>
              <button
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="text-gray-600 hover:text-quickly-blue transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                className="text-gray-600 hover:text-quickly-blue transition-colors"
              >
                Pricing
              </button>
            </div>
            
            {/* Made with love message */}
            <MadeWithLoveMessage />
          </div>
        </div>
      </footer>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        title="Contact Sales"
        description="Get in touch with our sales team to learn more about Quickly4u and find the perfect solution for your business."
      />
    </div>
  )
}
