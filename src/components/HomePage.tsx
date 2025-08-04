import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Search, 
  Users, 
  Archive, 
  Brain,
  ArrowRight,
  Sparkles,
  Clock,
  Award,
  TrendingUp,
  Play,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "字源探寻",
      description: "深入了解甲骨文的起源与演变历程",
      link: "/origin",
      color: "from-blue-500 to-cyan-500",
      image: "/jiaguwen.jpg"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI问卜",
      description: "体验古代占卜文化，获得智慧启发",
      link: "/ai-qa",
      color: "from-purple-500 to-pink-500",
      image: "/jinwen.webp"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "社区交流",
      description: "与同好分享学习心得，共同探讨",
      link: "/community",
      color: "from-green-500 to-emerald-500",
      image: "/xiaozhuan.jpg"
    },
    {
      icon: <Archive className="w-8 h-8" />,
      title: "数字典藏",
      description: "珍贵文物数字化展示与收藏",
      link: "/collection",
      color: "from-orange-500 to-red-500",
      image: "/kaishu.jpg"
    }
  ]

  const stats = [
    { number: "3000+", label: "甲骨文字符", icon: <BookOpen className="w-5 h-5" /> },
    { number: "500+", label: "文物藏品", icon: <Archive className="w-5 h-5" /> },
    { number: "10000+", label: "用户学习", icon: <Users className="w-5 h-5" /> },
    { number: "99%", label: "满意度", icon: <Award className="w-5 h-5" /> }
  ]

  const timeline = [
    {
      period: "商代晚期",
      year: "约公元前1250-1046年",
      title: "甲骨文诞生",
      description: "商王室用于占卜的文字记录",
      image: "/jiaguwen.jpg"
    },
    {
      period: "西周时期",
      year: "约公元前1046-771年", 
      title: "金文发展",
      description: "青铜器上的铭文艺术",
      image: "/jinwen.webp"
    },
    {
      period: "秦朝统一",
      year: "约公元前221年",
      title: "小篆标准化",
      description: "文字统一，书同文",
      image: "/xiaozhuan.jpg"
    },
    {
      period: "汉代以后",
      year: "约公元前206年起",
      title: "楷书成熟",
      description: "现代汉字的基础形态",
      image: "/kaishu.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-oracle-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-oracle-primary via-oracle-secondary to-oracle-accent text-oracle-light">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-modern relative z-10 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-modern"
            >
              <Badge className="bg-oracle-gold/20 text-oracle-light border-oracle-gold/30 mb-6 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                探索古代文明
              </Badge>
              
              <h1 className="text-responsive-xl font-oracle font-bold leading-tight mb-6 text-oracle-light">
                甲骨文工坊
                <span className="block text-oracle-gold">传承千年智慧</span>
              </h1>
              
              <p className="text-xl text-oracle-light/90 mb-8 leading-relaxed font-oracle">
                深入探索中华文明的源头，体验甲骨文的神秘魅力。
                从古代占卜到现代AI，让历史与科技完美融合。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/origin">
                  <Button size="lg" className="bg-oracle-light text-oracle-primary hover:bg-oracle-surface border-2 border-oracle-gold hover:border-oracle-gold/80 w-full sm:w-auto font-oracle font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Play className="w-5 h-5 mr-2" />
                    开始探索
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/ai-qa">
                  <Button size="lg" variant="outline" className="border-oracle-gold/50 text-oracle-light hover:bg-oracle-gold/20 hover:border-oracle-gold w-full sm:w-auto font-oracle font-semibold px-8 py-3 rounded-xl">
                    <Brain className="w-5 h-5 mr-2" />
                    AI问卜体验
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-strong">
                <img 
                  src="/jiaguwen.jpg" 
                  alt="甲骨文" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">商代甲骨文</h3>
                  <p className="text-white/80">中华文字的起源</p>
                </div>
              </div>
              
              {/* 浮动元素 */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-accent-gold rounded-full flex items-center justify-center shadow-medium"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-oracle-surface">
        <div className="container-modern">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-oracle-primary to-oracle-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-oracle-gold/30">
                  <div className="text-oracle-light">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-oracle-primary mb-2 font-oracle">{stat.number}</div>
                <div className="text-oracle-secondary font-oracle">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              <TrendingUp className="w-4 h-4" />
              核心功能
            </Badge>
            <h2 className="text-responsive-lg font-bold text-oracle-primary mb-4 font-oracle">
              探索甲骨文的多重魅力
            </h2>
            <p className="text-xl text-oracle-secondary max-w-2xl mx-auto font-oracle">
              从历史溯源到AI互动，全方位体验中华文字的深厚底蕴
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={feature.link} className="block group">
                  <Card className="bg-oracle-surface border-2 border-oracle-border/20 rounded-2xl h-full overflow-hidden group-hover:shadow-2xl group-hover:border-oracle-gold/40 transition-all duration-300 hover:transform hover:-translate-y-2">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-oracle-primary/70 to-oracle-secondary/70"></div>
                      <div className="absolute top-4 left-4 w-12 h-12 bg-oracle-gold/30 backdrop-blur-sm rounded-full flex items-center justify-center text-oracle-light border border-oracle-gold/50">
                        {feature.icon}
                      </div>
                    </div>
                    
                    <CardContent className="p-6 bg-oracle-surface">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-oracle-primary font-oracle">{feature.title}</h3>
                        <ChevronRight className="w-5 h-5 text-oracle-muted group-hover:text-oracle-gold group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      <p className="text-oracle-secondary leading-relaxed font-oracle">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              历史时间线
            </Badge>
            <h2 className="text-responsive-lg font-bold text-oracle-primary mb-4 font-oracle">
              汉字演变历程
            </h2>
            <p className="text-xl text-oracle-secondary max-w-2xl mx-auto font-oracle">
              从甲骨文到现代汉字，见证中华文字的千年传承
            </p>
          </motion.div>

          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-oracle-primary via-oracle-secondary to-oracle-accent rounded-full hidden lg:block"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1">
                    <Card className="bg-oracle-surface border-2 border-oracle-border/20 rounded-2xl shadow-lg hover:shadow-xl hover:border-oracle-gold/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-oracle-gold/30">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <Badge className="bg-oracle-primary text-oracle-light border-oracle-gold/50 mb-2 font-oracle">{item.period}</Badge>
                            <h3 className="text-xl font-bold text-oracle-primary mb-2 font-oracle">{item.title}</h3>
                            <p className="text-oracle-muted text-sm mb-2 font-oracle">{item.year}</p>
                            <p className="text-oracle-secondary font-oracle">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* 时间线节点 */}
                  <div className="hidden lg:block w-4 h-4 bg-oracle-gold rounded-full border-4 border-oracle-light shadow-lg flex-shrink-0"></div>
                  
                  <div className="flex-1 hidden lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-oracle-primary via-oracle-secondary to-oracle-accent text-oracle-light">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-modern text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-responsive-lg font-bold mb-6 font-oracle text-oracle-light">
              开启你的甲骨文探索之旅
            </h2>
            <p className="text-xl text-oracle-light/90 mb-8 leading-relaxed font-oracle">
              加入我们，一起探索中华文明的源头，体验古代智慧与现代科技的完美结合
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/origin">
                <Button size="lg" className="bg-oracle-light text-oracle-primary hover:bg-oracle-surface border-2 border-oracle-gold hover:border-oracle-gold/80 font-oracle font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <BookOpen className="w-5 h-5 mr-2" />
                  立即开始学习
                </Button>
              </Link>
              <Link to="/community">
                <Button size="lg" variant="outline" className="border-oracle-gold/50 text-oracle-light hover:bg-oracle-gold/20 hover:border-oracle-gold font-oracle font-semibold px-8 py-3 rounded-xl">
                  <Users className="w-5 h-5 mr-2" />
                  加入社区
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage