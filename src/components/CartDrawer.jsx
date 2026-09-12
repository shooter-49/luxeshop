import React from 'react'
import { useCart } from '../context/StoreContext'
import { Link } from 'react-router-dom'

export default function CartDrawer({ open, onClose }) {
  const { cart, cartDispatch, cartTotal, cartCount } = useCart()

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200,
        opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.3s ease', backdropFilter: 'blur(4px)',
      }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100vh', width: 420, maxWidth: '95vw',
        background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border)',
        zIndex: 201, transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="display" style={{ fontSize: 22, fontWeight: 400, letterSpacing: 2 }}>Votre Panier</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 1, marginTop: 2 }}>{cartCount} article{cartCount !== 1 ? 's' : ''}</div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: 8, borderRadius: '50%' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 32px', color: 'var(--text-dim)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ marginBottom: 16, opacity: 0.4 }}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <div className="display" style={{ fontSize: 20, marginBottom: 8 }}>Panier vide</div>
              <div style={{ fontSize: 13 }}>Explorez notre collection</div>
              <button onClick={onClose} className="btn-primary" style={{ marginTop: 24 }}>
                Découvrir
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{ padding: '16px 32px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                {/* Image */}
                <div style={{ width: 72, height: 72, background: '#fff', borderRadius: 2, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 16, fontFamily: 'Cormorant Garamond', color: 'var(--accent-gold)', fontWeight: 600 }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                    {/* Qty */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--border)', borderRadius: 2 }}>
                      <button onClick={() => item.qty === 1 ? cartDispatch({ type: 'REMOVE', id: item.id }) : cartDispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', width: 28, height: 28, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>−</button>
                      <span style={{ minWidth: 24, textAlign: 'center', fontSize: 13, color: 'var(--text-primary)' }}>{item.qty}</span>
                      <button onClick={() => cartDispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', width: 28, height: 28, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>+</button>
                    </div>
                    <button onClick={() => cartDispatch({ type: 'REMOVE', id: item.id })}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#e05f5f'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
                    >Retirer</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '24px 32px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Total</span>
              <span className="display" style={{ fontSize: 26, color: 'var(--accent-gold)', fontWeight: 600 }}>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}>
              Commander — ${cartTotal.toFixed(2)}
            </button>
            <button onClick={() => cartDispatch({ type: 'CLEAR' })} className="btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 11, letterSpacing: 1 }}>
              Vider le panier
            </button>
          </div>
        )}
      </div>
    </>
  )
}
