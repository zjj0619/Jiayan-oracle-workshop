import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  BookOpen, 
  Trophy, 
  Star,
  Clock,
  Eye,
  ThumbsUp,
  MessageSquare,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Award,
  Calendar,
  User,
  Edit,
  Send,
  Image,
  Video,
  FileText,
  Hash,
  ChevronRight,
  Flame,
  Crown,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    level: number
    badge: string
  }
  title: string
  content: string
  type: 'discussion' | 'question' | 'sharing' | 'achievement'
  category: string
  tags: string[]
  likes: number
  comments: number
  views: number
  isLiked: boolean
  createdAt: Date
  images?: string[]
}

interface User {
  id: string
  name: string
  avatar: string
  level: number
  points: number
  badge: string
  joinDate: Date
  posts: number
  followers: number
  following: number
}

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('latest')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'discussion' as const,
    category: 'general',
    tags: [] as string[]
  })

  // 模拟数据
  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: '甲骨文爱好者',
        avatar: '/api/placeholder/40/40',
        level: 8,
        badge: '资深学者'
      },
      title: '分享一个有趣的甲骨文字形演变发现',
      content: '今天在研究"日"字的演变过程中，发现了一个很有趣的现象。甲骨文中的"日"字中间确实有一个点，这个点代表的是太阳黑子！古人的观察力真的很敏锐...',
      type: 'sharing',
      category: '字形研究',
      tags: ['甲骨文', '字形演变', '日字'],
      likes: 156,
      comments: 23,
      views: 892,
      isLiked: false,
      createdAt: new Date('2024-01-15T10:30:00'),
      images: ['/jiaguwen.jpg']
    },
    {
      id: '2',
      author: {
        name: '古文字研究员',
        avatar: '/api/placeholder/40/40',
        level: 12,
        badge: '专家导师'
      },
      title: '求助：这个甲骨文字符是什么意思？',
      content: '在安阳博物馆看到这个字符，查了很多资料都没找到确切的解释。有没有专家能帮忙解读一下？',
      type: 'question',
      category: '求助解答',
      tags: ['求助', '字符识别'],
      likes: 89,
      comments: 45,
      views: 567,
      isLiked: true,
      createdAt: new Date('2024-01-14T15:20:00')
    },
    {
      id: '3',
      author: {
        name: '文化传承者',
        avatar: '/api/placeholder/40/40',
        level: 6,
        badge: '活跃用户'
      },
      title: '甲骨文书法作品展示',
      content: '最近练习甲骨文书法，写了几个字，请大家指正！希望能够更好地传承这门古老的艺术。',
      type: 'sharing',
      category: '书法艺术',
      tags: ['书法', '作品展示', '传承'],
      likes: 234,
      comments: 67,
      views: 1234,
      isLiked: false,
      createdAt: new Date('2024-01-13T09:15:00'),
      images: ['/kaishu.jpg']
    },
    {
      id: '4',
      author: {
        name: '历史探索者',
        avatar: '/api/placeholder/40/40',
        level: 9,
        badge: '知识达人'
      },
      title: '商朝占卜文化深度解析',
      content: '通过对甲骨文的研究，我们可以深入了解商朝的占卜文化。占卜不仅是宗教活动，更是当时政治决策的重要依据...',
      type: 'discussion',
      category: '历史文化',
      tags: ['商朝', '占卜文化', '历史研究'],
      likes: 178,
      comments: 34,
      views: 756,
      isLiked: true,
      createdAt: new Date('2024-01-12T14:45:00')
    }
  ]

  const topUsers: User[] = [
    {
      id: '1',
      name: '甲骨文大师',
      avatar: '/api/placeholder/60/60',
      level: 15,
      points: 12580,
      badge: '传奇学者',
      joinDate: new Date('2023-03-15'),
      posts: 156,
      followers: 2341,
      following: 89
    },
    {
      id: '2',
      name: '古文字专家',
      avatar: '/api/placeholder/60/60',
      level: 13,
      points: 9876,
      badge: '专家导师',
      joinDate: new Date('2023-05-20'),
      posts: 134,
      followers: 1876,
      following: 67
    },
    {
      id: '3',
      name: '文化传承人',
      avatar: '/api/placeholder/60/60',
      level: 11,
      points: 7654,
      badge: '知识达人',
      joinDate: new Date('2023-07-10'),
      posts: 98,
      followers: 1234,
      following: 123
    }
  ]

  const categories = [
    { value: 'all', label: '全部', count: posts.length },
    { value: '字形研究', label: '字形研究', count: 1 },
    { value: '求助解答', label: '求助解答', count: 1 },
    { value: '书法艺术', label: '书法艺术', count: 1 },
    { value: '历史文化', label: '历史文化', count: 1 }
  ]

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'discussion': return <MessageCircle className="w-4 h-4" />
      case 'question': return <BookOpen className="w-4 h-4" />
      case 'sharing': return <Share2 className="w-4 h-4" />
      case 'achievement': return <Trophy className="w-4 h-4" />
      default: return <MessageCircle className="w-4 h-4" />
    }
  }

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'discussion': return '讨论'
      case 'question': return '提问'
      case 'sharing': return '分享'
      case 'achievement': return '成就'
      default: return '讨论'
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'discussion': return 'bg-blue-100 text-blue-800'
      case 'question': return 'bg-green-100 text-green-800'
      case 'sharing': return 'bg-purple-100 text-purple-800'
      case 'achievement': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: number) => {
    if (level >= 15) return 'text-purple-600'
    if (level >= 10) return 'text-blue-600'
    if (level >= 5) return 'text-green-600'
    return 'text-gray-600'
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.includes(searchQuery) || 
                         post.content.includes(searchQuery) ||
                         post.tags.some(tag => tag.includes(searchQuery))
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLike = (postId: string) => {
    console.log('Like post:', postId)
  }

  const handleCreatePost = () => {
    console.log('Create post:', newPost)
    setShowCreatePost(false)
    setNewPost({
      title: '',
      content: '',
      type: 'discussion',
      category: 'general',
      tags: []
    })
  }

  return (
    <div className="min-h-screen bg-oracle-light oracle-pattern">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-oracle-primary via-oracle-brown to-oracle-stone text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-modern relative z-10 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="bg-oracle-gold/20 text-oracle-gold border-oracle-gold/30 mb-6 font-oracle">
              <Users className="w-4 h-4" />
              学习社区
            </Badge>
            
            <h1 className="text-responsive-xl font-bold leading-tight mb-6 font-oracle">
              与同好者一起探索甲骨文
              <span className="block text-oracle-gold">分享知识，共同成长</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto font-oracle">
              加入我们的学习社区，与全国各地的甲骨文爱好者交流心得，
              分享发现，共同传承中华文明的瑰宝。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-oracle-gold text-oracle-primary hover:bg-oracle-gold/90 font-oracle shadow-lg"
                onClick={() => setShowCreatePost(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                发布内容
              </Button>
              <Button size="lg" variant="outline" className="border-oracle-gold/30 text-oracle-gold hover:bg-oracle-gold/10 font-oracle">
                <Users className="w-5 h-5 mr-2" />
                加入社区
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-modern py-20">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* 左侧边栏 */}
          <div className="lg:col-span-1">
            {/* 搜索和筛选 */}
            <Card className="bg-oracle-surface/90 backdrop-blur-sm border-oracle-border/20 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-oracle-primary font-oracle">
                  <Search className="w-5 h-5 text-oracle-brown" />
                  搜索筛选
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="搜索内容..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-oracle-light border-oracle-border/30 text-oracle-primary placeholder:text-oracle-muted focus:border-oracle-brown focus:ring-oracle-brown/20 pl-10 font-oracle"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-oracle-muted" />
                </div>
                
                <div>
                  <h4 className="font-medium text-oracle-primary mb-3 font-oracle">分类</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-oracle ${
                          selectedCategory === category.value
                            ? 'bg-oracle-brown text-white shadow-md'
                            : 'bg-oracle-light hover:bg-oracle-stone/20 text-oracle-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{category.label}</span>
                          <Badge variant="secondary" className="text-xs bg-oracle-gold/20 text-oracle-brown border-oracle-gold/30">
                            {category.count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 社区排行榜 */}
            <Card className="bg-oracle-surface/90 backdrop-blur-sm border-oracle-border/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-oracle-primary font-oracle">
                  <Trophy className="w-5 h-5 text-oracle-gold" />
                  社区达人
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topUsers.map((user, index) => (
                    <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-oracle-light/50 transition-colors">
                      <div className="relative">
                        <Avatar className="w-10 h-10 border-2 border-oracle-border/20">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-oracle-stone text-oracle-primary font-oracle">{user.name[0]}</AvatarFallback>
                        </Avatar>
                        {index < 3 && (
                          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                            index === 0 ? 'bg-oracle-gold text-oracle-primary' :
                            index === 1 ? 'bg-oracle-stone text-white' :
                            'bg-oracle-brown text-white'
                          }`}>
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-oracle-primary text-sm truncate font-oracle">{user.name}</h4>
                          <Badge variant="outline" className="text-xs border-oracle-gold/30 text-oracle-brown bg-oracle-gold/10">
                            Lv.{user.level}
                          </Badge>
                        </div>
                        <p className="text-xs text-oracle-muted font-oracle">{user.points} 积分</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 主内容区域 */}
          <div className="lg:col-span-3">
            {/* 标签页 */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-4 bg-oracle-surface/90 border-oracle-border/20">
                <TabsTrigger value="latest" className="flex items-center gap-2 data-[state=active]:bg-oracle-brown data-[state=active]:text-white text-oracle-primary font-oracle">
                  <Clock className="w-4 h-4" />
                  最新
                </TabsTrigger>
                <TabsTrigger value="hot" className="flex items-center gap-2 data-[state=active]:bg-oracle-brown data-[state=active]:text-white text-oracle-primary font-oracle">
                  <Flame className="w-4 h-4" />
                  热门
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center gap-2 data-[state=active]:bg-oracle-brown data-[state=active]:text-white text-oracle-primary font-oracle">
                  <TrendingUp className="w-4 h-4" />
                  趋势
                </TabsTrigger>
                <TabsTrigger value="featured" className="flex items-center gap-2 data-[state=active]:bg-oracle-brown data-[state=active]:text-white text-oracle-primary font-oracle">
                  <Star className="w-4 h-4" />
                  精选
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-6">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-oracle-surface/90 backdrop-blur-sm border-oracle-border/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        <CardContent className="p-6">
                          {/* 帖子头部 */}
                          <div className="flex items-start gap-4 mb-4">
                            <Avatar className="w-12 h-12 border-2 border-oracle-border/20">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback className="bg-oracle-stone text-oracle-primary font-oracle">{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-oracle-primary font-oracle">{post.author.name}</h4>
                                <Badge variant="outline" className={`text-xs border-oracle-gold/30 bg-oracle-gold/10 ${getLevelColor(post.author.level)}`}>
                                  Lv.{post.author.level}
                                </Badge>
                                <Badge variant="secondary" className="text-xs bg-oracle-brown/10 text-oracle-brown border-oracle-brown/20">
                                  {post.author.badge}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-oracle-muted font-oracle">
                                <span>{post.createdAt.toLocaleDateString()}</span>
                                <Badge className={`text-xs ${getPostTypeColor(post.type)}`}>
                                  {getPostTypeIcon(post.type)}
                                  <span className="ml-1">{getPostTypeLabel(post.type)}</span>
                                </Badge>
                                <span className="text-oracle-brown">{post.category}</span>
                              </div>
                            </div>
                          </div>

                          {/* 帖子内容 */}
                          <div className="mb-4">
                            <h3 className="text-lg font-bold text-oracle-primary mb-2 hover:text-oracle-brown cursor-pointer transition-colors font-oracle">
                              {post.title}
                            </h3>
                            <p className="text-oracle-muted leading-relaxed line-clamp-3 font-oracle">
                              {post.content}
                            </p>
                          </div>

                          {/* 图片展示 */}
                          {post.images && post.images.length > 0 && (
                            <div className="mb-4">
                              <div className="grid grid-cols-2 gap-2">
                                {post.images.slice(0, 4).map((image, idx) => (
                                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
                                    <img 
                                      src={image} 
                                      alt={`Post image ${idx + 1}`}
                                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 标签 */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-oracle-gold/30 text-oracle-brown bg-oracle-gold/10 hover:bg-oracle-gold/20 transition-colors">
                                <Hash className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* 互动区域 */}
                          <div className="flex items-center justify-between pt-4 border-t border-oracle-border/20">
                            <div className="flex items-center gap-6">
                              <button
                                onClick={() => handleLike(post.id)}
                                className={`flex items-center gap-2 text-sm transition-colors font-oracle ${
                                  post.isLiked ? 'text-oracle-gold' : 'text-oracle-muted hover:text-oracle-gold'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                                <span>{post.likes}</span>
                              </button>
                              
                              <button className="flex items-center gap-2 text-sm text-oracle-muted hover:text-oracle-brown transition-colors font-oracle">
                                <MessageSquare className="w-4 h-4" />
                                <span>{post.comments}</span>
                              </button>
                              
                              <div className="flex items-center gap-2 text-sm text-oracle-muted font-oracle">
                                <Eye className="w-4 h-4" />
                                <span>{post.views}</span>
                              </div>
                            </div>
                            
                            <Button variant="ghost" size="sm" className="text-oracle-muted hover:text-oracle-brown hover:bg-oracle-stone/10 font-oracle">
                              <Share2 className="w-4 h-4 mr-2" />
                              分享
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* 空状态 */}
                {filteredPosts.length === 0 && (
                  <div className="text-center py-16">
                    <MessageCircle className="w-16 h-16 text-oracle-muted mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-oracle-primary mb-2 font-oracle">暂无相关内容</h3>
                    <p className="text-oracle-muted font-oracle">尝试调整搜索条件或选择其他分类</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* 发布内容弹窗 */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-oracle-surface rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-oracle-border/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-oracle-border/20">
                <h2 className="text-xl font-bold text-oracle-primary font-oracle">发布新内容</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreatePost(false)}
                  className="p-2 text-oracle-muted hover:text-oracle-primary hover:bg-oracle-stone/10"
                >
                  ×
                </Button>
              </div>

              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto bg-oracle-light">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-oracle-primary mb-2 font-oracle">标题</label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="请输入标题..."
                      className="bg-oracle-surface border-oracle-border/30 text-oracle-primary placeholder:text-oracle-muted focus:border-oracle-brown focus:ring-oracle-brown/20 font-oracle"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oracle-primary mb-2 font-oracle">类型</label>
                      <select
                        value={newPost.type}
                        onChange={(e) => setNewPost(prev => ({ ...prev, type: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-oracle-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-oracle-brown/20 bg-oracle-surface text-oracle-primary font-oracle"
                      >
                        <option value="discussion">讨论</option>
                        <option value="question">提问</option>
                        <option value="sharing">分享</option>
                        <option value="achievement">成就</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-oracle-primary mb-2 font-oracle">分类</label>
                      <select
                        value={newPost.category}
                        onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-oracle-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-oracle-brown/20 bg-oracle-surface text-oracle-primary font-oracle"
                      >
                        <option value="general">综合讨论</option>
                        <option value="字形研究">字形研究</option>
                        <option value="书法艺术">书法艺术</option>
                        <option value="历史文化">历史文化</option>
                        <option value="求助解答">求助解答</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-oracle-primary mb-2 font-oracle">内容</label>
                    <Textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="请输入内容..."
                      className="bg-oracle-surface border-oracle-border/30 text-oracle-primary placeholder:text-oracle-muted focus:border-oracle-brown focus:ring-oracle-brown/20 min-h-[120px] resize-none font-oracle"
                      rows={6}
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-light-gray">
                    <Button variant="outline" className="btn-secondary">
                      <Image className="w-4 h-4 mr-2" />
                      添加图片
                    </Button>
                    <Button variant="outline" className="btn-secondary">
                      <Video className="w-4 h-4 mr-2" />
                      添加视频
                    </Button>
                    <Button variant="outline" className="btn-secondary">
                      <FileText className="w-4 h-4 mr-2" />
                      添加文档
                    </Button>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowCreatePost(false)}
                      className="btn-secondary"
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleCreatePost}
                      disabled={!newPost.title.trim() || !newPost.content.trim()}
                      className="btn-oracle"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      发布
                    </Button>
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

export default CommunityPage