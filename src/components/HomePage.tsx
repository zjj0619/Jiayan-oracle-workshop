'use client'

import { ArrowRight, BookText, BrainCircuit, SearchCode, Archive, Users, Feather } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const features = [
    {
      icon: BookText,
      title: '字源探寻',
      description: '深入了解每个甲骨文字的起源、演变和含义，追溯三千年的文字历史。',
      href: '/origin',
    },
    {
      icon: BrainCircuit,
      title: 'AI 问卜',
      description: '与智能甲骨文专家对话，无论是学术问题还是趣味占卜，都能得到专业解答。',
      href: '/qa',
    },
    {
      icon: Archive,
      title: '数字典藏',
      description: '浏览高清甲骨文物拓片和3D模型，近距离感受中华文明的瑰宝。',
      href: '/collection',
    },
  ]

  const collections = [
    {
      image: '/images/董作賓甲骨文軸.jpg',
      title: '董作賓甲骨文軸',
      description: '著名甲骨学家董作賓先生的甲骨文书法作品，展现了甲骨文字的艺术美感和学术价值，是现代甲骨文研究的重要成果。',
    },
    {
      image: '/images/武丁卜辞甲骨片.jpg',
      title: '武丁卜辞甲骨片',
      description: '商王武丁时期的占卜刻辞，记录了商代王室的祭祀、征战等重要活动，是研究商代历史文化的珍贵实物资料。',
    },
    {
      image: '/images/史密森尼博物馆甲骨片.webp',
      title: '史密森尼博物馆甲骨片',
      description: '收藏于美国史密森尼博物馆的珍贵甲骨文物，展现了甲骨文的国际影响力和世界文化遗产价值。',
    },
  ]

  return (
    <div className="bg-ink-black text-elegant-gray font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1561883814-890c1779339a?q=80&w=1974&auto=format&fit=crop')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/80 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="[writing-mode:vertical-rl] font-heading text-6xl md:text-8xl text-bone-white space-y-4 mb-12">
              <span>一字千年</span>
              <span>智慧永传</span>
            </div>
            
            <p className="text-lg md:text-xl text-elegant-gray mb-8 max-w-2xl">
              探索、解读、传承。甲言工坊致力于用现代科技激活古老文字的生命力。
            </p>
            
            <div className="w-full max-w-lg">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="输入您想了解的甲骨文或问题..."
                  className="w-full h-14 pl-6 pr-36 rounded-md bg-white/5 border-white/20 text-bone-white placeholder:text-elegant-gray focus:ring-2 focus:ring-cinnabar-red"
                />
                <Button size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 bg-cinnabar-red hover:bg-cinnabar-red/80 text-bone-white rounded">
                  开始探索
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-ink-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading text-bone-white mb-4">核心功能</h2>
            <p className="text-lg text-elegant-gray max-w-3xl mx-auto">
              我们提供一系列工具与资源，帮助您深入甲骨文的世界，体验从认知到创造的全过程。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 border border-white/10 rounded-lg h-full text-center p-8 transition-all duration-300 hover:border-cinnabar-red/50 hover:-translate-y-2">
                    <div className="inline-block p-4 bg-cinnabar-red/10 rounded-full mb-6">
                      <IconComponent className="w-8 h-8 text-cinnabar-red" />
                    </div>
                    <h3 className="text-2xl font-heading text-bone-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-elegant-gray leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <Button variant="link" asChild className="text-cinnabar-red hover:text-cinnabar-red/80">
                      <Link to={feature.href}>
                        了解更多 <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Collection Showcase Section */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading text-bone-white mb-4">数字典藏精选</h2>
            <p className="text-lg text-elegant-gray max-w-3xl mx-auto">
              每一片甲骨，都是一段尘封的历史。我们精选了部分珍贵馆藏，邀您一同鉴赏。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-ink-black border border-white/10 rounded-lg overflow-hidden group">
                  <div className="overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading text-bone-white mb-2">{item.title}</h3>
                    <p className="text-elegant-gray text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-transparent border-2 border-cinnabar-red text-cinnabar-red hover:bg-cinnabar-red hover:text-bone-white rounded-md px-8">
              <Link to="/collection">
                探索完整典藏
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-ink-black">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Feather className="w-12 h-12 text-cinnabar-red mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-heading text-bone-white mb-6">
            成为甲骨文的数字传承者
          </h2>
          <p className="text-lg text-elegant-gray mb-8">
            无论您是学者、学生还是爱好者，都可以加入我们，共同为这份古老的智慧注入新的活力。您的每一次探索，都是一次宝贵的传承。
          </p>
          <Button size="lg" className="bg-cinnabar-red hover:bg-cinnabar-red/80 text-bone-white rounded-md px-10 py-6 text-lg">
            立即加入
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
