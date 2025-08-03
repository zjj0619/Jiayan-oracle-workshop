'use client'

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: '首页', path: '/' },
    { name: '字源探寻', path: '/origin' },
    { name: 'AI问卜', path: '/qa' },
    { name: '数字典藏', path: '/collection' },
    { name: '社区', path: '/community' }
  ]

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-ink-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-12 h-12 border-2 border-cinnabar-red rounded-md flex items-center justify-center">
              <span className="font-heading text-2xl text-cinnabar-red">吉</span>
            </div>
            <span className="text-2xl font-heading text-bone-white">甲言</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative transition-colors duration-300 font-sans text-lg ${
                  location.pathname === item.path
                    ? 'text-cinnabar-red'
                    : 'text-elegant-gray hover:text-bone-white'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-cinnabar-red rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-elegant-gray hover:text-bone-white">
              <Search className="w-5 h-5" />
            </Button>
            <Link to="/auth">
              <Button variant="ghost" className="text-elegant-gray hover:text-bone-white">
                <User className="w-5 h-5 mr-2" />
                登录
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-cinnabar-red hover:bg-cinnabar-red/80 text-bone-white rounded-md font-sans">
                注册
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-elegant-gray hover:text-bone-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-ink-black/95 backdrop-blur-md border-t border-white/10 py-4 absolute top-full left-0 right-0">
            <nav className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                  className={`text-left transition-colors duration-200 font-sans text-lg py-2 ${
                    location.pathname === item.path
                      ? 'text-cinnabar-red'
                      : 'text-elegant-gray hover:text-bone-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                <Link to="/auth" onClick={handleMobileMenuClose}>
                  <Button variant="outline" className="w-full border-cinnabar-red text-cinnabar-red hover:bg-cinnabar-red hover:text-bone-white">
                    登录
                  </Button>
                </Link>
                <Link to="/auth" onClick={handleMobileMenuClose}>
                  <Button className="w-full bg-cinnabar-red hover:bg-cinnabar-red/80 text-bone-white">
                    注册
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
