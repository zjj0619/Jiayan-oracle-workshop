'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send, User, Bot, BrainCircuit, BookOpen, History, Loader2, CornerDownLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAIChat, Message } from '../hooks/useAIChat'

const expertTopics = [
  {
    icon: BrainCircuit,
    title: "探寻字形演变",
    prompt: "请为我解释“马”字的甲骨文、金文、小篆、隶书的演变过程。",
    image: "https://images.unsplash.com/photo-1516533694436-498f453941dd?q=80&w=800&auto=format&fit=crop",
    description: "从图形到笔画，追溯汉字的千年演化史。"
  },
  {
    icon: BookOpen,
    title: "解读商代卜辞",
    prompt: "“己巳卜，贞，旬无祸？”这句卜辞是什么意思？",
    image: "https://images.unsplash.com/photo-1588216614227-1108e4a452cf?q=80&w=800&auto=format&fit=crop",
    description: "揭开刻在龟甲兽骨上的神秘预言，了解商人的所思所想。"
  },
  {
    icon: History,
    title: "了解历史背景",
    prompt: "商代为什么盛行用龟甲和兽骨进行占卜？",
    image: "https://images.unsplash.com/photo-1604580863024-3d8d945852d4?q=80&w=800&auto=format&fit=crop",
    description: "探索商代社会、文化与“敬天事鬼”的宗教观念。"
  },
]

const AIQAPage = () => {
  const { messages, isLoading, sendMessage } = useAIChat()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleTopicSelect = (prompt: string) => {
    setInput(prompt)
    // Focus on the input field after selecting a topic
    document.getElementById('chat-input')?.focus()
  }

  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input)
      setInput('')
    }
  }

  return (
    <div className="min-h-screen bg-stone-900 text-stone-300 pt-20 oracle-pattern-dark">
      <div className="container mx-auto max-w-6xl py-12 px-4">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-amber-50 mb-6 tracking-wider">
            AI 问卜
          </h1>
          <p className="text-xl text-stone-300/90 max-w-3xl mx-auto">
            与甲骨文智能助手对话，探索三千年前的奥秘。
          </p>
        </motion.div>

        {/* Expert Topics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-amber-100 mb-8 text-center flex items-center justify-center gap-3">
            <Sparkles className="text-amber-300"/>
            灵感启发
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertTopics.map((topic) => (
              <Card 
                key={topic.title} 
                className="bg-stone-800/60 border-stone-700 group relative overflow-hidden transition-all duration-300 hover:border-amber-500/50 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: `url(${topic.image})`}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                <div className="relative flex flex-col h-full p-6">
                  <topic.icon className="w-8 h-8 text-amber-300 mb-4"/>
                  <h3 className="text-2xl font-serif font-bold text-amber-50 mb-2">{topic.title}</h3>
                  <p className="text-stone-300/80 mb-4 flex-grow">{topic.description}</p>
                  <Button 
                    onClick={() => handleTopicSelect(topic.prompt)}
                    className="w-full bg-amber-500/10 border border-amber-500/20 text-amber-200 hover:bg-amber-500/20"
                  >
                    <CornerDownLeft className="w-4 h-4 mr-2"/>
                    以此提问
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Chat Interface Section */}
        <Card className="bg-stone-800/50 border-stone-700 shadow-2xl shadow-black/30">
          <CardContent className="p-0">
            <div className="h-[60vh] flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.type === 'ai' && (
                      <Avatar className="border-2 border-amber-400/50">
                        <AvatarImage src="https://images.unsplash.com/photo-1693341022633-c698a346c169?q=80&w=800&auto=format&fit=crop" />
                        <AvatarFallback><Bot /></AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`max-w-lg p-4 rounded-2xl ${msg.type === 'user' ? 'bg-amber-600/30 text-amber-100 rounded-br-none' : 'bg-stone-700/60 text-stone-200 rounded-bl-none'}`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.type === 'user' && (
                      <Avatar>
                        <AvatarFallback><User /></AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-4 justify-start"
                  >
                    <Avatar className="border-2 border-amber-400/50">
                      <AvatarImage src="https://images.unsplash.com/photo-1693341022633-c698a346c169?q=80&w=800&auto=format&fit=crop" />
                      <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div className="max-w-lg p-4 rounded-2xl bg-stone-700/60 text-stone-200 rounded-bl-none flex items-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin text-amber-400" />
                      <span className="italic">正在思考中...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 border-t border-stone-700 bg-stone-800/70">
                <div className="relative">
                  <Input
                    id="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    placeholder="在此输入您的问题..."
                    disabled={isLoading}
                    className="h-12 pl-4 pr-14 text-base bg-stone-900 border-stone-600 focus:border-amber-400 focus:ring-amber-400"
                  />
                  <Button
                    size="icon"
                    onClick={() => !isLoading && handleSendMessage()}
                    disabled={isLoading}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-amber-500 hover:bg-amber-400"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AIQAPage