import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Eye, 
  Heart, 
  Share2, 
  Download,
  Calendar,
  MapPin,
  Info,
  Zap,
  Star,
  Clock,
  User,
  Tag,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  RotateCw,
  Maximize,
  BookOpen,
  Building2,
  Scroll,
  Crown,
  Gem,
  Award,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Artifact {
  id: string
  title: string
  description: string
  period: string
  dynasty: string
  location: string
  discoveryDate: string
  material: string
  size: string
  weight: string
  condition: string
  significance: string
  images: string[]
  tags: string[]
  views: number
  likes: number
  isLiked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  category: string
}

const DigitalCollectionPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // 模拟文物数据
  const artifacts: Artifact[] = [
    {
      id: '1',
      title: '商王武丁时期甲骨',
      description: '这是一片记录商王武丁时期占卜内容的甲骨，上面刻有关于战争、祭祀和农业的卜辞，是研究商代历史的珍贵资料。',
      period: '商代晚期',
      dynasty: '商朝',
      location: '河南安阳殷墟',
      discoveryDate: '1928年',
      material: '龟甲',
      size: '长15.2cm，宽12.8cm',
      weight: '约180g',
      condition: '保存完好',
      significance: '记录了商王武丁时期的重要历史事件，对研究商代政治、军事、宗教具有重要价值。',
      images: ['/jiaguwen.jpg'],
      tags: ['甲骨文', '占卜', '武丁', '殷墟'],
      views: 2341,
      likes: 156,
      isLiked: false,
      rarity: 'legendary',
      category: '甲骨文'
    },
    {
      id: '2',
      title: '西周青铜鼎铭文',
      description: '西周时期的青铜鼎，鼎内壁刻有金文铭文，记录了册封仪式和土地分配的内容，展现了西周的政治制度。',
      period: '西周早期',
      dynasty: '西周',
      location: '陕西宝鸡',
      discoveryDate: '1976年',
      material: '青铜',
      size: '高32.5cm，口径28.7cm',
      weight: '约8.5kg',
      condition: '轻微锈蚀',
      significance: '反映了西周时期的政治制度和社会结构，是研究西周历史的重要实物资料。',
      images: ['/jinwen.webp'],
      tags: ['金文', '青铜器', '西周', '册封'],
      views: 1876,
      likes: 134,
      isLiked: true,
      rarity: 'epic',
      category: '金文'
    },
    {
      id: '3',
      title: '秦始皇诏版',
      description: '秦始皇统一文字后颁布的诏书石版，上面刻有标准的小篆文字，体现了"书同文"政策的实施。',
      period: '秦朝',
      dynasty: '秦朝',
      location: '陕西西安',
      discoveryDate: '1974年',
      material: '石材',
      size: '长45cm，宽35cm，厚8cm',
      weight: '约12kg',
      condition: '保存良好',
      significance: '见证了中国文字统一的历史时刻，对研究秦朝政治制度和文字发展具有重要意义。',
      images: ['/xiaozhuan.jpg'],
      tags: ['小篆', '秦始皇', '书同文', '诏书'],
      views: 3421,
      likes: 234,
      isLiked: false,
      rarity: 'legendary',
      category: '小篆'
    }
  ]

  const categories = [
    { value: 'all', label: '全部', count: artifacts.length },
    { value: '甲骨文', label: '甲骨文', count: 1 },
    { value: '金文', label: '金文', count: 1 },
    { value: '小篆', label: '小篆', count: 1 }
  ]

  const periods = [
    { value: 'all', label: '全部时期' },
    { value: '商代晚期', label: '商代晚期' },
    { value: '西周早期', label: '西周早期' },
    { value: '秦朝', label: '秦朝' }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return '普通'
      case 'rare': return '珍贵'
      case 'epic': return '稀有'
      case 'legendary': return '传奇'
      default: return '普通'
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Star className="w-3 h-3" />
      case 'rare': return <Gem className="w-3 h-3" />
      case 'epic': return <Crown className="w-3 h-3" />
      case 'legendary': return <Award className="w-3 h-3" />
      default: return <Star className="w-3 h-3" />
    }
  }

  const filteredArtifacts = artifacts.filter(artifact => {
    const matchesSearch = artifact.title.includes(searchQuery) || 
                         artifact.description.includes(searchQuery) ||
                         artifact.tags.some(tag => tag.includes(searchQuery))
    const matchesCategory = selectedCategory === 'all' || artifact.category === selectedCategory
    const matchesPeriod = selectedPeriod === 'all' || artifact.period === selectedPeriod
    return matchesSearch && matchesCategory && matchesPeriod
  })

  const handleLike = (artifactId: string) => {
    console.log('Like artifact:', artifactId)
  }

  return (
    <div className="min-h-screen bg-oracle-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-oracle-brown via-oracle-brown/90 to-oracle-ink text-oracle-surface">
        <div className="absolute inset-0 bg-oracle-ink/20"></div>
        <div className="container mx-auto px-6 relative z-10 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="bg-oracle-surface/20 text-oracle-surface border-oracle-surface/30 mb-6 font-oracle">
              <Museum className="w-4 h-4" />
              数字典藏
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-oracle">
              珍贵文物数字化典藏
              <span className="block text-oracle-gold">穿越时空的文明对话</span>
            </h1>
            
            <p className="text-xl text-oracle-surface/90 mb-8 leading-relaxed max-w-2xl mx-auto font-oracle">
              通过数字化技术，让珍贵的甲骨文文物得以永久保存和传承，
              让每个人都能近距离欣赏这些文明瑰宝。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-oracle-surface text-oracle-brown hover:bg-oracle-surface/90 border-oracle-surface hover:border-oracle-surface/90 transition-all duration-200 font-oracle">
                <Eye className="w-5 h-5 mr-2" />
                开始探索
              </Button>
              <Button size="lg" variant="outline" className="border-oracle-surface/30 text-oracle-surface hover:bg-oracle-surface/10 hover:border-oracle-surface/50 transition-all duration-200 font-oracle">
                <Download className="w-5 h-5 mr-2" />
                下载资料
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        {/* 搜索和筛选区域 */}
        <Card className="bg-oracle-surface border-oracle-border/30 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="搜索文物名称、描述或标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-oracle-bg border-oracle-border/30 text-oracle-primary placeholder:text-oracle-muted focus:border-oracle-brown focus:ring-oracle-brown/20 pl-12 font-oracle"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-oracle-muted" />
              </div>
              
              <div className="flex gap-4 items-center">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-oracle-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-oracle-brown/20 bg-oracle-bg text-oracle-primary font-oracle"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-oracle-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-oracle-brown/20 bg-oracle-bg text-oracle-primary font-oracle"
                >
                  {periods.map((period) => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
                
                <div className="flex border border-oracle-border/30 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-oracle-brown text-oracle-surface hover:bg-oracle-brown/90 font-oracle' : 'text-oracle-muted hover:text-oracle-primary hover:bg-oracle-surface font-oracle'}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-oracle-brown text-oracle-surface hover:bg-oracle-brown/90 font-oracle' : 'text-oracle-muted hover:text-oracle-primary hover:bg-oracle-surface font-oracle'}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 文物展示区域 */}
        <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
          {filteredArtifacts.map((artifact, index) => (
            <motion.div
              key={artifact.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-oracle-surface border-oracle-border/30 shadow-lg hover:shadow-xl hover:border-oracle-brown/50 transition-all duration-300 cursor-pointer h-full group">
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <img 
                    src={artifact.images[0]} 
                    alt={artifact.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`text-xs border ${getRarityColor(artifact.rarity)} font-oracle`}>
                      {getRarityIcon(artifact.rarity)}
                      <span className="ml-1">{getRarityLabel(artifact.rarity)}</span>
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-oracle-ink/70 text-oracle-surface border-oracle-surface/30 font-oracle">
                      {artifact.period}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-oracle-primary mb-2 line-clamp-1 font-oracle">
                    {artifact.title}
                  </h3>
                  <p className="text-oracle-muted text-sm leading-relaxed mb-4 line-clamp-2 font-oracle">
                    {artifact.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {artifact.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-oracle-border/50 text-oracle-muted hover:border-oracle-brown/50 hover:text-oracle-primary transition-colors font-oracle">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-oracle-muted">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span className="font-oracle">{artifact.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className={`w-4 h-4 ${artifact.isLiked ? 'text-oracle-gold fill-current' : ''}`} />
                        <span className="font-oracle">{artifact.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-oracle">{artifact.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredArtifacts.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-oracle-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-oracle-primary mb-2 font-oracle">未找到相关文物</h3>
            <p className="text-oracle-muted font-oracle">尝试调整搜索条件或选择其他筛选选项</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DigitalCollectionPage
