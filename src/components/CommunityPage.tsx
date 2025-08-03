'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Users, Trophy, Star, Pin, Heart, Reply, MoreHorizontal, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Post {
  id: number
  title: string
  content: string
  author: {
    name: string
    avatar: string
    level: string
    badges: string[]
  }
  category: string
  tags: string[]
  replies: number
  likes: number
  views: number
  createdAt: string
  isPinned?: boolean
  isExpertQuestion?: boolean
}

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')
  const [postLikes, setPostLikes] = useState<{[key: number]: number}>({})
  const [postReplies, setPostReplies] = useState<{[key: number]: number}>({})

  // 初始化点赞和回复数据
  React.useEffect(() => {
    const initialLikes: {[key: number]: number} = {}
    const initialReplies: {[key: number]: number} = {}
    posts.forEach(post => {
      initialLikes[post.id] = post.likes
      initialReplies[post.id] = post.replies
    })
    setPostLikes(initialLikes)
    setPostReplies(initialReplies)
  }, [])

  // 处理点赞功能
  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(postId)) {
        newLiked.delete(postId)
        setPostLikes(prevLikes => ({
          ...prevLikes,
          [postId]: prevLikes[postId] - 1
        }))
      } else {
        newLiked.add(postId)
        setPostLikes(prevLikes => ({
          ...prevLikes,
          [postId]: prevLikes[postId] + 1
        }))
      }
      return newLiked
    })
  }

  // 处理回复功能
  const handleReply = (postId: number) => {
    setReplyingTo(postId)
  }

  // 提交回复
  const submitReply = (postId: number) => {
    if (replyText.trim()) {
      setPostReplies(prev => ({
        ...prev,
        [postId]: prev[postId] + 1
      }))
      setReplyText('')
      setReplyingTo(null)
      // 这里可以添加实际的API调用来保存回复
    }
  }

  // 处理转发功能
  const handleShare = (postId: number) => {
    // 实现转发功能
    navigator.clipboard.writeText(`${window.location.origin}/community/post/${postId}`)
    alert('链接已复制到剪贴板！')
  }

  const posts: Post[] = [
    {
      id: 1,
      title: "关于殷墟H11083甲骨片的新发现",
      content: "最近在研究这片甲骨时发现了一些有趣的细节，想和大家讨论一下...",
      author: {
        name: "甲骨学者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["考古专家", "甲骨研究"]
      },
      category: "学术讨论",
      tags: ["殷墟", "考古发现", "甲骨片"],
      replies: 23,
      likes: 45,
      views: 156,
      createdAt: "2小时前",
      isPinned: true,
      isExpertQuestion: true
    },
    {
      id: 2,
      title: "初学者求助：如何辨认甲骨文中的'日'字？",
      content: "刚开始学习甲骨文，对于'日'字的各种写法感到困惑，希望老师们指点...",
      author: {
        name: "文字探索者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "新手",
        badges: ["新人"]
      },
      category: "学习交流",
      tags: ["初学者", "字形识别", "日字"],
      replies: 12,
      likes: 28,
      views: 89,
      createdAt: "4小时前"
    },
    {
      id: 3,
      title: "商代青铜器铭文与甲骨文的对比研究",
      content: "通过对比分析商代青铜器铭文和甲骨文，发现了一些有趣的文字演变规律...",
      author: {
        name: "青铜器专家",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["青铜器研究", "文字学"]
      },
      category: "学术讨论",
      tags: ["青铜器", "铭文", "文字演变"],
      replies: 18,
      likes: 67,
      views: 234,
      createdAt: "6小时前",
      isExpertQuestion: true
    },
    {
      id: 4,
      title: "甲骨文中的天文记录解读",
      content: "甲骨文中记录了大量的天文现象，包括日食、月食等，这些记录对研究商代天文学具有重要意义...",
      author: {
        name: "天文史学者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["天文史", "甲骨研究"]
      },
      category: "学术讨论",
      tags: ["天文", "日食", "月食", "商代"],
      replies: 31,
      likes: 89,
      views: 445,
      createdAt: "8小时前"
    },
    {
      id: 5,
      title: "甲骨文书法创作心得分享",
      content: "最近在练习甲骨文书法，想和大家分享一些创作心得和技巧...",
      author: {
        name: "书法爱好者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "中级",
        badges: ["书法", "艺术创作"]
      },
      category: "艺术创作",
      tags: ["书法", "创作", "技巧"],
      replies: 15,
      likes: 42,
      views: 178,
      createdAt: "10小时前"
    },
    {
      id: 6,
      title: "商代祭祀文化在甲骨文中的体现",
      content: "通过分析甲骨文中的祭祀记录，可以深入了解商代的宗教文化和社会结构...",
      author: {
        name: "宗教史研究员",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["宗教史", "社会学"]
      },
      category: "文化研究",
      tags: ["祭祀", "宗教", "社会结构"],
      replies: 27,
      likes: 73,
      views: 312,
      createdAt: "12小时前"
    },
    {
      id: 7,
      title: "甲骨文数字化保护项目进展",
      content: "分享我们团队在甲骨文数字化保护方面的最新进展和技术应用...",
      author: {
        name: "数字保护专家",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["数字保护", "技术应用"]
      },
      category: "技术应用",
      tags: ["数字化", "保护", "技术"],
      replies: 22,
      likes: 56,
      views: 267,
      createdAt: "14小时前"
    },
    {
      id: 8,
      title: "甲骨文中的动物字形研究",
      content: "甲骨文中有很多动物字形，这些字形反映了商代人对动物的认知和文化意义...",
      author: {
        name: "动物考古学家",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["动物考古", "字形研究"]
      },
      category: "学术讨论",
      tags: ["动物", "字形", "文化意义"],
      replies: 19,
      likes: 38,
      views: 156,
      createdAt: "16小时前"
    },
    {
      id: 9,
      title: "甲骨文AI识别技术的最新突破",
      content: "介绍最新的AI技术在甲骨文识别方面的应用和突破性进展...",
      author: {
        name: "AI研究员",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["AI技术", "机器学习"]
      },
      category: "技术应用",
      tags: ["AI", "识别技术", "机器学习"],
      replies: 34,
      likes: 92,
      views: 523,
      createdAt: "18小时前"
    },
    {
      id: 10,
      title: "商代王室家谱在甲骨文中的记录",
      content: "通过甲骨文记录，我们可以重构商代王室的家谱关系...",
      author: {
        name: "历史学家",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["历史学", "家谱研究"]
      },
      category: "历史研究",
      tags: ["王室", "家谱", "商代历史"],
      replies: 25,
      likes: 61,
      views: 289,
      createdAt: "20小时前"
    },
    {
      id: 11,
      title: "甲骨文中的地理信息解读",
      content: "甲骨文记录了许多地名和地理信息，这些对研究商代地理具有重要价值...",
      author: {
        name: "历史地理学者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["历史地理", "地名研究"]
      },
      category: "历史研究",
      tags: ["地理", "地名", "商代"],
      replies: 16,
      likes: 44,
      views: 198,
      createdAt: "22小时前"
    },
    {
      id: 12,
      title: "甲骨文教学方法探讨",
      content: "作为一名甲骨文教师，想和大家分享一些有效的教学方法和经验...",
      author: {
        name: "甲骨文教师",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["教育", "教学法"]
      },
      category: "教育教学",
      tags: ["教学", "方法", "经验分享"],
      replies: 28,
      likes: 75,
      views: 356,
      createdAt: "1天前"
    },
    {
      id: 13,
      title: "甲骨文与现代汉字的对应关系",
      content: "整理了一份甲骨文与现代汉字的对应表，希望对初学者有帮助...",
      author: {
        name: "文字学研究生",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "中级",
        badges: ["文字学", "研究生"]
      },
      category: "学习交流",
      tags: ["对应关系", "现代汉字", "学习资料"],
      replies: 41,
      likes: 128,
      views: 678,
      createdAt: "1天前"
    },
    {
      id: 14,
      title: "商代农业生产在甲骨文中的反映",
      content: "通过甲骨文记录，可以了解商代的农业生产情况和农作物种类...",
      author: {
        name: "农业史专家",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["农业史", "经济史"]
      },
      category: "历史研究",
      tags: ["农业", "生产", "经济史"],
      replies: 20,
      likes: 53,
      views: 234,
      createdAt: "1天前"
    },
    {
      id: 15,
      title: "甲骨文拓片制作技艺传承",
      content: "分享传统甲骨文拓片制作的技艺和现代改进方法...",
      author: {
        name: "拓片师傅",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["传统工艺", "拓片技艺"]
      },
      category: "传统工艺",
      tags: ["拓片", "传统工艺", "技艺传承"],
      replies: 17,
      likes: 39,
      views: 167,
      createdAt: "1天前"
    },
    {
      id: 16,
      title: "甲骨文中的音乐文化记录",
      content: "甲骨文中记录了商代的音乐活动和乐器，反映了当时的音乐文化...",
      author: {
        name: "音乐史学者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["音乐史", "文化研究"]
      },
      category: "文化研究",
      tags: ["音乐", "乐器", "文化"],
      replies: 14,
      likes: 32,
      views: 145,
      createdAt: "2天前"
    },
    {
      id: 17,
      title: "甲骨文字体设计与现代应用",
      content: "探讨如何将甲骨文元素融入现代字体设计中...",
      author: {
        name: "字体设计师",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "中级",
        badges: ["设计", "字体"]
      },
      category: "艺术创作",
      tags: ["字体设计", "现代应用", "创意"],
      replies: 23,
      likes: 68,
      views: 298,
      createdAt: "2天前"
    },
    {
      id: 18,
      title: "甲骨文博物馆参观心得",
      content: "最近参观了几个甲骨文博物馆，想和大家分享一些心得体会...",
      author: {
        name: "文化爱好者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "新手",
        badges: ["文化爱好者"]
      },
      category: "文化交流",
      tags: ["博物馆", "参观", "心得"],
      replies: 12,
      likes: 26,
      views: 134,
      createdAt: "2天前"
    },
    {
      id: 19,
      title: "甲骨文中的医学知识记录",
      content: "甲骨文中记录了一些医学相关的内容，反映了商代的医学水平...",
      author: {
        name: "医学史研究员",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["医学史", "古代医学"]
      },
      category: "学术讨论",
      tags: ["医学", "古代医学", "健康"],
      replies: 18,
      likes: 45,
      views: 189,
      createdAt: "2天前"
    },
    {
      id: 20,
      title: "甲骨文研究的国际合作项目",
      content: "介绍目前正在进行的甲骨文研究国际合作项目和成果...",
      author: {
        name: "国际合作专员",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["国际合作", "项目管理"]
      },
      category: "学术讨论",
      tags: ["国际合作", "研究项目", "学术交流"],
      replies: 21,
      likes: 57,
      views: 267,
      createdAt: "2天前"
    },
    {
      id: 21,
      title: "甲骨文中的数字系统研究",
      content: "商代的数字系统在甲骨文中有完整的体现，值得深入研究...",
      author: {
        name: "数学史学者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["数学史", "数字系统"]
      },
      category: "学术讨论",
      tags: ["数字", "数学", "计数系统"],
      replies: 15,
      likes: 41,
      views: 178,
      createdAt: "3天前"
    },
    {
      id: 22,
      title: "甲骨文纹饰图案的艺术价值",
      content: "除了文字本身，甲骨上的纹饰图案也具有很高的艺术价值...",
      author: {
        name: "艺术史学者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["艺术史", "图案研究"]
      },
      category: "艺术创作",
      tags: ["纹饰", "图案", "艺术价值"],
      replies: 19,
      likes: 48,
      views: 203,
      createdAt: "3天前"
    },
    {
      id: 23,
      title: "甲骨文学习APP开发经验分享",
      content: "作为开发者，想分享一下开发甲骨文学习APP的经验和技术难点...",
      author: {
        name: "APP开发者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "中级",
        badges: ["开发", "移动应用"]
      },
      category: "技术应用",
      tags: ["APP开发", "移动应用", "技术"],
      replies: 26,
      likes: 72,
      views: 334,
      createdAt: "3天前"
    },
    {
      id: 24,
      title: "甲骨文中的服饰文化记录",
      content: "通过甲骨文记录，可以了解商代的服饰文化和社会等级...",
      author: {
        name: "服饰史研究员",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["服饰史", "社会学"]
      },
      category: "文化研究",
      tags: ["服饰", "文化", "社会等级"],
      replies: 13,
      likes: 35,
      views: 156,
      createdAt: "3天前"
    },
    {
      id: 25,
      title: "甲骨文与西方古文字的比较研究",
      content: "将甲骨文与古埃及象形文字、楔形文字等进行比较分析...",
      author: {
        name: "比较文字学家",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["比较文字学", "国际研究"]
      },
      category: "学术讨论",
      tags: ["比较研究", "西方古文字", "象形文字"],
      replies: 29,
      likes: 84,
      views: 412,
      createdAt: "3天前"
    },
    {
      id: 26,
      title: "甲骨文临摹练习方法指导",
      content: "为初学者提供甲骨文临摹练习的方法和技巧指导...",
      author: {
        name: "书法指导老师",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["书法教学", "指导"]
      },
      category: "学习交流",
      tags: ["临摹", "练习", "指导"],
      replies: 37,
      likes: 95,
      views: 456,
      createdAt: "4天前"
    },
    {
      id: 27,
      title: "甲骨文中的建筑信息解读",
      content: "甲骨文记录了商代的建筑信息，包括宫殿、祭坛等建筑形式...",
      author: {
        name: "建筑史学者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["建筑史", "古代建筑"]
      },
      category: "历史研究",
      tags: ["建筑", "宫殿", "祭坛"],
      replies: 22,
      likes: 58,
      views: 278,
      createdAt: "4天前"
    },
    {
      id: 28,
      title: "甲骨文研究的新兴技术应用",
      content: "介绍3D扫描、虚拟现实等新技术在甲骨文研究中的应用...",
      author: {
        name: "技术应用专家",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["新技术", "3D扫描"]
      },
      category: "技术应用",
      tags: ["新技术", "3D扫描", "虚拟现实"],
      replies: 24,
      likes: 66,
      views: 312,
      createdAt: "4天前"
    },
    {
      id: 29,
      title: "甲骨文中的气象记录研究",
      content: "甲骨文中记录了大量的气象信息，对研究古代气候变化有重要意义...",
      author: {
        name: "气象史学者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["气象史", "气候研究"]
      },
      category: "学术讨论",
      tags: ["气象", "气候", "环境史"],
      replies: 16,
      likes: 43,
      views: 187,
      createdAt: "4天前"
    },
    {
      id: 30,
      title: "甲骨文文创产品设计理念",
      content: "分享甲骨文文创产品的设计理念和市场应用前景...",
      author: {
        name: "文创设计师",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "中级",
        badges: ["文创设计", "产品设计"]
      },
      category: "艺术创作",
      tags: ["文创", "产品设计", "市场应用"],
      replies: 31,
      likes: 78,
      views: 367,
      createdAt: "5天前"
    },
    {
      id: 31,
      title: "甲骨文研究的跨学科合作",
      content: "探讨甲骨文研究如何与计算机科学、考古学、历史学等学科深度合作...",
      author: {
        name: "跨学科研究员",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["跨学科", "合作研究"]
      },
      category: "学术讨论",
      tags: ["跨学科", "合作", "综合研究"],
      replies: 27,
      likes: 71,
      views: 298,
      createdAt: "5天前"
    },
    {
      id: 32,
      title: "甲骨文中的商业贸易记录",
      content: "通过甲骨文可以了解商代的商业贸易活动和经济状况...",
      author: {
        name: "经济史学者",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "专家",
        badges: ["经济史", "商业史"]
      },
      category: "历史研究",
      tags: ["商业", "贸易", "经济"],
      replies: 20,
      likes: 52,
      views: 245,
      createdAt: "5天前"
    }
  ]

  const categories = [
    { id: 'all', name: '全部', count: posts.length, icon: MessageCircle },
    { id: '学术讨论', name: '学术讨论', count: 1, icon: Star },
    { id: '学习交流', name: '学习交流', count: 1, icon: Users }
  ]

  const experts = [
    {
      name: "王教授",
      title: "古文字学专家",
      avatar: "/placeholder.svg?height=50&width=50",
      speciality: "甲骨文字形研究",
      answers: 156,
      likes: 2340
    },
    {
      name: "李研究员",
      title: "考古学家",
      avatar: "/placeholder.svg?height=50&width=50",
      speciality: "殷墟考古发掘",
      answers: 89,
      likes: 1567
    }
  ]

  const achievements = [
    { name: "初窥门径", description: "首次发帖", icon: "🥉", rarity: "bronze" },
    { name: "识骨能手", description: "正确识别100个甲骨文字", icon: "🥈", rarity: "silver" },
    { name: "考古新星", description: "获得专家认可", icon: "🥇", rarity: "gold" },
    { name: "学术贡献", description: "发表高质量学术帖", icon: "🏆", rarity: "legendary" }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-bone-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 oracle-pattern">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-oracle-brown mb-6">
              甲骨文论坛
            </h1>
            <p className="text-xl text-ink-black/80 mb-8">
              学者交流，专家问答，成就系统
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-oracle-brown text-bone-white px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                1,234 位学者
              </Badge>
              <Badge variant="outline" className="border-bronze-blue text-bronze-blue px-4 py-2">
                <MessageCircle className="w-4 h-4 mr-2" />
                5,678 个话题
              </Badge>
              <Badge variant="outline" className="border-cinnabar-red text-cinnabar-red px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                专家在线
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            {/* Categories */}
            <Card className="glass-effect oracle-shadow">
              <CardHeader>
                <CardTitle className="text-oracle-brown">讨论板块</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategory === category.id
                          ? 'bg-oracle-brown text-bone-white'
                          : 'hover:bg-oracle-brown/10 text-ink-black'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4" />
                        <span>{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expert Panel */}
            <Card className="glass-effect oracle-shadow">
              <CardHeader>
                <CardTitle className="text-oracle-brown">专家团队</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experts.map((expert, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-oracle-brown/5 transition-colors">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={expert.avatar} />
                        <AvatarFallback>{expert.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-ink-black text-sm">{expert.name}</p>
                        <p className="text-xs text-bronze-blue">{expert.title}</p>
                        <p className="text-xs text-ink-black/60 truncate">{expert.speciality}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-ink-black/60">{expert.answers} 回答</p>
                        <p className="text-xs text-cinnabar-red">{expert.likes} 赞</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-6">
            {/* Post Button */}
            <div className="mb-6">
              <Button className="w-full bg-oracle-brown hover:bg-cinnabar-red text-bone-white">
                <Plus className="w-4 h-4 mr-2" />
                发布新话题
              </Button>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect oracle-shadow hover:shadow-lg transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              {post.isPinned && (
                                <Pin className="w-4 h-4 text-cinnabar-red" />
                              )}
                              <h3 className="font-semibold text-oracle-brown hover:text-cinnabar-red transition-colors">
                                {post.title}
                              </h3>
                              {post.isExpertQuestion && (
                                <Badge className="bg-bronze-blue text-bone-white text-xs">
                                  专家问答
                                </Badge>
                              )}
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <p className="text-sm text-ink-black/70 mb-3 line-clamp-2">
                            {post.content}
                          </p>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                            {post.tags.slice(0, 2).map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-ink-black/60">
                              <div className="flex items-center gap-1">
                                <span className="font-medium text-oracle-brown">{post.author.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {post.author.level}
                                </Badge>
                              </div>
                              <span>{post.createdAt}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-ink-black/60">
                                <button
                                  onClick={() => handleLike(post.id)}
                                  className={`flex items-center gap-1 hover:text-cinnabar-red transition-colors ${
                                    likedPosts.has(post.id) ? 'text-cinnabar-red' : ''
                                  }`}
                                >
                                  <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                  {postLikes[post.id] || post.likes}
                                </button>
                                <button
                                  onClick={() => handleReply(post.id)}
                                  className="flex items-center gap-1 hover:text-bronze-blue transition-colors"
                                >
                                  <Reply className="w-4 h-4" />
                                  {postReplies[post.id] || post.replies}
                                </button>
                                <button
                                  onClick={() => handleShare(post.id)}
                                  className="flex items-center gap-1 hover:text-oracle-brown transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                  </svg>
                                  转发
                                </button>
                              </div>
                              <span className="text-sm text-ink-black/60">{post.views} 浏览</span>
                            </div>
                            
                            {/* 回复输入框 */}
                            {replyingTo === post.id && (
                              <div className="mt-4 p-3 bg-oracle-brown/5 rounded-lg">
                                <div className="flex gap-3">
                                  <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="写下你的回复..."
                                    className="flex-1 p-2 border border-oracle-brown/20 rounded-lg resize-none focus:outline-none focus:border-oracle-brown"
                                    rows={3}
                                  />
                                </div>
                                <div className="flex justify-end gap-2 mt-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setReplyingTo(null)}
                                  >
                                    取消
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => submitReply(post.id)}
                                    className="bg-oracle-brown hover:bg-cinnabar-red text-bone-white"
                                  >
                                    回复
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            {/* Achievement System */}
            <Card className="glass-effect oracle-shadow">
              <CardHeader>
                <CardTitle className="text-oracle-brown">成就徽章</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center cursor-pointer transition-all hover:scale-105 ${
                        achievement.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border border-yellow-300' :
                        achievement.rarity === 'gold' ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200' :
                        achievement.rarity === 'silver' ? 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200' :
                        'bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200'
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <p className="text-xs font-medium text-ink-black">{achievement.name}</p>
                      <p className="text-xs text-ink-black/60">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hot Topics */}
            <Card className="glass-effect oracle-shadow">
              <CardHeader>
                <CardTitle className="text-oracle-brown">热门话题</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "甲骨文AI识别技术",
                    "殷墟最新考古发现",
                    "商代占卜文化研究",
                    "甲骨文书法艺术",
                    "古文字数字化保护"
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-oracle-brown/5 transition-colors cursor-pointer">
                      <div className="w-2 h-2 bg-cinnabar-red rounded-full" />
                      <span className="text-sm text-ink-black hover:text-oracle-brown transition-colors">
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage