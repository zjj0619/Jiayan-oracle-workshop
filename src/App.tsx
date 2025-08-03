'use client'

import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import OriginPage from './components/OriginPage'
import AIQAPage from './components/AIQAPage'
import TracePage from './components/TracePage'
import ArtCreationPage from './components/ArtCreationPage' // 替换为新的工坊页面
import CollectionPage from './components/CollectionPage'
import CommunityPage from './components/CommunityPage'
import AuthPage from './components/AuthPage'

function App() {
  return (
    <div className="min-h-screen bg-bone-white">
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/origin" element={<OriginPage />} />
          <Route path="/qa" element={<AIQAPage />} />
          <Route path="/trace" element={<TracePage />} />
          <Route path="/workshop" element={<ArtCreationPage />} /> 
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App