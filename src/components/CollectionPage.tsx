'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, Eye, Download, Heart, Share2, Maximize, Dna } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// NOTE: This is placeholder data. In a real application, this would be fetched from an API.
// I've used more descriptive and realistic placeholders to fit the "Digital Archaeology" theme.
interface Artifact {
  id: number
  title: string
  dynasty: string
  period: string
  excavationSite: string
  description: string
  imageUrl: string
  model3dUrl?: string
  category: '甲骨' | '金文' | '其他'
  tags: string[]
  views: number
  likes: number
}

const artifactsData: Artifact[] = [
  {
    id: 1,
    title: "武丁卜辞甲骨片",
    dynasty: "商",
    period: "武丁时期",
    excavationSite: "河南安阳殷墟",
    description: "此为商王武丁时期的一块牛胛骨，是现存商代甲骨中面积最大的一版。记事刻辞内容异常丰富，涉及祭祀、狩猎、天气、旬夕等，是研究商代社会、经济、文化和语言文字的无价之宝。",
    imageUrl: "/images/武丁卜辞甲骨片.jpg",
    model3dUrl: "/models/oracle1.glb",
    category: "甲骨",
    tags: ["国之重器", "武丁盛世", "朱书", "最大甲骨"],
    views: 15830,
    likes: 7412
  },
  {
    id: 2,
    title: "祖庚祭祀卜辞",
    dynasty: "商",
    period: "祖庚时期",
    excavationSite: "河南安阳殷墟",
    description: "刻在龟甲上的祭祀文字，记录了祖庚王时期对先祖的祭祀活动。这是研究商代祭祀制度和宗教信仰的珍贵实物，展现了商代王室对祖先崇拜的重视。",
    imageUrl: "/images/祖庚祭祀卜辞.jpg",
    category: "甲骨",
    tags: ["祭祀", "祖庚", "龟甲", "宗教"],
    views: 8200,
    likes: 3100
  },
  {
    id: 3,
    title: "花园庄东地甲骨",
    dynasty: "商",
    period: "祖庚或祖甲时期",
    excavationSite: "河南安阳花园庄东地",
    description: "1991年发现的花园庄东地甲骨窖藏，一次性出土了完整的'非王卜辞'窖藏，内容多为一位名为'子'的贵族的占卜记录，极大地丰富了对商代社会结构的认识。",
    imageUrl: "/images/花园庄东地甲骨.jpg",
    model3dUrl: "/models/oracle3.glb",
    category: "甲骨",
    tags: ["花园庄", "非王卜辞", "贵族占卜"],
    views: 9780,
    likes: 4256
  },
  {
    id: 4,
    title: "哥伦比亚大学藏甲骨",
    dynasty: "商",
    period: "晚期",
    excavationSite: "河南安阳殷墟",
    description: "现藏于美国哥伦比亚大学的珍贵甲骨文物，记录了商代晚期的重要历史信息。这些甲骨的发现和研究，为国际甲骨学研究提供了重要资料。",
    imageUrl: "/images/哥伦比亚大学藏甲骨.webp",
    category: "甲骨",
    tags: ["海外收藏", "国际研究", "商代晚期"],
    views: 25500,
    likes: 18900
  },
  {
    id: 5,
    title: "史密森尼博物馆甲骨片",
    dynasty: "商",
    period: "晚期",
    excavationSite: "河南安阳殷墟",
    description: "现藏于美国史密森尼博物馆的甲骨文物，展现了商代文字的精美书法艺术。这些海外收藏的甲骨文物，见证了中华文明的国际影响力。",
    imageUrl: "/images/史密森尼博物馆甲骨片.webp",
    category: "甲骨",
    tags: ["海外收藏", "书法艺术", "文明传播"],
    views: 12000,
    likes: 6500
  },
  {
    id: 6,
    title: "董作宾甲骨文轴",
    dynasty: "现代",
    period: "20世纪",
    excavationSite: "学者临摹作品",
    description: "著名甲骨学家董作宾先生的甲骨文书法作品，展现了现代学者对古代文字的深入理解和艺术再现。董作宾是'甲骨四堂'之一，对甲骨学的发展做出了重要贡献。",
    imageUrl: "/images/董作賓甲骨文軸.jpg",
    category: "其他",
    tags: ["董作宾", "甲骨四堂", "书法艺术", "学者作品"],
    views: 18500,
    likes: 9200
  }
];

const CollectionPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: '所有馆藏', count: artifactsData.length },
    { id: '甲骨', name: '甲骨文物', count: artifactsData.filter(a => a.category === '甲骨').length },
    { id: '金文', name: '青铜铭文', count: artifactsData.filter(a => a.category === '金文').length },
    { id: '其他', name: '其他刻辞', count: artifactsData.filter(a => a.category === '其他').length }
  ]

  const filteredArtifacts = artifactsData.filter(artifact => {
    const matchesCategory = selectedCategory === 'all' || artifact.category === selectedCategory
    const matchesSearch = artifact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artifact.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artifact.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-stone-900 text-stone-300 pt-20">
      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden oracle-pattern-dark">
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-amber-50 mb-6 tracking-wider">
              数字典藏阁
            </h1>
            <p className="text-xl text-stone-300/90 mb-12 max-w-3xl mx-auto">
              跨越时空，触碰三千年前的文明脉络。每一件文物，都是一部尘封的历史。
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Badge className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-4 py-2 text-base">
                {artifactsData.length} 件珍贵馆藏
              </Badge>
              <Badge className="bg-red-500/10 text-red-300 border border-red-500/20 px-4 py-2 text-base">
                高精度三维模型
              </Badge>
              <Badge className="bg-sky-500/10 text-sky-300 border border-sky-500/20 px-4 py-2 text-base">
                权威专家解读
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-stone-800/50 rounded-lg border border-stone-700">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500" />
            <Input
              placeholder="搜索文物名称、特征、出土地..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base bg-stone-900 border-stone-700 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-900 rounded-md border border-stone-700">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className={`h-12 w-12 ${viewMode === 'grid' ? 'text-amber-400' : 'text-stone-400'}`}
              >
                <Grid className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className={`h-12 w-12 ${viewMode === 'list' ? 'text-amber-400' : 'text-stone-400'}`}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
            <Button variant="outline" size="lg" className="h-12 border-stone-700 bg-stone-900 hover:bg-stone-800 hover:text-amber-300">
              <Filter className="w-5 h-5 mr-2" />
              高级筛选
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Category Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="bg-stone-800/50 border-stone-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-amber-100 flex items-center gap-2"><Dna size={20}/> 分类索引</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex justify-between items-center ${
                        selectedCategory === category.id
                          ? 'bg-amber-500/10 text-amber-200 shadow-inner shadow-amber-500/10'
                          : 'hover:bg-stone-700/50 text-stone-300'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <Badge variant={selectedCategory === category.id ? 'default' : 'secondary'} className="bg-stone-700 text-stone-300">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Artifacts Grid */}
          <div className="col-span-12 lg:col-span-9">
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredArtifacts.map((artifact, index) => (
                <motion.div
                  key={artifact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="bg-stone-800/60 border-stone-700 hover:border-amber-500/50 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-amber-500/10">
                    <div className="relative">
                      <img
                        src={artifact.imageUrl}
                        alt={artifact.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        {artifact.model3dUrl && (
                          <Badge className="bg-red-900/80 text-red-200 border border-red-600/50">3D</Badge>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                         <h3 className="font-serif text-2xl font-semibold text-amber-50 mb-2 line-clamp-2">
                          {artifact.title}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-center text-sm text-stone-400 mb-3">
                        <span>{artifact.dynasty} · {artifact.period}</span>
                        <span>{artifact.excavationSite}</span>
                      </div>
                      <p className="text-stone-300 line-clamp-3 mb-4 h-20">
                        {artifact.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {artifact.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-stone-600 text-stone-400">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-stone-400 border-t border-stone-700 pt-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {artifact.views}</span>
                          <span className="flex items-center gap-1.5"><Heart className="w-4 h-4" /> {artifact.likes}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="text-stone-400 hover:text-amber-300"><Heart className="w-5 h-5" /></Button>
                          <Button variant="ghost" size="icon" className="text-stone-400 hover:text-amber-300"><Share2 className="w-5 h-5" /></Button>
                          <Button variant="ghost" size="icon" className="text-stone-400 hover:text-amber-300"><Download className="w-5 h-5" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionPage