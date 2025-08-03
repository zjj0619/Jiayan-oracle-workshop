'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Camera, Trophy, Clock, Star, Target, Zap, Award, Upload, Book, Send, MessageSquare, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'

interface Challenge {
  id: number
  level: string
  image: string
  question: string
  options: string[]
  correct: number
  points: number
  hint: string
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

const TracePage = () => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [showHint, setShowHint] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '您好！我是甲言AI助手，专门解答甲骨文基础知识问题。您可以询问关于甲骨文的历史、字形特点、发现过程等问题。',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showChatbox, setShowChatbox] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const challenges: Challenge[] = [
    {
      id: 1,
      level: "初级",
      image: "/placeholder.svg?height=200&width=200",
      question: "这个甲骨文字代表什么？",
      options: ["太阳", "月亮", "星星", "云朵"],
      correct: 0,
      points: 100,
      hint: "这是一个圆形中间有一点的字形，象征着天空中最亮的天体"
    },
    {
      id: 2,
      level: "中级", 
      image: "/placeholder.svg?height=200&width=200",
      question: "这个字在甲骨文中的含义是？",
      options: ["水", "火", "土", "木"],
      correct: 1,
      points: 200,
      hint: "字形像火焰向上燃烧的样子"
    },
    {
      id: 3,
      level: "高级",
      image: "/placeholder.svg?height=200&width=200", 
      question: "这个复杂的甲骨文组合表示什么？",
      options: ["祭祀仪式", "战争场面", "农业活动", "商业贸易"],
      correct: 0,
      points: 300,
      hint: "包含了祭坛、供品和人物的组合字形"
    }
  ]

  const leaderboard = [
    { rank: 1, name: "甲骨学者", score: 2850, avatar: "🏆" },
    { rank: 2, name: "古文字迷", score: 2640, avatar: "🥈" },
    { rank: 3, name: "考古新星", score: 2420, avatar: "🥉" },
    { rank: 4, name: "文字探索者", score: 2180, avatar: "⭐" },
    { rank: 5, name: "历史爱好者", score: 1950, avatar: "📚" }
  ]

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      setGameState('result')
    }
    return () => clearTimeout(timer)
  }, [gameState, timeLeft])

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setTimeLeft(60)
    setCurrentChallenge(challenges[0])
    setSelectedAnswer(null)
    setShowHint(false)
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    
    setTimeout(() => {
      if (answerIndex === currentChallenge?.correct) {
        setScore(prev => prev + (currentChallenge?.points || 0))
      }
      
      const nextChallengeIndex = challenges.findIndex(c => c.id === currentChallenge?.id) + 1
      if (nextChallengeIndex < challenges.length) {
        setCurrentChallenge(challenges[nextChallengeIndex])
        setSelectedAnswer(null)
        setShowHint(false)
      } else {
        setGameState('result')
      }
    }, 1500)
  }

  const resetGame = () => {
    setGameState('menu')
    setCurrentChallenge(null)
    setSelectedAnswer(null)
    setScore(0)
    setTimeLeft(60)
    setShowHint(false)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const generateAIResponse = (question: string): string => {
    const responses: {[key: string]: string} = {
      '甲骨文': '甲骨文是中国商代（约公元前1600年-前1046年）的文字，是已发现的中国最早的成熟文字系统。它主要刻在龟甲和兽骨上，用于占卜记录，因此得名"甲骨文"。1899年，王懿荣首次发现并确认了甲骨文的存在，这是中国考古史上的重大发现。',
      '发现': '甲骨文的发现始于1899年，当时清朝学者王懿荣在购买的中药"龙骨"（实为龟甲和兽骨）上发现了刻划的文字。随后，刘鹗、罗振玉、王国维等学者进行了系统研究。1928年至1937年，中国学者董作宾在河南安阳小屯村进行了科学发掘，确认了这里就是商代后期都城殷墟，出土了大量甲骨文。',
      '字形': '甲骨文的字形具有明显的象形特点，许多字直接模仿其所表示事物的形状。例如，"日"字呈圆形，中间有一点，象征太阳；"月"字呈弯月形；"水"字像流动的水波纹。甲骨文是汉字发展的起点，通过金文、篆书等阶段，逐渐演变为现代汉字。',
      '内容': '甲骨文的内容主要是商王和贵族进行占卜的记录，包括对天象、气象、农业收成、狩猎、战争、疾病等方面的预测。这些记录反映了商代社会的政治、经济、文化等各个方面，是研究商代历史的重要资料。',
      '价值': '甲骨文的发现和研究具有重大价值：1. 将中国有文字可考的历史向前推进了约1000年；2. 证实了商代的存在，使"三代"（夏、商、周）由传说变为历史；3. 为研究汉字起源和演变提供了第一手资料；4. 为研究商代社会、政治、宗教等提供了珍贵史料。',
      '数量': '目前已发现的甲骨文约15万片，已识别的单字约4500个，其中能够确认字义的约1500个。这些甲骨文主要收藏在中国国家博物馆、台北故宫博物院、美国、日本、英国、加拿大等地的博物馆。',
      '占卜': '商代占卜是国家大事，由王或贵族主持。占卜前，先在龟甲或兽骨上钻凿小孔，然后用火烧灼，观察裂纹形状，根据裂纹判断吉凶。占卜结果会被刻在甲骨上，记录问卜的时间、人物、内容和结果等信息。',
      default: '甲骨文是中国最早的成熟文字系统，距今已有3000多年历史。它主要刻在龟甲和兽骨上，用于商代王室占卜。如果您想了解更多关于甲骨文的历史、字形特点或文化价值，请具体提问。'
    }

    for (const [key, response] of Object.entries(responses)) {
      if (key !== 'default' && question.includes(key)) {
        return response
      }
    }
    return responses.default
  }

  const toggleChatbox = () => {
    setShowChatbox(!showChatbox)
  }

  return (
    <div className="min-h-screen bg-bone-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 oracle-pattern">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-oracle-brown mb-6">
              识骨寻踪
            </h1>
            <p className="text-xl text-ink-black/80 mb-8">
              AI识图引擎，甲骨文解密挑战
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-oracle-brown/10 px-4 py-2 rounded-full">
                <Target className="w-5 h-5 text-oracle-brown" />
                <span className="text-oracle-brown font-medium">智能识别</span>
              </div>
              <div className="flex items-center gap-2 bg-bronze-blue/10 px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 text-bronze-blue" />
                <span className="text-bronze-blue font-medium">实时挑战</span>
              </div>
              <div className="flex items-center gap-2 bg-cinnabar-red/10 px-4 py-2 rounded-full">
                <Award className="w-5 h-5 text-cinnabar-red" />
                <span className="text-cinnabar-red font-medium">成就系统</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Game Modes */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-oracle-brown mb-6">游戏模式</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-effect oracle-shadow hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-oracle-brown">
                        <Search className="w-5 h-5" />
                        AI识图挑战
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-ink-black/70 mb-4">
                        上传甲骨文图片，让AI识别并解读其含义
                      </p>
                      <Button className="w-full bg-oracle-brown hover:bg-cinnabar-red text-bone-white">
                        开始识图
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-effect oracle-shadow hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-bronze-blue">
                        <Trophy className="w-5 h-5" />
                        解密挑战
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-ink-black/70 mb-4">
                        限时答题，挑战你的甲骨文知识水平
                      </p>
                      <Button 
                        className="w-full bg-bronze-blue hover:bg-cinnabar-red text-bone-white"
                        onClick={startGame}
                      >
                        开始挑战
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-effect oracle-shadow hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-cinnabar-red">
                        <Camera className="w-5 h-5" />
                        实时识别
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-ink-black/70 mb-4">
                        使用摄像头实时识别甲骨文字符
                      </p>
                      <Button className="w-full bg-cinnabar-red hover:bg-oracle-brown text-bone-white">
                        打开相机
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-effect oracle-shadow hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-oracle-brown">
                        <Star className="w-5 h-5" />
                        每日挑战
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-ink-black/70 mb-4">
                        每日更新的特殊挑战，获得额外奖励
                      </p>
                      <Button variant="outline" className="w-full border-oracle-brown text-oracle-brown hover:bg-oracle-brown hover:text-bone-white">
                        查看今日挑战
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Leaderboard */}
              <div>
                <h2 className="text-2xl font-bold text-oracle-brown mb-6">排行榜</h2>
                <Card className="glass-effect oracle-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-bronze-blue">
                      <Trophy className="w-5 h-5" />
                      本周排行
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leaderboard.map((player) => (
                        <div key={player.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-bone-white/50 transition-colors">
                          <div className="text-2xl">{player.avatar}</div>
                          <div className="flex-1">
                            <p className="font-medium text-ink-black">{player.name}</p>
                            <p className="text-sm text-ink-black/60">{player.score} 分</p>
                          </div>
                          <Badge variant={player.rank <= 3 ? "default" : "secondary"}>
                            #{player.rank}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {gameState === 'playing' && currentChallenge && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto"
            >
              {/* Game Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <Badge className="bg-oracle-brown text-bone-white">
                    {currentChallenge.level}
                  </Badge>
                  <div className="flex items-center gap-2 text-bronze-blue">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">{score} 分</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-cinnabar-red">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-lg">{timeLeft}s</span>
                </div>
              </div>

              {/* Challenge Card */}
              <Card className="glass-effect oracle-shadow mb-6">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <img 
                      src={currentChallenge.image} 
                      alt="甲骨文字符" 
                      className="w-48 h-48 mx-auto rounded-lg oracle-shadow bg-bone-white/50"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-oracle-brown mb-6">
                    {currentChallenge.question}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {currentChallenge.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? "default" : "outline"}
                        className={`h-12 ${
                          selectedAnswer === index
                            ? selectedAnswer === currentChallenge.correct
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                            : "border-bronze-blue/30 hover:bg-bronze-blue/10"
                        }`}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-oracle-brown/10 rounded-lg"
                    >
                      <p className="text-sm text-oracle-brown">
                        💡 提示: {currentChallenge.hint}
                      </p>
                    </motion.div>
                  )}

                  {!showHint && selectedAnswer === null && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 text-bronze-blue hover:text-cinnabar-red"
                      onClick={() => setShowHint(true)}
                    >
                      需要提示？
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-ink-black/60 mb-2">
                  <span>进度</span>
                  <span>{challenges.findIndex(c => c.id === currentChallenge.id) + 1} / {challenges.length}</span>
                </div>
                <Progress 
                  value={(challenges.findIndex(c => c.id === currentChallenge.id) + 1) / challenges.length * 100} 
                  className="h-2"
                />
              </div>
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto text-center"
            >
              <Card className="glass-effect oracle-shadow">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Trophy className="w-16 h-16 text-oracle-brown mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-oracle-brown mb-2">挑战完成！</h2>
                    <p className="text-lg text-ink-black/70">您的最终得分</p>
                  </div>
                  
                  <div className="text-6xl font-bold text-bronze-blue mb-6">
                    {score}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-oracle-brown">{challenges.length}</div>
                      <div className="text-sm text-ink-black/60">题目总数</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-bronze-blue">
                        {Math.round(score / (challenges.length * 100) * 100)}%
                      </div>
                      <div className="text-sm text-ink-black/60">正确率</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cinnabar-red">#{Math.floor(Math.random() * 50) + 1}</div>
                      <div className="text-sm text-ink-black/60">排名</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={resetGame}
                      className="bg-oracle-brown hover:bg-cinnabar-red text-bone-white"
                    >
                      再次挑战
                    </Button>
                    <Button variant="outline" className="border-bronze-blue text-bronze-blue hover:bg-bronze-blue hover:text-bone-white">
                      查看排行榜
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 甲骨文基础知识对话框 */}
      <AnimatePresence>
        {showChatbox && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setShowChatbox(false)}
          >
            <Card className="w-full max-w-2xl h-[600px] glass-effect oracle-shadow flex flex-col">
              <CardHeader className="flex-shrink-0 border-b border-oracle-brown/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-oracle-brown">
                    <Book className="w-5 h-5" />
                    甲骨文基础知识问答
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowChatbox(false)}
                    className="text-oracle-brown hover:text-cinnabar-red"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* 消息列表 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-oracle-brown text-bone-white'
                            : 'bg-bone-white/80 text-ink-black border border-bronze-blue/20'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-bone-white/80 text-ink-black border border-bronze-blue/20 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-bronze-blue rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-bronze-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-bronze-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                {/* 输入区域 */}
                <div className="flex-shrink-0 p-4 border-t border-oracle-brown/20">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="请输入您想了解的甲骨文问题..."
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="bg-oracle-brown hover:bg-cinnabar-red text-bone-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* 快捷问题 */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['甲骨文的发现', '字形特点', '占卜内容', '历史价值'].map((question) => (
                      <Button
                        key={question}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setInputValue(question)
                          setTimeout(() => handleSendMessage(), 100)
                        }}
                        className="text-xs border-bronze-blue/30 text-bronze-blue hover:bg-bronze-blue/10"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 浮动按钮 */}
      <Button
        onClick={toggleChatbox}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-oracle-brown hover:bg-cinnabar-red text-bone-white shadow-lg z-40"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    </div>
  )
}

export default TracePage
