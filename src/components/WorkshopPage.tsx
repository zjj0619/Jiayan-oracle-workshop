'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Download, Save, Type, Image, Layers, Sparkles, Brush } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const WorkshopPage = () => {
  const [selectedTool, setSelectedTool] = useState('brush')
  const [selectedColor, setSelectedColor] = useState('#8B4513')

  const tools = [
    { id: 'brush', name: '画笔', icon: Brush, color: 'text-oracle-brown' },
    { id: 'text', name: '文字', icon: Type, color: 'text-bronze-blue' },
    { id: 'image', name: '图片', icon: Image, color: 'text-cinnabar-red' },
    { id: 'layers', name: '图层', icon: Layers, color: 'text-oracle-brown' }
  ]

  const oracleTemplates = [
    { id: 1, name: '龟甲模板', preview: '/placeholder.svg?height=150&width=150', category: '传统' },
    { id: 2, name: '兽骨模板', preview: '/placeholder.svg?height=150&width=150', category: '传统' },
    { id: 3, name: '现代卡片', preview: '/placeholder.svg?height=150&width=150', category: '现代' },
    { id: 4, name: '书法作品', preview: '/placeholder.svg?height=150&width=150', category: '艺术' },
    { id: 5, name: '文创海报', preview: '/placeholder.svg?height=150&width=150', category: '设计' },
    { id: 6, name: '教学课件', preview: '/placeholder.svg?height=150&width=150', category: '教育' }
  ]

  const oracleCharacters = [
    { char: '日', meaning: '太阳' },
    { char: '月', meaning: '月亮' },
    { char: '水', meaning: '水' },
    { char: '火', meaning: '火' },
    { char: '木', meaning: '木' },
    { char: '金', meaning: '金' },
    { char: '土', meaning: '土' },
    { char: '人', meaning: '人' }
  ]

  const colorPalette = [
    '#8B4513', '#3C8DAD', '#C53D2F', '#F8F4E9', '#1C1C1C',
    '#D4AF37', '#8B0000', '#2F4F4F', '#556B2F', '#8B4513'
  ]

  return (
    <div className="min-h-screen bg-bone-white pt-16">
      {/* Hero Section */}
      <section className="py-12 px-4 oracle-pattern">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-oracle-brown mb-4">
              甲骨工坊
            </h1>
            <p className="text-lg text-ink-black/80 mb-6">
              在线设计画布，AI艺术创作
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Left Toolbar */}
          <div className="col-span-2">
            <Card className="glass-effect oracle-shadow h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-oracle-brown text-sm">工具箱</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tools */}
                <div className="space-y-2">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant={selectedTool === tool.id ? "default" : "ghost"}
                      size="sm"
                      className={`w-full justify-start ${
                        selectedTool === tool.id 
                          ? 'bg-oracle-brown text-bone-white' 
                          : 'hover:bg-oracle-brown/10'
                      }`}
                      onClick={() => setSelectedTool(tool.id)}
                    >
                      <tool.icon className={`w-4 h-4 mr-2 ${tool.color}`} />
                      {tool.name}
                    </Button>
                  ))}
                </div>

                {/* Color Palette */}
                <div className="space-y-3 pt-4 border-t border-oracle-brown/20">
                  <label className="text-sm font-medium text-ink-black">颜色</label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorPalette.map((color, index) => (
                      <button
                        key={index}
                        className={`w-8 h-8 rounded-lg oracle-shadow border-2 transition-all ${
                          selectedColor === color 
                            ? 'border-oracle-brown scale-110' 
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t border-oracle-brown/20">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-bronze-blue text-bronze-blue hover:bg-bronze-blue hover:text-bone-white"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    保存
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-oracle-brown hover:bg-cinnabar-red text-bone-white"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    下载
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Canvas */}
          <div className="col-span-7">
            <Card className="glass-effect oracle-shadow h-full">
              <CardContent className="p-4 h-full">
                <div className="w-full h-full bg-bone-white rounded-lg oracle-shadow relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-bone-white to-oracle-brown/5 flex items-center justify-center">
                    <div className="text-center">
                      <Palette className="w-16 h-16 text-oracle-brown/50 mx-auto mb-4" />
                      <p className="text-oracle-brown/70 text-lg">开始您的甲骨文创作之旅</p>
                      <p className="text-ink-black/50 text-sm mt-2">选择工具和颜色，在画布上自由创作</p>
                    </div>
                  </div>
                  
                  {/* Canvas Overlay */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-oracle-brown/90 text-bone-white">
                      画布: 800 × 600
                    </Badge>
                    <Badge variant="outline" className="bg-bone-white/90">
                      {selectedTool === 'brush' ? '画笔模式' : '文字模式'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="col-span-3">
            <Tabs defaultValue="templates" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="templates">模板</TabsTrigger>
                <TabsTrigger value="characters">字符</TabsTrigger>
                <TabsTrigger value="ai">AI创作</TabsTrigger>
              </TabsList>

              <TabsContent value="templates" className="mt-4">
                <Card className="glass-effect oracle-shadow">
                  <CardHeader>
                    <CardTitle className="text-oracle-brown text-sm">设计模板</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {oracleTemplates.map((template) => (
                        <div
                          key={template.id}
                          className="cursor-pointer group"
                        >
                          <div className="aspect-square bg-oracle-brown/10 rounded-lg mb-2 flex items-center justify-center group-hover:bg-oracle-brown/20 transition-colors">
                            <Image className="w-8 h-8 text-oracle-brown" />
                          </div>
                          <p className="text-xs text-ink-black font-medium">{template.name}</p>
                          <p className="text-xs text-ink-black/60">{template.category}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="characters" className="mt-4">
                <Card className="glass-effect oracle-shadow">
                  <CardHeader>
                    <CardTitle className="text-oracle-brown text-sm">甲骨文字符</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2">
                      {oracleCharacters.map((char, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-oracle-brown/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-oracle-brown/20 transition-colors"
                        >
                          <span className="text-lg font-bold text-oracle-brown">{char.char}</span>
                          <span className="text-xs text-ink-black/60">{char.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai" className="mt-4">
                <Card className="glass-effect oracle-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-oracle-brown text-sm">
                      <Sparkles className="w-4 h-4" />
                      AI艺术创作
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-ink-black mb-2 block">
                        创作提示词
                      </label>
                      <textarea
                        className="w-full h-20 p-2 border border-oracle-brown/20 rounded-lg text-sm resize-none"
                        placeholder="描述您想要创作的甲骨文艺术作品..."
                      />
                    </div>
                    <Button className="w-full bg-oracle-brown hover:bg-cinnabar-red text-bone-white">
                      <Sparkles className="w-4 h-4 mr-2" />
                      生成艺术作品
                    </Button>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-ink-black">推荐提示词:</p>
                      <div className="space-y-1">
                        {[
                          "商代青铜纹样风格的龙",
                          "甲骨文字符组成的山水画",
                          "古典与现代融合的设计"
                        ].map((prompt, index) => (
                          <button
                            key={index}
                            className="w-full text-left text-xs p-2 bg-oracle-brown/5 rounded hover:bg-oracle-brown/10 transition-colors"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkshopPage