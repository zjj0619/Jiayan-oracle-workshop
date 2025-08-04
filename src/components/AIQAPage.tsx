import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Send, 
  Sparkles, 
  BookOpen, 
  MessageCircle, 
  Zap,
  History,
  RefreshCw,
  Star,
  Clock,
  User,
  Bot,
  HelpCircle,
  Lightbulb,
  Scroll,
  Flame,
  Moon,
  Sun,
  Wind,
  Mountain,
  Waves
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  mode: 'divination' | 'knowledge'
}

interface DivinationResult {
  hexagram: string
  name: string
  meaning: string
  interpretation: string
  advice: string
  elements: string[]
}

const AIQAPage: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<'divination' | 'knowledge'>('divination')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [divinationResult, setDivinationResult] = useState<DivinationResult | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 预设问题
  const knowledgeQuestions = [
    "甲骨文是什么时候发现的？",
    "甲骨文主要用来做什么？",
    "甲骨文和现代汉字有什么关系？",
    "商朝的占卜文化是怎样的？",
    "甲骨文的书写工具是什么？",
    "甲骨文有多少个字符？"
  ]

  const divinationQuestions = [
    "我最近工作上遇到困难，该如何应对？",
    "感情方面有些迷茫，请指点迷津",
    "投资理财方面需要注意什么？",
    "学业上如何才能取得进步？",
    "健康方面需要关注哪些问题？",
    "人际关系如何处理更好？"
  ]

  // 模拟AI回复
  const generateAIResponse = async (question: string, mode: 'divination' | 'knowledge'): Promise<string> => {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (mode === 'knowledge') {
      const knowledgeResponses: { [key: string]: string } = {
        "甲骨文": "甲骨文是中国最早的成熟文字系统，发现于1899年的河南安阳殷墟。它主要刻在龟甲和牛骨上，用于商王室的占卜活动。甲骨文奠定了汉字发展的基础，现代汉字的许多字形都可以追溯到甲骨文。",
        "占卜": "商朝的占卜文化非常发达，商王通过甲骨占卜来决定国家大事。占卜过程包括提问、钻凿、烧灼、观察裂纹、解释结果等步骤，体现了古代中国人对天人合一思想的追求。",
        "书写": "甲骨文的书写工具主要是青铜刀具，用来在龟甲和牛骨上刻字。文字刻好后，有时会填入朱砂或墨汁，使字迹更加清晰。这种刻写方式影响了甲骨文字形的特点。",
        "字符": "目前已发现的甲骨文字符约有4500个，其中已识读的约有1500个。这些字符包括象形字、指事字、会意字等多种造字方法，展现了早期汉字的丰富性和创造性。"
      }

      // 根据关键词匹配回复
      for (const [key, response] of Object.entries(knowledgeResponses)) {
        if (question.includes(key)) {
          return response
        }
      }

      return "这是一个很好的问题！甲骨文作为中华文明的重要载体，承载着丰富的历史信息。建议您可以从甲骨文的发现历史、文字特点、文化价值等角度深入了解。如果您有更具体的问题，我很乐意为您详细解答。"
    } else {
      // 占卜模式
      const hexagrams = [
        { name: "乾", symbol: "☰", meaning: "天", advice: "刚健中正，自强不息" },
        { name: "坤", symbol: "☷", meaning: "地", advice: "厚德载物，包容万象" },
        { name: "震", symbol: "☳", meaning: "雷", advice: "动而有常，奋发向上" },
        { name: "巽", symbol: "☴", meaning: "风", advice: "顺势而为，灵活应变" },
        { name: "坎", symbol: "☵", meaning: "水", advice: "险中求进，智慧应对" },
        { name: "离", symbol: "☲", meaning: "火", advice: "光明磊落，热情进取" },
        { name: "艮", symbol: "☶", meaning: "山", advice: "稳重踏实，厚积薄发" },
        { name: "兑", symbol: "☱", meaning: "泽", advice: "和悦待人，沟通协调" }
      ]

      const randomHexagram = hexagrams[Math.floor(Math.random() * hexagrams.length)]
      
      const divinationResponse = `
🔮 **${randomHexagram.symbol} ${randomHexagram.name}卦 - ${randomHexagram.meaning}**

**卦象解读：**
${randomHexagram.advice}

**针对您的问题：**
根据卦象显示，当前情况需要您保持${randomHexagram.meaning === '天' ? '积极主动' : randomHexagram.meaning === '地' ? '包容耐心' : '灵活应变'}的态度。建议您在处理相关事务时，要${randomHexagram.advice}。

**行动建议：**
• 保持内心平静，理性分析现状
• 顺应自然规律，不要强求
• 注重积累和沉淀，厚积薄发
• 与他人保持良好沟通

**吉凶提示：**
此卦象整体偏向吉利，但需要您用心经营和耐心等待。记住"天行健，君子以自强不息"的古训。

*注：占卜结果仅供参考，人生路还需自己走。*
      `

      return divinationResponse
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      mode: currentMode
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(inputValue, currentMode)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        mode: currentMode
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error generating AI response:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuestionClick = (question: string) => {
    setInputValue(question)
  }

  const clearChat = () => {
    setMessages([])
    setDivinationResult(null)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="min-h-screen bg-oracle-light">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-oracle-primary via-oracle-secondary to-oracle-accent text-oracle-light">
        <div className="absolute inset-0 bg-oracle-primary/20"></div>
        <div className="container mx-auto px-6 relative z-10 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="bg-oracle-light/20 text-oracle-light border-oracle-light/30 mb-6 font-oracle">
              <Brain className="w-4 h-4" />
              AI问卜
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 font-oracle">
              古代智慧与现代AI的完美融合
              <span className="block text-oracle-gold">体验千年占卜文化</span>
            </h1>
            
            <p className="text-xl text-oracle-light/90 mb-8 leading-relaxed max-w-2xl mx-auto font-oracle">
              结合古代甲骨文占卜智慧与现代人工智能技术，
              为您提供人生指导和甲骨文知识问答服务。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-oracle-light text-oracle-primary hover:bg-oracle-surface border-oracle-gold font-oracle"
                onClick={() => setCurrentMode('divination')}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                开始占卜
              </Button>
              <Button 
                size="lg" 
                className="bg-oracle-gold/20 text-oracle-light hover:bg-oracle-gold/30 border-oracle-light font-oracle"
                onClick={() => setCurrentMode('knowledge')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                知识问答
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 左侧：模式切换和预设问题 */}
            <div className="lg:col-span-1">
              <Card className="bg-oracle-surface/90 backdrop-blur-sm border-oracle-border/20 shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-oracle-primary font-oracle">
                    <Zap className="w-5 h-5 text-oracle-gold" />
                    功能模式
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={currentMode} onValueChange={(value) => setCurrentMode(value as 'divination' | 'knowledge')}>
                    <TabsList className="grid w-full grid-cols-2 bg-oracle-light border-oracle-border/20">
                      <TabsTrigger value="divination" className="flex items-center gap-2 data-[state=active]:bg-oracle-gold data-[state=active]:text-oracle-primary font-oracle">
                        <Sparkles className="w-4 h-4" />
                        占卜问卜
                      </TabsTrigger>
                      <TabsTrigger value="knowledge" className="flex items-center gap-2 data-[state=active]:bg-oracle-gold data-[state=active]:text-oracle-primary font-oracle">
                        <BookOpen className="w-4 h-4" />
                        知识问答
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="divination" className="mt-4">
                      <div className="space-y-3">
                        <p className="text-sm text-oracle-muted mb-4 font-oracle">
                          基于古代甲骨文占卜智慧，为您的人生困惑提供指导建议
                        </p>
                        <div className="space-y-2">
                          {divinationQuestions.map((question, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuestionClick(question)}
                              className="w-full text-left p-3 text-sm bg-oracle-light hover:bg-oracle-gold/10 rounded-lg transition-colors text-oracle-primary font-oracle border border-oracle-border/10"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="knowledge" className="mt-4">
                      <div className="space-y-3">
                        <p className="text-sm text-oracle-muted mb-4 font-oracle">
                          了解甲骨文的历史、文化和相关知识
                        </p>
                        <div className="space-y-2">
                          {knowledgeQuestions.map((question, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuestionClick(question)}
                              className="w-full text-left p-3 text-sm bg-oracle-light hover:bg-oracle-gold/10 rounded-lg transition-colors text-oracle-primary font-oracle border border-oracle-border/10"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* 功能说明 */}
              <Card className="bg-oracle-surface/90 backdrop-blur-sm border-oracle-border/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-oracle-primary font-oracle">
                    <HelpCircle className="w-5 h-5 text-oracle-gold" />
                    使用说明
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-oracle-gold mt-0.5" />
                    <div>
                      <h4 className="font-medium text-oracle-primary font-oracle">占卜问卜</h4>
                      <p className="text-sm text-oracle-muted font-oracle">
                        输入您的困惑或问题，AI将结合古代占卜智慧为您提供指导
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-oracle-gold mt-0.5" />
                    <div>
                      <h4 className="font-medium text-oracle-primary font-oracle">知识问答</h4>
                      <p className="text-sm text-oracle-muted font-oracle">
                        询问关于甲骨文、古代文化的任何问题，获得专业解答
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右侧：聊天界面 */}
            <div className="lg:col-span-2">
              <Card className="bg-oracle-surface/90 backdrop-blur-sm border-oracle-border/20 shadow-lg h-[600px] flex flex-col">
                <CardHeader className="flex-shrink-0 bg-oracle-light border-b border-oracle-border/20">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-oracle-primary font-oracle">
                      {currentMode === 'divination' ? (
                        <>
                          <Sparkles className="w-5 h-5 text-oracle-gold" />
                          AI占卜师
                        </>
                      ) : (
                        <>
                          <Brain className="w-5 h-5 text-oracle-gold" />
                          甲骨文知识助手
                        </>
                      )}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearChat}
                      className="bg-oracle-gold/20 text-oracle-primary hover:bg-oracle-gold/30 border-oracle-gold/40 font-oracle"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      清空对话
                    </Button>
                  </div>
                </CardHeader>

                {/* 聊天消息区域 */}
                <CardContent className="flex-1 flex flex-col p-0 bg-oracle-light">
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                    {messages.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-oracle-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          {currentMode === 'divination' ? (
                            <Sparkles className="w-8 h-8 text-oracle-gold" />
                          ) : (
                            <BookOpen className="w-8 h-8 text-oracle-gold" />
                          )}
                        </div>
                        <h3 className="text-lg font-medium text-oracle-primary mb-2 font-oracle">
                          {currentMode === 'divination' ? '开始您的占卜之旅' : '开始知识探索'}
                        </h3>
                        <p className="text-oracle-muted font-oracle">
                          {currentMode === 'divination' 
                            ? '请输入您想要占卜的问题，AI将为您解读卦象' 
                            : '请输入您想了解的甲骨文相关问题'
                          }
                        </p>
                      </div>
                    )}

                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.type === 'ai' && (
                          <div className="w-8 h-8 bg-oracle-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-oracle-light" />
                          </div>
                        )}
                        
                        <div className={`max-w-[80%] ${
                          message.type === 'user' 
                            ? 'bg-oracle-primary text-oracle-light' 
                            : 'bg-oracle-surface text-oracle-primary'
                        } rounded-2xl px-4 py-3 border ${
                          message.type === 'user' 
                            ? 'border-oracle-gold/30' 
                            : 'border-oracle-border/20'
                        }`}>
                          <div className="whitespace-pre-wrap text-sm leading-relaxed font-oracle">
                            {message.content}
                          </div>
                          <div className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-oracle-light/70' : 'text-oracle-muted'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>

                        {message.type === 'user' && (
                          <div className="w-8 h-8 bg-oracle-gold rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-oracle-primary" />
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 justify-start"
                      >
                        <div className="w-8 h-8 bg-oracle-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-oracle-light" />
                        </div>
                        <div className="bg-oracle-surface rounded-2xl px-4 py-3 border border-oracle-border/20">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-oracle-gold rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-oracle-gold rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-oracle-gold rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            <span className="text-sm text-oracle-muted ml-2 font-oracle">正在思考中...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* 输入区域 */}
                  <div className="border-t border-oracle-border/20 p-4 bg-oracle-surface">
                    <div className="flex gap-3">
                      <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={currentMode === 'divination' ? '请输入您想要占卜的问题...' : '请输入您想了解的甲骨文问题...'}
                        className="bg-oracle-light border-oracle-border/20 text-oracle-primary placeholder:text-oracle-muted font-oracle resize-none focus:border-oracle-gold focus:ring-oracle-gold/20"
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        className="bg-oracle-primary text-oracle-light hover:bg-oracle-secondary border-oracle-gold self-end"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-oracle-muted mt-2 font-oracle">
                      按 Enter 发送，Shift + Enter 换行
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 特色功能展示 */}
      <section className="py-20 bg-oracle-surface">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-oracle-gold/20 text-oracle-primary border-oracle-gold/40 mb-4 font-oracle">
              <Star className="w-4 h-4" />
              特色功能
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-oracle-primary mb-4 font-oracle">
              古代智慧与现代科技的完美结合
            </h2>
            <p className="text-xl text-oracle-muted max-w-2xl mx-auto font-oracle">
              体验传统占卜文化的神秘魅力，获得现代AI的智慧指导
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "智能占卜",
                description: "结合古代卦象与现代AI，提供个性化人生指导",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "知识问答",
                description: "专业的甲骨文知识库，解答您的所有疑问",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <History className="w-8 h-8" />,
                title: "历史传承",
                description: "传承千年占卜文化，感受古代智慧的深邃",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "智慧启发",
                description: "获得人生启发和思考方向，指引前进道路",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-oracle-light/90 backdrop-blur-sm border-oracle-border/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full text-center">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-oracle-primary mb-3 font-oracle">{feature.title}</h3>
                    <p className="text-oracle-muted text-sm leading-relaxed font-oracle">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AIQAPage