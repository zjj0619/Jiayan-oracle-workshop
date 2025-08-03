'use client'

import { Github, Mail, MessageCircle, Heart, Scroll } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-jade-black text-ivory-white py-16 oracle-pattern">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 oracle-gradient rounded-xl flex items-center justify-center oracle-shadow">
                <span className="text-ivory-white font-bold text-xl">甲</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gold-sand">甲言</h3>
                <p className="text-sm text-ivory-white/80">甲骨文智慧传承工坊</p>
              </div>
            </div>
            <p className="text-ivory-white/80 mb-6 max-w-md leading-relaxed">
              龟甲上的回响，青铜里的低语。让古老的甲骨文"活"在当下，
              成为连接历史与未来的数字桥梁。通过AI技术和现代设计，
              传承中华文明的智慧结晶。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-bronze-blue/20 rounded-lg flex items-center justify-center text-ivory-white/60 hover:text-cinnabar-red hover:bg-cinnabar-red/20 transition-all duration-300 hover-lift">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-bronze-blue/20 rounded-lg flex items-center justify-center text-ivory-white/60 hover:text-cinnabar-red hover:bg-cinnabar-red/20 transition-all duration-300 hover-lift">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-bronze-blue/20 rounded-lg flex items-center justify-center text-ivory-white/60 hover:text-cinnabar-red hover:bg-cinnabar-red/20 transition-all duration-300 hover-lift">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-gold-sand flex items-center">
              <Scroll className="w-4 h-4 mr-2" />
              快速导航
            </h4>
            <ul className="space-y-3">
              <li><a href="/origin" className="text-ivory-white/80 hover:text-cinnabar-red transition-colors duration-200">甲骨起源</a></li>
              <li><a href="/qa" className="text-ivory-white/80 hover:text-cinnabar-red transition-colors duration-200">AI问答</a></li>
              <li><a href="/trace" className="text-ivory-white/80 hover:text-cinnabar-red transition-colors duration-200">识骨寻踪</a></li>
              <li><a href="/workshop" className="text-ivory-white/80 hover:text-cinnabar-red transition-colors duration-200">甲骨工坊</a></li>
            </ul>
          </div>

          {/* Academic Resources */}
          <div>
            <h4 className="font-semibold mb-6 text-gold-sand flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              学术资源
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-ivory-white/80 hover:text-cinnabar-red transition-colors duration-200">甲骨文合集</a></li>
              <li><a href="#" className="text-ivory-white/80 hover:text-cinnabar-red transition-colors duration-200">考古发现</a></li>
              <li><a href="#" className="text-ivory-white/80 hover:text-cinnabar-red transition-colors duration-200">学术论文</a></li>
              <li><a href="#" className="text-ivory-white/80 hover:text-cinnabar-red transition-colors duration-200">专家团队</a></li>
            </ul>
          </div>
        </div>

        <div className="oracle-divider my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="text-ivory-white/60 mb-4 md:mb-0">
            <p>© 2025 甲言 - 甲骨文智慧传承工坊. 保留所有权利.</p>
            <p className="mt-1 text-sm">大梦归迟团队版权所有</p>
          </div>
          <div className="flex items-center space-x-2 text-bronze-blue">
            <span className="text-sm">传承古韵</span>
            <div className="w-1 h-1 bg-cinnabar-red rounded-full animate-glow"></div>
            <span className="text-sm">智启未来</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer