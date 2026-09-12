import React from 'react'
import { Link } from 'react-router-dom'
import { useWishlist, useCart } from '../context/StoreContext'

export default function Wishlist() {
  const { wishlist, wishlistDispatch } = useWishlist()
  const { cartDispatch } = useCart()

  return (
    <div style={{ paddingTop: 120, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '60px 0 40px' }}>
        <div className="container">
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 12 }}>Mes favoris</div>
          <h1 className="display" style={{ fontSize: 52, fontWeight: 300 }}>Wishlist</h1>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 8 }}>{wishlist.length} article{wishlist.length !== 1 ? 's' : ''}</div>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 48px' }}>
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-dim)' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" style={{ marginBottom: 24, opacity: 0.3 }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <div className="display" style={{ fontSize: 42, marginBottom: 16, fontWeight: 300 }}>Votre wishlist est vide</div>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 36 }}>
              Explorez notre collection et sauvegardez vos coups de cœur.
            </p>
            <Link to="/shop">
              <button className="btn-primary">Découvrir la Collection</button>
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 32 }}>
              <button className="btn-outline" onClick={() => wishlist.forEach(item => wishlistDispatch({ type: 'TOGGLE', item }))}>
                Vider la wishlist
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
              {wishlist.map((product, i) => (
                <WishlistCard key={product.id} product={product} delay={i * 0.06}
                  onRemove={() => wishlistDispatch({ type: 'TOGGLE', item: product })}
                  onAddToCart={() => cartDispatch({ type: 'ADD', item: product })}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function WishlistCard({ product, delay, onRemove, onAddToCart }) {
  const [adding, setAdding] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)

  const handleAdd = () => {
    onAddToCart()
    setAdding(true)
    setTimeout(() => setAdding(false), 1200)
  }

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', overflow: 'hidden',
      animation: `fadeUp 0.5s ease ${delay}s both`,
      transition: 'all 0.3s',
      transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4)' : 'none',
      borderColor: hovered ? 'var(--border-hover)' : 'var(--border)',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{ aspectRatio: '1', background: '#f8f6f2', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
          <img src={product.image} alt={product.title} style={{ width: '70%', height: '70%', objectFit: 'contain', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
          {/* Remove btn */}
          <button onClick={(e) => { e.preventDefault(); onRemove() }} style={{
            position: 'absolute', top: 10, right: 10,
            background: 'rgba(10,10,10,0.8)', border: '1px solid var(--border)',
            color: 'var(--accent-gold)', width: 32, height: 32, borderRadius: '50%',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, backdropFilter: 'blur(8px)', transition: 'all 0.2s',
          }}>×</button>
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: '16px 18px' }}>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
          {product.category.replace("'s clothing", '')}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {product.title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span className="display" style={{ fontSize: 22, color: 'var(--accent-gold)', fontWeight: 600 }}>${product.price}</span>
          <span style={{ fontSize: 10, color: 'var(--accent-gold)', letterSpacing: 1 }}>★ {product.rating?.rate}</span>
        </div>
        <button onClick={handleAdd} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: 11 }}>
          {adding ? '✓ Ajouté !' : 'Ajouter au panier'}
        </button>
      </div>
    </div>
  )
}
