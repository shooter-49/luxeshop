import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useApi'
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard'

export default function Home() {
  const { products, loading } = useProducts()
  const featured = products.slice(0, 8)

  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedSection products={featured} loading={loading} />
      <BannerSection />
      <StatsSection />
    </div>
  )
}

function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg-primary)',
    }}>
      {/* Background geometry */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '-5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left content */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              border: '1px solid var(--border)', padding: '6px 16px',
              borderRadius: 100, marginBottom: 32,
              animation: 'fadeUp 0.5s ease both',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-gold)' }} />
              <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
                Nouvelle Collection 2025
              </span>
            </div>

            <h1 className="display" style={{
              fontSize: 'clamp(52px, 6vw, 88px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: -1,
              marginBottom: 28,
              animation: 'fadeUp 0.5s ease 0.1s both',
            }}>
              L'Art du<br />
              <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>Luxe</span><br />
              Accessible.
            </h1>

            <p style={{
              fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8,
              maxWidth: 420, marginBottom: 44,
              animation: 'fadeUp 0.5s ease 0.2s both',
            }}>
              Des pièces soigneusement sélectionnées pour ceux qui refusent de choisir entre style et substance.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', animation: 'fadeUp 0.5s ease 0.3s both' }}>
              <Link to="/shop">
                <button className="btn-primary" style={{ fontSize: 12 }}>
                  Explorer la Collection
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </Link>
              <Link to="/wishlist">
                <button className="btn-outline" style={{ fontSize: 12 }}>
                  Mes Favoris
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 32, marginTop: 56, animation: 'fadeUp 0.5s ease 0.4s both' }}>
              {[['🚚', 'Livraison gratuite', 'dès 150€'], ['↩', 'Retours faciles', '30 jours'], ['🔒', 'Paiement sécurisé', '100% protégé']].map(([icon, t, s]) => (
                <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, marginTop: 2 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{t}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - product showcase */}
          <div style={{ position: 'relative', animation: 'fadeIn 0.8s ease 0.3s both' }}>
            <HeroProductDisplay />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroProductDisplay() {
  const { products } = useProducts()
  const p = products[0]

  return (
    <div style={{ position: 'relative' }}>
      {/* Main card */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 4, overflow: 'hidden', aspectRatio: '0.85',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f5f2ee',
      }}>
        {p && (
          <img src={p.image} alt={p.title} style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
        )}
        {!p && <div className="skeleton" style={{ width: '100%', height: '100%' }} />}
      </div>

      {/* Floating cards */}
      <div style={{
        position: 'absolute', bottom: -20, left: -40,
        background: 'var(--bg-secondary)', border: '1px solid var(--border)',
        borderRadius: 4, padding: '16px 20px', minWidth: 180,
        boxShadow: 'var(--shadow)',
      }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 6 }}>Bestseller</div>
        <div style={{ fontSize: 13, color: 'var(--text-primary)', marginBottom: 4 }}>Collection Premium</div>
        <div className="display" style={{ fontSize: 22, color: 'var(--accent-gold)', fontWeight: 600 }}>
          {p ? `$${p.price}` : '—'}
        </div>
      </div>

      <div style={{
        position: 'absolute', top: 20, right: -30,
        background: 'var(--bg-secondary)', border: '1px solid var(--border)',
        borderRadius: 4, padding: '12px 16px',
        boxShadow: 'var(--shadow)',
      }}>
        <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 4 }}>SATISFACTION</div>
        <div style={{ display: 'flex', gap: 2 }}>
          {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: 'var(--accent-gold)', fontSize: 14 }}>{s}</span>)}
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>+10,000 avis</div>
      </div>
    </div>
  )
}

function Categories() {
  const cats = [
    { name: "men's clothing", label: "Homme", emoji: "👔" },
    { name: "women's clothing", label: "Femme", emoji: "👗" },
    { name: "electronics", label: "Tech", emoji: "⚡" },
    { name: "jewelery", label: "Joaillerie", emoji: "💎" },
  ]

  return (
    <section style={{ padding: '100px 0 60px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 16 }}>Univers</div>
          <h2 className="display" style={{ fontSize: 44, fontWeight: 300 }}>Nos Catégories</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {cats.map((cat, i) => (
            <Link key={cat.name} to={`/shop?cat=${encodeURIComponent(cat.name)}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 4, padding: '48px 24px', textAlign: 'center',
                cursor: 'pointer', transition: 'all 0.3s ease',
                animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{cat.emoji}</div>
                <div className="display" style={{ fontSize: 22, fontWeight: 400, marginBottom: 8 }}>{cat.label}</div>
                <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>Explorer →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){section .container > div:last-child{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  )
}

function FeaturedSection({ products, loading }) {
  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 12 }}>Sélection</div>
            <h2 className="display" style={{ fontSize: 44, fontWeight: 300 }}>Produits Vedettes</h2>
          </div>
          <Link to="/shop">
            <button className="btn-outline" style={{ fontSize: 11 }}>Voir tout →</button>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.05} />)
          }
        </div>
      </div>
      <style>{`@media(max-width:1100px){section .container > div:last-child{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){section .container > div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

function BannerSection() {
  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, #1a1408 0%, #0f0c05 50%, var(--bg-secondary) 100%)',
          border: '1px solid var(--border)', borderRadius: 4,
          padding: '80px 80px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decoration */}
          <div style={{ position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 16 }}>Offre limitée</div>
            <h2 className="display" style={{ fontSize: 52, fontWeight: 300, marginBottom: 16 }}>
              Soldes d'Été<br /><span style={{ color: 'var(--accent-gold)' }}>−30%</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 400 }}>
              Profitez de réductions exclusives sur une sélection de pièces premium pour une durée limitée.
            </p>
          </div>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text-dim)', marginBottom: 8 }}>EXPIRE DANS</div>
            <CountdownTimer />
            <Link to="/shop">
              <button className="btn-primary" style={{ marginTop: 28 }}>
                Profiter de l'offre
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function CountdownTimer() {
  const [time, setTime] = React.useState({ h: 23, m: 47, s: 12 })
  React.useEffect(() => {
    const id = setInterval(() => {
      setTime(t => {
        let { h, m, s } = t
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; m = 59; s = 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {[['h', time.h], ['m', time.m], ['s', time.s]].map(([label, val]) => (
        <div key={label} style={{ textAlign: 'center' }}>
          <div className="display mono" style={{ fontSize: 40, fontWeight: 600, color: 'var(--accent-gold)', lineHeight: 1, minWidth: 56 }}>
            {String(val).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
        </div>
      ))}
    </div>
  )
}

function StatsSection() {
  const stats = [
    ['10 000+', 'Clients satisfaits'],
    ['500+', 'Produits premium'],
    ['4.9/5', 'Note moyenne'],
    ['24h', 'Livraison express'],
  ]
  return (
    <section style={{ padding: '60px 0 40px' }}>
      <div className="divider" />
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, padding: '60px 0' }}>
          {stats.map(([val, label], i) => (
            <div key={label} style={{ textAlign: 'center', animation: `fadeUp 0.5s ease ${i * 0.1}s both` }}>
              <div className="display" style={{ fontSize: 48, fontWeight: 600, color: 'var(--accent-gold)', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', letterSpacing: 1, marginTop: 8 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider" />
    </section>
  )
}
