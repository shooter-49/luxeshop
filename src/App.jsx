import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import ErrorBoundary from './ErrorBoundary'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Wishlist from './pages/Wishlist'

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 120 }}>
      <div className="display" style={{ fontSize: 120, fontWeight: 300, color: 'var(--accent-gold)', lineHeight: 1, opacity: 0.3 }}>404</div>
      <h1 className="display" style={{ fontSize: 42, fontWeight: 300, marginBottom: 16 }}>Page introuvable</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 40 }}>Cette page n'existe pas ou a été déplacée.</p>
      <a href="/" className="btn-primary" style={{ textDecoration: 'none' }}>Retour à l'accueil</a>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </StoreProvider>
    </ErrorBoundary>
  )
}
