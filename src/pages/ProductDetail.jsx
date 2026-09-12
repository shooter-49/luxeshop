import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct, useProducts } from '../hooks/useApi'
import { useCart, useWishlist } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const { product, loading } = useProduct(id)
  const { cartDispatch } = useCart()
  const { wishlist, wishlistDispatch } = useWishlist()
  const { products } = useProducts()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  if (loading) return <ProductDetailSkeleton />
  if (!product) return <div style={{ paddingTop: 160, textAlign: 'center', minHeight: '100vh' }}>Produit introuvable.</div>

  const isWished = wishlist.some(i => i.id === product.id)
  const discount = Math.round(Math.random() * 20 + 10)
  const oldPrice = (product.price * (1 + discount / 100)).toFixed(2)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) cartDispatch({ type: 'ADD', item: product })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ paddingTop: 120, minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="container" style={{ padding: '24px 48px 0' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--text-dim)' }}>
          <Link to="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Accueil</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Boutique</Link>
          <span>/</span>
          <Link to={`/shop?cat=${encodeURIComponent(product.category)}`} style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
            {product.category}
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>{product.title}</span>
        </div>
      </div>

      {/* Main section */}
      <div className="container" style={{ padding: '48px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Image */}
          <div>
            <div style={{
              background: '#f8f6f2', borderRadius: 4, aspectRatio: '1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden',
              position: 'relative',
            }}>
              <img src={product.image} alt={product.title} style={{ width: '65%', height: '65%', objectFit: 'contain', transition: 'transform 0.5s' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', top: 20, left: 20,
                background: 'var(--accent-gold)', color: '#000',
                padding: '4px 12px', fontSize: 11, fontWeight: 600, borderRadius: 2,
              }}>−{discount}%</div>
            </div>
          </div>

          {/* Info */}
          <div style={{ animation: 'fadeUp 0.5s ease both' }}>
            {/* Category */}
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 16 }}>
              {product.category}
            </div>

            {/* Title */}
            <h1 className="display" style={{ fontSize: 36, fontWeight: 300, lineHeight: 1.25, marginBottom: 24 }}>
              {product.title}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < Math.round(product.rating?.rate || 4) ? 'var(--accent-gold)' : 'var(--text-dim)', fontSize: 16 }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                {product.rating?.rate} ({product.rating?.count} avis)
              </span>
            </div>

            <div className="divider" style={{ marginBottom: 28 }} />

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 32 }}>
              <span className="display" style={{ fontSize: 48, fontWeight: 600, color: 'var(--accent-gold)' }}>${product.price}</span>
              <span className="price-old" style={{ fontSize: 18 }}>${oldPrice}</span>
              <span style={{ background: 'var(--accent-gold-dim)', color: 'var(--accent-gold)', border: '1px solid var(--border)', fontSize: 11, padding: '3px 10px', borderRadius: 100, letterSpacing: 1 }}>
                Économisez {discount}%
              </span>
            </div>

            {/* Qty selector */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 12 }}>Quantité</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--border)', borderRadius: 'var(--radius)', width: 'fit-content' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', width: 44, height: 44, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <span style={{ minWidth: 44, textAlign: 'center', fontSize: 16, fontFamily: 'Cormorant Garamond', fontWeight: 600, color: 'var(--text-primary)' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', width: 44, height: 44, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
              <button onClick={handleAddToCart} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}>
                {added ? '✓ Ajouté au panier !' : `Ajouter au panier — $${(product.price * qty).toFixed(2)}`}
              </button>
              <button onClick={() => wishlistDispatch({ type: 'TOGGLE', item: product })} style={{
                background: isWished ? 'var(--accent-gold-dim)' : 'var(--bg-card)',
                border: `1px solid ${isWished ? 'var(--accent-gold)' : 'var(--border)'}`,
                color: isWished ? 'var(--accent-gold)' : 'var(--text-secondary)',
                width: 52, height: 52, borderRadius: 'var(--radius)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.25s', flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Features */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
              {[['🚚', 'Livraison offerte', 'dès $150'], ['↩', 'Retours 30j', 'Facilement'], ['🔒', 'Paiement sécurisé', 'SSL 256-bit'], ['⭐', 'Qualité garantie', 'ou remboursé']].map(([icon, t, s]) => (
                <div key={t} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{t}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginTop: 80 }}>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 40 }}>
            {['description', 'avis', 'livraison'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '14px 32px',
                color: activeTab === tab ? 'var(--accent-gold)' : 'var(--text-dim)',
                fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
                borderBottom: activeTab === tab ? '2px solid var(--accent-gold)' : '2px solid transparent',
                marginBottom: -1, transition: 'all 0.2s',
              }}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div style={{ maxWidth: 700, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 2 }}>
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'avis' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 700 }}>
              {[
                { name: 'Sophie M.', rating: 5, comment: 'Excellent produit, qualité au rendez-vous. Livraison rapide et emballage soigné.' },
                { name: 'Lucas P.', rating: 4, comment: 'Très satisfait de mon achat. Le produit correspond parfaitement à la description.' },
                { name: 'Emma R.', rating: 5, comment: 'Magnifique ! Je recommande vivement cette boutique pour sa sélection premium.' },
              ].map((r, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4, padding: '24px 28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ fontWeight: 500 }}>{r.name}</div>
                    <div>{'★'.repeat(r.rating)}<span style={{ color: 'var(--text-dim)' }}>{'☆'.repeat(5 - r.rating)}</span></div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'livraison' && (
            <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                ['Standard (3–5j)', 'Gratuit dès $150, sinon $4.99'],
                ['Express (24h)', '$9.99'],
                ['Retours', 'Gratuits sous 30 jours'],
              ].map(([t, d]) => (
                <div key={t} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{t}</span>
                  <span style={{ fontSize: 13, color: 'var(--accent-gold)' }}>{d}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 100 }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 12 }}>Vous aimerez aussi</div>
              <h2 className="display" style={{ fontSize: 36, fontWeight: 300 }}>Produits similaires</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {related.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.05} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div style={{ paddingTop: 160, minHeight: '100vh' }} className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, padding: '48px' }}>
        <div className="skeleton" style={{ aspectRatio: '1', borderRadius: 4 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="skeleton" style={{ height: 14, width: '30%' }} />
          <div className="skeleton" style={{ height: 40, width: '90%' }} />
          <div className="skeleton" style={{ height: 40, width: '60%' }} />
          <div className="skeleton" style={{ height: 60, width: '50%' }} />
          <div className="skeleton" style={{ height: 52 }} />
        </div>
      </div>
    </div>
  )
}
