import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', marginTop: 120 }}>
      <div className="container">
        {/* Main footer */}
        <div style={{ padding: '80px 0 60px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60 }}>
          {/* Brand */}
          <div>
            <div className="display" style={{ fontSize: 32, fontWeight: 300, letterSpacing: 8, marginBottom: 20 }}>
              LUX<span style={{ color: 'var(--accent-gold)' }}>·</span>E
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, maxWidth: 280 }}>
              Une sélection rigoureuse de pièces d'exception. Chaque produit est choisi pour sa qualité, son design et son caractère unique.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              {['IG', 'TW', 'FB', 'YT'].map(s => (
                <div key={s} style={{
                  width: 36, height: 36, border: '1px solid var(--border)',
                  borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, letterSpacing: 1, color: 'var(--text-dim)', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.color = 'var(--accent-gold)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)' }}
                >{s}</div>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Boutique', links: ['Collection', 'Nouveautés', 'Promotions', 'Bestsellers'] },
            { title: 'Service', links: ['À propos', 'Contact', 'FAQ', 'Livraison'] },
            { title: 'Légal', links: ['CGV', 'Confidentialité', 'Cookies', 'Mentions légales'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 24, fontWeight: 500 }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(l => (
                  <span key={l} style={{ fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Bottom bar */}
        <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 0.5 }}>
            © 2025 LUX·E — Tous droits réservés
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {['Visa', 'MC', 'PayPal', 'Apple Pay'].map(p => (
              <span key={p} style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, border: '1px solid var(--border)', padding: '3px 8px', borderRadius: 2 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
