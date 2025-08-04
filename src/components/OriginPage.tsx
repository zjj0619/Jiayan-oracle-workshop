'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, MapPin, Eye, TreePine, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ArtifactViewer2D from './ArtifactViewer2D'

const OriginPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const timelineData = [
    {
      year: "约公元前14世纪",
      dynasty: "商代盘庚时期",
      event: "甲骨文的初步发展",
      description: "盘庚迁殷后，社会趋于稳定，占卜活动频繁，甲骨文作为记录占卜内容的文字随之发展，字形尚不完全固定。",
      color: "bg-oracle-brown"
    },
    {
      year: "约公元前13世纪",
      dynasty: "商代武丁时期",
      event: "甲骨文的黄金时代",
      description: "武丁王在位期间，国力强盛，卜事繁多，甲骨文的使用达到顶峰。此时期的甲骨数量最多，内容最丰富，书风雄伟，是甲骨文研究的核心。",
      color: "bg-bronze-blue"
    },
    {
      year: "约公元前11世纪",
      dynasty: "商末周初",
      event: "风格演变与传承",
      description: "商朝末年，甲骨文字形趋于简化、秀丽。周朝建立后，虽然金文成为主流，但在部分地区仍有少量甲骨卜辞发现，体现了文字的过渡与演变。",
      color: "bg-cinnabar-red"
    },
    {
      year: "1899年",
      dynasty: "清末",
      event: "甲骨文的惊世发现",
      description: "金石学家王懿荣在北京首次鉴定出甲骨文，将其从“龙骨”的药材身份中剥离，开启了甲骨文的现代学术研究，震惊中外。",
      color: "bg-oracle-brown"
    },
    {
      year: "20世纪初",
      dynasty: "现代研究",
      event: "甲骨四堂与学术奠基",
      description: "罗振玉、王国维、董作宾、郭沫若等“甲骨四堂”通过考释、缀合、分期等研究，为甲骨学建立起坚实的学术基础，使其成为一门国际性学科。",
      color: "bg-bronze-blue"
    }
  ]

  const archaeologicalSites = [
    {
      name: "殷墟宫殿宗庙遗址",
      location: "河南安阳",
      discovered: "1928年起",
      significance: "被誉为\"中国现代考古学的摇篮\"，是商代晚期都城的核心，出土了王陵、宫殿及大量甲骨文，实证了商代历史。",
      artifacts: "约15万片甲骨",
      imageUrl: "/images/武丁卜辞甲骨片.jpg",
      coordinates: { x: 35, y: 45 }
    },
    {
      name: "小屯村宫殿宗庙区",
      location: "河南安阳",
      discovered: "1936年",
      significance: "殷墟的核心区域，发现了商王武丁及其配偶妇好的宗庙，出土的甲骨文为了解商代王室生活提供了直接证据。",
      artifacts: "超过2万片甲骨",
      imageUrl: "/images/祖庚祭祀卜辞.jpg",
      coordinates: { x: 40, y: 50 }
    },
    {
      name: "花园庄东地甲骨窖藏",
      location: "河南安阳",
      discovered: "1991年",
      significance: "一次性出土了完整的\"非王卜辞\"窖藏，内容多为一位名为\"子\"的贵族的占卜记录，极大地丰富了对商代社会结构的认识。",
      artifacts: "1583片甲骨",
      imageUrl: "/images/花园庄东地甲骨.jpg",
      coordinates: { x: 45, y: 55 }
    }
  ]

  const evolutionStages = [
    {
      stage: "甲骨文",
      period: "商朝 (约前1600-前1046)",
      description: "象形文字，直接描绘太阳形状，线条刚劲，充满原始的图画感。",
      imageUrl: "https://images.unsplash.com/photo-1589475237197-3801f719af80?q=80&w=800&auto=format&fit=crop",
      features: ["刀刻笔画，线条刚硬", "字形大小不一，图画性强", "多用于占卜记事"]
    },
    {
      stage: "金文",
      period: "西周 (约前1046-前771)",
      description: "铸造在青铜器上，字形趋于圆润、规整，线条更加流畅，被称为“钟鼎文”。",
      imageUrl: "https://images.unsplash.com/photo-1621955964364-c811243b4182?q=80&w=800&auto=format&fit=crop",
      features: ["铸造成型，笔画丰满", "结构渐趋固定", "多为记功颂德的铭文"]
    },
    {
      stage: "小篆",
      period: "秦朝 (前221-前206)",
      description: "秦始皇统一文字，字形高度对称、规范，奠定了汉字方块形态的基础。",
      imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=800&auto=format&fit=crop",
      features: ["“书同文”的产物", "笔画粗细均匀，线条圆转", "结构严谨，对称美观"]
    },
    {
      stage: "楷书",
      period: "汉末至今",
      description: "现代汉字的基础形态，笔画清晰，结构稳定，易于书写和辨认，又称“真书”。",
      imageUrl: "https://images.unsplash.com/photo-1543365363-991e54946e11?q=80&w=800&auto=format&fit=crop",
      features: ["“横平竖直”，笔画分明", "字形方正，结构稳定", "通行至今，应用最广"]
    }
  ]

  const artifacts2D = [
    {
      id: 1,
      name: "商王武丁卜骨",
      description: "记录商王武丁时期关于战争的占卜。",
      imageUrl: "/images/武丁卜辞甲骨片.jpg",
      altText: "商王武丁卜骨"
    },
    {
      id: 2,
      name: "祭祀卜辞龟甲",
      description: "详细记载了对先祖的祭祀仪式。",
      imageUrl: "/images/祖庚祭祀卜辞.jpg",
      altText: "祭祀卜辞龟甲"
    },
    {
      id: 3,
      name: "“王”字卜骨",
      description: "刻有清晰“王”字的牛胛骨。",
      imageUrl: "/images/花园庄东地甲骨.jpg",
      altText: "“王”字卜骨"
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-bone-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden oracle-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-oracle-brown/20 to-bronze-blue/20" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-oracle-brown">
            甲骨起源
          </h1>
          <p className="text-xl md:text-2xl text-ink-black/80 mb-8">
            穿越三千年时光，探寻中华文字之源
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-oracle-brown hover:bg-cinnabar-red text-bone-white">
              <Calendar className="mr-2 w-5 h-5" />
              时空长河
            </Button>
            <Button variant="outline" className="border-bronze-blue text-bronze-blue hover:bg-bronze-blue hover:text-bone-white">
              <MapPin className="mr-2 w-5 h-5" />
              考古地图
            </Button>
            <Button variant="outline" className="border-cinnabar-red text-cinnabar-red hover:bg-cinnabar-red hover:text-bone-white">
              <TreePine className="mr-2 w-5 h-5" />
              文字演化
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-oracle-brown mb-4">时空长河</h2>
            <p className="text-lg text-ink-black/70">追溯甲骨文从诞生到重现的历史轨迹</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-oracle-brown via-bronze-blue to-cinnabar-red" />
            
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-1/2 px-8">
                  <Card className="glass-effect oracle-shadow hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-oracle-brown">{item.year}</CardTitle>
                        <span className="text-sm text-bronze-blue font-medium">{item.dynasty}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-semibold text-ink-black mb-2">{item.event}</h3>
                      <p className="text-ink-black/70">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Timeline Node */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${item.color} border-4 border-bone-white oracle-shadow`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Archaeological Map Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-bone-white to-oracle-brown/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-oracle-brown mb-4">考古地图</h2>
            <p className="text-lg text-ink-black/70">重要考古发现地点分布</p>
          </motion.div>

          <div className="relative">
            {/* Simplified Map Background */}
            <div className="relative w-full h-96 bg-gradient-to-br from-bronze-blue/10 to-oracle-brown/10 rounded-2xl overflow-hidden oracle-shadow">
              <div className="absolute inset-0 oracle-pattern opacity-30" />
              
              {archaeologicalSites.map((site, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ 
                    left: `${site.coordinates.x}%`, 
                    top: `${site.coordinates.y}%` 
                  }}
                >
                  <div className="w-4 h-4 bg-cinnabar-red rounded-full oracle-shadow group-hover:scale-125 transition-transform" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Card className="glass-effect p-3 min-w-48">
                      <h4 className="font-semibold text-oracle-brown">{site.name}</h4>
                      <p className="text-sm text-ink-black/70">{site.location}</p>
                      <p className="text-sm text-bronze-blue">{site.artifacts}</p>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Site Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {archaeologicalSites.map((site, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="glass-effect oracle-shadow hover:shadow-lg transition-shadow h-full flex flex-col overflow-hidden group">
                    <div className="w-full h-48 overflow-hidden">
                      <img src={site.imageUrl} alt={site.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-oracle-brown flex items-center">
                        <MapPin className="mr-2 w-5 h-5" />
                        {site.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      <div className="space-y-2 flex-grow">
                        <p className="text-sm"><span className="font-medium text-ink-black/80">位置:</span> {site.location}</p>
                        <p className="text-sm"><span className="font-medium text-ink-black/80">发现:</span> {site.discovered}</p>
                        <p className="text-sm"><span className="font-medium text-ink-black/80">出土:</span> {site.artifacts}</p>
                        <p className="text-sm text-ink-black/70 mt-2">{site.significance}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Tree Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-oracle-brown mb-4">文字演化树</h2>
            <p className="text-lg text-ink-black/70">见证汉字从甲骨文到现代的演变历程</p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {evolutionStages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative flex"
              >
                <Card className="glass-effect oracle-shadow hover:shadow-lg transition-shadow text-center group flex flex-col h-full w-full">
                  <CardHeader className="p-0">
                    <div className="w-full h-48 overflow-hidden rounded-t-lg">
                      <img src={stage.imageUrl} alt={stage.stage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <CardTitle className="text-oracle-brown">{stage.stage}</CardTitle>
                      <p className="text-sm text-bronze-blue">{stage.period}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 flex-grow flex flex-col">
                    <p className="text-sm text-ink-black/70 mb-4 text-left flex-grow">{stage.description}</p>
                    <ul className="text-xs text-ink-black/60 space-y-2 text-left">
                      {stage.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <ArrowRight className="w-3 h-3 mr-2 mt-1 text-cinnabar-red flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Arrow */}
                {index < evolutionStages.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-bronze-blue/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2D Artifacts Preview */}
      <section className="py-20 px-4 bg-gradient-to-b from-oracle-brown/5 to-bone-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-oracle-brown mb-4">2D文物展示</h2>
            <p className="text-lg text-ink-black/70">清晰浏览珍贵甲骨文物图片</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artifacts2D.map((artifact, index) => (
              <motion.div
                key={artifact.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="glass-effect oracle-shadow hover:shadow-lg transition-all group h-full flex flex-col">
                  <div className="aspect-square rounded-t-lg overflow-hidden border-b-4 border-oracle-brown/50">
                    <ArtifactViewer2D imageUrl={artifact.imageUrl} altText={artifact.altText} />
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <h3 className="font-semibold text-oracle-brown mb-2">{artifact.name}</h3>
                    <p className="text-sm text-ink-black/70">{artifact.description}</p>
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

export default OriginPage