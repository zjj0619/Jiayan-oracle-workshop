import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Clock, 
  Search,
  Play,
  Eye,
  Heart,
  ChevronRight,
  Calendar,
  Layers,
  Award,
  Scroll
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface CharacterEvolution {
  id: string
  character: string
  meaning: string
  oracle: string
  bronze: string
  seal: string
  regular: string
  description: string
  story: string
  category: string
  views: number
  likes: number
  isLiked: boolean
}

const OriginPage: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterEvolution | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // 汉字演变数据
  const characters: CharacterEvolution[] = [
    {
      id: '1',
      character: '日',
      meaning: '太阳',
      oracle: '☉',
      bronze: '◯',
      seal: '日',
      regular: '日',
      description: '象形字，像太阳的形状，中间有一点表示太阳黑子',
      story: '古人观察太阳，发现太阳中间有黑点，于是在圆形中加一点来表示太阳',
      category: '自然',
      views: 2341,
      likes: 156,
      isLiked: false
    },
    {
      id: '2',
      character: '月',
      meaning: '月亮',
      oracle: '☽',
      bronze: '⟨',
      seal: '月',
      regular: '月',
      description: '象形字，像弯月的形状',
      story: '古人观察月相变化，用弯曲的线条来表示月亮的形状',
      category: '自然',
      views: 1987,
      likes: 134,
      isLiked: true
    },
    {
      id: '3',
      character: '水',
      meaning: '水',
      oracle: '川',
      bronze: '氵',
      seal: '水',
      regular: '水',
      description: '象形字，像水流的样子',
      story: '古人用弯曲的线条表示水的流动，后来演变为现在的水字',
      category: '自然',
      views: 1756,
      likes: 98,
      isLiked: false
    },
    {
      id: '4',
      character: '人',
      meaning: '人',
      oracle: '𠂉',
      bronze: '人',
      seal: '人',
      regular: '人',
      description: '象形字，像人的侧面形状',
      story: '古人用简单的线条勾勒出人的轮廓，强调人直立行走的特征',
      category: '人物',
      views: 3421,
      likes: 234,
      isLiked: true
    },
    {
      id: '5',
      character: '山',
      meaning: '山',
      oracle: '⛰',
      bronze: '山',
      seal: '山',
      regular: '山',
      description: '象形字，像山峰的形状',
      story: '古人用三个尖峰来表示连绵的山脉，体现了山的高耸特征',
      category: '自然',
      views: 1654,
      likes: 87,
      isLiked: false
    },
    {
      id: '6',
      character: '火',
      meaning: '火',
      oracle: '🔥',
      bronze: '火',
      seal: '火',
      regular: '火',
      description: '象形字，像火焰燃烧的样子',
      story: '古人观察火焰跳跃的形态，用弯曲的线条表示火的动态美',
      category: '自然',
      views: 2156,
      likes: 145,
      isLiked: false
    }
  ]

  const periods = [
    {
      id: '1',
      name: '甲骨文时期',
      period: '商代晚期（约公元前1250-1046年）',
      description: '中国最早的成熟文字系统，主要用于占卜记录',
      image: '/jiaguwen.jpg',
      color: 'from-amber-600 to-orange-700'
    },
    {
      id: '2',
      name: '金文时期',
      period: '西周至春秋（约公元前1046-476年）',
      description: '铸刻在青铜器上的文字，用于记录重要事件',
      image: '/jinwen.webp',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: '3',
      name: '小篆时期',
      period: '秦朝（约公元前221-206年）',
      description: '秦始皇统一文字后的标准字体',
      image: '/xiaozhuan.jpg',
      color: 'from-purple-600 to-pink-700'
    },
    {
      id: '4',
      name: '楷书时期',
      period: '汉代至今（约公元前206年起）',
      description: '现代汉字的基础形态，规范化程度最高',
      image: '/kaishu.jpg',
      color: 'from-green-600 to-emerald-700'
    }
  ]

  const categories = [
    { value: 'all', label: '全部' },
    { value: '自然', label: '自然' },
    { value: '人物', label: '人物' },
    { value: '动物', label: '动物' },
    { value: '器物', label: '器物' }
  ]

  const filteredCharacters = characters.filter(char => {
    const matchesSearch = char.character.includes(searchQuery) || 
                         char.meaning.includes(searchQuery) ||
                         char.description.includes(searchQuery)
    const matchesCategory = selectedCategory === 'all' || char.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const startAnimation = () => {
    if (!selectedCharacter) return
    setIsAnimating(true)
    setCurrentStep(0)
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= 3) {
          clearInterval(interval)
          setIsAnimating(false)
          return 0
        }
        return prev + 1
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-oracle-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-oracle-primary via-oracle-secondary to-oracle-accent text-oracle-light">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-modern relative z-10 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="bg-oracle-gold/20 text-oracle-light border-oracle-gold/30 mb-6 px-4 py-2 rounded-full font-oracle">
              <Scroll className="w-4 h-4" />
              字源探寻
            </Badge>
            
            <h1 className="text-responsive-xl font-bold leading-tight mb-6 font-oracle text-oracle-light">
              探索汉字的千年演变
              <span className="block text-oracle-gold">从甲骨到楷书的文明传承</span>
            </h1>
            
            <p className="text-xl text-oracle-light/90 mb-8 leading-relaxed max-w-2xl mx-auto font-oracle">
              跟随时间的脚步，见证汉字从古老的甲骨文到现代楷书的华丽蜕变，
              感受中华文明的深厚底蕴和文字艺术的无穷魅力。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-oracle-light text-oracle-primary hover:bg-oracle-surface border-2 border-oracle-gold hover:border-oracle-gold/80 font-oracle font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Play className="w-5 h-5 mr-2" />
                开始探索
              </Button>
              <Button size="lg" variant="outline" className="border-oracle-gold/50 text-oracle-light hover:bg-oracle-gold/20 hover:border-oracle-gold font-oracle font-semibold px-8 py-3 rounded-xl">
                <BookOpen className="w-5 h-5 mr-2" />
                学习指南
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 历史时期展示 */}
      <section className="py-20 bg-oracle-light">
        <div className="container-modern">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-oracle-gold/20 text-oracle-primary border-oracle-gold/40 mb-4 px-4 py-2 rounded-full font-oracle">
              <Clock className="w-4 h-4" />
              历史时期
            </Badge>
            <h2 className="text-responsive-lg font-bold text-oracle-primary mb-4 font-oracle">
              汉字发展的四个重要阶段
            </h2>
            <p className="text-xl text-oracle-secondary max-w-2xl mx-auto font-oracle">
              从商代甲骨文到现代楷书，每个时期都有其独特的特征和历史价值
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {periods.map((period, index) => (
              <motion.div
                key={period.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-oracle-surface border-2 border-oracle-border/20 rounded-2xl shadow-lg hover:shadow-xl hover:border-oracle-gold/40 transition-all duration-300 hover:transform hover:-translate-y-2 h-full">
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img 
                      src={period.image} 
                      alt={period.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-oracle-primary/70 to-oracle-secondary/70"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-oracle-gold/30 text-oracle-light border-oracle-gold/50 font-oracle">
                        <Calendar className="w-3 h-3" />
                        第{index + 1}阶段
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-oracle-light mb-1 font-oracle">{period.name}</h3>
                      <p className="text-oracle-light/80 text-sm font-oracle">{period.period}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 bg-oracle-surface">
                    <p className="text-oracle-secondary mb-4 leading-relaxed font-oracle">{period.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-oracle-secondary font-oracle">
                        了解更多详情
                      </div>
                      <ChevronRight className="w-5 h-5 text-oracle-muted hover:text-oracle-gold transition-colors duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 汉字演变展示 */}
      <section className="py-20 bg-oracle-surface">
        <div className="container-modern">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-oracle-gold/20 text-oracle-primary border-oracle-gold/40 mb-4 px-4 py-2 rounded-full font-oracle">
              <Layers className="w-4 h-4" />
              汉字演变
            </Badge>
            <h2 className="text-responsive-lg font-bold text-oracle-primary mb-4 font-oracle">
              见证汉字的华丽蜕变
            </h2>
            <p className="text-xl text-oracle-secondary max-w-2xl mx-auto font-oracle">
              选择一个汉字，观看它从甲骨文到现代楷书的完整演变过程
            </p>
          </motion.div>

          {/* 搜索和筛选 */}
          <Card className="bg-oracle-light border-2 border-oracle-border/20 rounded-2xl shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="搜索汉字、含义或描述..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-oracle-surface border-oracle-border/30 text-oracle-primary placeholder:text-oracle-muted focus:border-oracle-gold focus:ring-oracle-gold/20 rounded-xl pl-12 font-oracle"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-oracle-muted" />
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                      className={selectedCategory === category.value 
                        ? 'bg-oracle-primary text-oracle-light hover:bg-oracle-secondary border-oracle-gold font-oracle' 
                        : 'border-oracle-border text-oracle-secondary hover:bg-oracle-gold/10 hover:border-oracle-gold font-oracle'
                      }
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 汉字网格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCharacters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="bg-oracle-light border-2 border-oracle-border/20 rounded-2xl shadow-lg hover:shadow-xl hover:border-oracle-gold/40 transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer h-full"
                  onClick={() => setSelectedCharacter(character)}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-6xl font-bold text-oracle-primary mb-2 font-oracle">
                        {character.character}
                      </div>
                      <h3 className="text-xl font-bold text-oracle-primary mb-1 font-oracle">
                        {character.meaning}
                      </h3>
                      <Badge className="bg-oracle-gold/20 text-oracle-primary border-oracle-gold/40 font-oracle">
                        {character.category}
                      </Badge>
                    </div>
                    
                    <p className="text-oracle-secondary text-sm leading-relaxed mb-4 line-clamp-2 font-oracle">
                      {character.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-oracle-secondary">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span className="font-oracle">{character.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className={`w-4 h-4 ${character.isLiked ? 'text-oracle-accent fill-current' : ''}`} />
                          <span className="font-oracle">{character.likes}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-oracle-muted hover:text-oracle-gold transition-colors duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 空状态 */}
          {filteredCharacters.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-oracle-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-oracle-primary mb-2 font-oracle">未找到相关汉字</h3>
              <p className="text-oracle-secondary font-oracle">尝试调整搜索条件或选择其他分类</p>
            </div>
          )}
        </div>
      </section>

      {/* 汉字详情弹窗 */}
      <AnimatePresence>
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-oracle-light rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-2 border-oracle-gold/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 头部 */}
              <div className="flex items-center justify-between p-6 border-b border-oracle-border/20 bg-oracle-surface">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-oracle text-oracle-primary">{selectedCharacter.character}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-oracle-primary font-oracle">{selectedCharacter.meaning}</h2>
                    <Badge className="bg-oracle-gold/20 text-oracle-primary border-oracle-gold/40 font-oracle">{selectedCharacter.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={startAnimation}
                    disabled={isAnimating}
                    className="bg-oracle-primary text-oracle-light hover:bg-oracle-secondary border-oracle-gold font-oracle"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isAnimating ? '播放中' : '演变动画'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCharacter(null)}
                    className="p-2 text-oracle-muted hover:text-oracle-primary hover:bg-oracle-gold/10"
                  >
                    ×
                  </Button>
                </div>
              </div>

              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto scrollbar-thin">
                {/* 演变展示 */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-ink-black mb-6">字形演变过程</h3>
                  <div className="grid grid-cols-4 gap-6">
                    {[
                      { stage: 'oracle', name: '甲骨文', char: selectedCharacter.oracle },
                      { stage: 'bronze', name: '金文', char: selectedCharacter.bronze },
                      { stage: 'seal', name: '小篆', char: selectedCharacter.seal },
                      { stage: 'regular', name: '楷书', char: selectedCharacter.regular }
                    ].map((item, index) => (
                      <div key={item.stage} className="text-center">
                        <div className={`w-24 h-24 mx-auto mb-3 rounded-2xl flex items-center justify-center text-4xl oracle-text transition-all duration-500 ${
                          isAnimating && currentStep === index 
                            ? 'bg-oracle-brown text-white oracle-shadow-lg scale-110' 
                            : 'bg-warm-white text-oracle-brown'
                        }`}>
                          {item.char}
                        </div>
                        <div className="font-medium text-ink-black">{item.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 详细信息 */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-ink-black mb-4">字形解析</h3>
                    <p className="text-stone-gray leading-relaxed mb-6">
                      {selectedCharacter.description}
                    </p>
                    
                    <h3 className="text-lg font-bold text-ink-black mb-4">造字故事</h3>
                    <p className="text-stone-gray leading-relaxed">
                      {selectedCharacter.story}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-ink-black mb-4">统计信息</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-warm-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <Eye className="w-5 h-5 text-oracle-brown" />
                          <span>浏览次数</span>
                        </div>
                        <span className="font-bold text-oracle-brown">{selectedCharacter.views}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-warm-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-oracle-brown" />
                          <span>点赞数量</span>
                        </div>
                        <span className="font-bold text-oracle-brown">{selectedCharacter.likes}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-warm-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-oracle-brown" />
                          <span>字符分类</span>
                        </div>
                        <Badge className="badge-oracle">
                          {selectedCharacter.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-6">
                      <Button 
                        size="sm" 
                        className="btn-oracle flex-1"
                      >
                        <Heart className={`w-4 h-4 mr-2 ${selectedCharacter.isLiked ? 'fill-current' : ''}`} />
                        {selectedCharacter.isLiked ? '已点赞' : '点赞'}
                      </Button>
                      <Button size="sm" className="btn-secondary">
                        分享
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OriginPage