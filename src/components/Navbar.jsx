import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart, useWishlist } from '../context/StoreContext'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const { cartCount } = useCart()
  const { wishlist } = useWishlist()
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleSearch = e => {
    e.preventDefault()
    if (search.trim()) { navigate(`/shop?q=${encodeURIComponent(search.trim())}`); setSearch('') }
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,169,110,0.1)' : 'none',
        transition: 'all 0.4s ease',
        padding: '0 48px',
      }}>
        {/* Top bar */}
        <div style={{ textAlign: 'center', padding: '8px 0', borderBottom: '1px solid rgba(201,169,110,0.08)', fontSize: 11, letterSpacing: 3, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
          Livraison offerte dès 150€ · Retours sous 30 jours
        </div>

        {/* Main nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 300, letterSpacing: 8, color: 'var(--text-primary)' }}>
              LUX<span style={{ color: 'var(--accent-gold)' }}>·</span>E
            </div>
          </Link>

          {/* Center links */}
          <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="nav-links">
            {[['/', 'Accueil'], ['/shop', 'Collection'], ['/wishlist', 'Wishlist']].map(([to, label]) => (
              <Link key={to} to={to} style={{
                textDecoration: 'none',
                fontSize: 12,
                letterSpacing: 2.5,
                textTransform: 'uppercase',
                color: location.pathname === to ? 'var(--accent-gold)' : 'var(--text-secondary)',
                transition: 'color 0.2s',
                fontWeight: 400,
              }}
                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.target.style.color = location.pathname === to ? 'var(--accent-gold)' : 'var(--text-secondary)'}
              >{label}</Link>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Search */}
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher…"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  padding: '7px 14px',
                  borderRadius: 'var(--radius)',
                  fontSize: 12,
                  width: 160,
                  outline: 'none',
                  transition: 'border 0.2s',
                  letterSpacing: 0.5,
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <button type="submit" className="btn-ghost" style={{ padding: '7px 10px' }}>
                <SearchIcon />
              </button>
            </form>

            {/* Wishlist */}
            <Link to="/wishlist" style={{ position: 'relative', textDecoration: 'none', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <HeartIcon />
              {wishlist.length > 0 && <span className="badge" style={{ position: 'absolute', top: -8, right: -8, minWidth: 18, textAlign: 'center', padding: '1px 5px' }}>{wishlist.length}</span>}
            </Link>

            {/* Cart */}
            <button onClick={() => setCartOpen(true)} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'color 0.2s', display: 'flex' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <BagIcon />
              {cartCount > 0 && <span className="badge" style={{ position: 'absolute', top: -8, right: -8, minWidth: 18, textAlign: 'center', padding: '1px 5px' }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </>
  )
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
)
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)
const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)
