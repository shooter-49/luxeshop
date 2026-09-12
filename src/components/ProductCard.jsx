import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart, useWishlist } from '../context/StoreContext'

function Stars({ rating }) {
  return (
    <span className="stars" style={{ fontSize: 12 }}>
      {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
    </span>
  )
}

export default function ProductCard({ product, style, delay = 0 }) {
  const { cartDispatch } = useCart()
  const { wishlist, wishlistDispatch } = useWishlist()
  const [adding, setAdding] = useState(false)
  const [hovered, setHovered] = useState(false)

  const isWished = wishlist.some(i => i.id === product.id)

  const addToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)
    cartDispatch({ type: 'ADD', item: product })
    setTimeout(() => setAdding(false), 1000)
  }

  const toggleWish = (e) => {
    e.preventDefault()
    e.stopPropagation()
    wishlistDispatch({ type: 'TOGGLE', item: product })
  }

  const discount = Math.round(Math.random() * 20 + 10)
  const oldPrice = (product.price * (1 + discount / 100)).toFixed(2)

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', display: 'block', minWidth: 0 }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          transition: 'all 0.35s ease',
          cursor: 'pointer',
          animation: `fadeUp 0.5s ease ${delay}s both`,
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4)' : 'none',
          borderColor: hovered ? 'var(--border-hover)' : 'var(--border)',
          width: '100%', boxSizing: 'border-box',
          ...style,
        }}
      >
        {/* Image container — padding-bottom trick for true square on all browsers */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', background: '#f8f6f2' }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'contain', padding: 20,
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
            loading="lazy"
          />

          {/* Wishlist btn */}
          <button onClick={toggleWish} style={{
            position: 'absolute', top: 12, right: 12,
            background: isWished ? 'var(--accent-gold)' : 'rgba(10,10,10,0.7)',
            border: '1px solid var(--border)',
            borderRadius: '50%', width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.25s',
            backdropFilter: 'blur(8px)',
            color: isWished ? '#000' : 'var(--text-secondary)',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={isWished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          {/* Category badge */}
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(8px)',
            border: '1px solid var(--border)', padding: '3px 10px',
            fontSize: 9, letterSpacing: 2, textTransform: 'uppercase',
            color: 'var(--accent-gold)', borderRadius: 100,
          }}>
            {product.category.replace("'s clothing", '')}
          </div>

          {/* Discount badge */}
          <div style={{
            position: 'absolute', bottom: 12, left: 12,
            background: 'var(--accent-gold)', color: '#000',
            padding: '2px 8px', fontSize: 10, fontWeight: 600, borderRadius: 2,
          }}>−{discount}%</div>

          {/* Add to cart overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '16px',
            background: 'linear-gradient(transparent, rgba(10,10,10,0.95))',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease',
          }}>
            <button onClick={addToCart} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px 20px', fontSize: 11 }}>
              {adding ? '✓ Ajouté' : 'Ajouter au panier'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: 12, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>
            {product.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="display" style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent-gold)' }}>${product.price}</span>
              <span className="price-old">${oldPrice}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Stars rating={product.rating?.rate || 4} />
              <span style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'Space Mono' }}>({product.rating?.count || 0})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ProductCardSkeleton() {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      <div className="skeleton" style={{ aspectRatio: '1' }} />
      <div style={{ padding: '16px 20px' }}>
        <div className="skeleton" style={{ height: 14, width: '80%', marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 22, width: '40%' }} />
      </div>
    </div>
  )
}
