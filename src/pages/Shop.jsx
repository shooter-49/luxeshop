import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts, useCategories } from '../hooks/useApi'
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard'

const SORT_OPTIONS = [
  { value: 'default', label: 'Par défaut' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
  { value: 'name', label: 'Alphabétique' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const catParam = searchParams.get('cat') || 'all'
  const qParam = searchParams.get('q') || ''

  const [sort, setSort] = useState('default')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [minRating, setMinRating] = useState(0)
  const [search, setSearch] = useState(qParam)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const categories = useCategories()
  const { products, loading } = useProducts(catParam === 'all' ? null : catParam)

  const filtered = useMemo(() => {
    let list = [...products]
    if (search) list = list.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    )
    list = list.filter(p => p.price <= maxPrice)
    list = list.filter(p => (p.rating?.rate || 0) >= minRating)
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'rating': list.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)); break
      case 'name': list.sort((a, b) => a.title.localeCompare(b.title)); break
    }
    return list
  }, [products, search, sort, maxPrice, minRating])

  const setCategory = (cat) => {
    const p = new URLSearchParams(searchParams)
    if (cat === 'all') p.delete('cat')
    else p.set('cat', cat)
    setSearchParams(p)
  }

  const resetFilters = () => {
    setSort('default')
    setMaxPrice(1000)
    setMinRating(0)
    setSearch('')
    setCategory('all')
  }

  const activeFiltersCount = [
    sort !== 'default',
    maxPrice < 1000,
    minRating > 0,
    search.length > 0,
    catParam !== 'all',
  ].filter(Boolean).length

  return (
    <>
      <style>{`
        .shop-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 40px;
          align-items: start;
        }
        .shop-sidebar {
          display: block;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .mobile-filter-btn { display: none; }

        @media (max-width: 1024px) {
          .shop-layout {
            grid-template-columns: 220px 1fr;
            gap: 28px;
          }
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
        }
        @media (max-width: 768px) {
          .shop-layout {
            grid-template-columns: 1fr;
          }
          .shop-sidebar {
            display: ${sidebarOpen ? 'block' : 'none'};
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: var(--bg-primary);
            z-index: 300;
            overflow-y: auto;
            padding: 24px 20px 80px;
          }
          .mobile-filter-btn { display: flex !important; }
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }
        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
        }
      `}</style>

      <div style={{ paddingTop: 112, minHeight: '100vh', overflowX: 'hidden' }}>
        {/* Page Header */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '48px 0 36px',
        }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 10 }}>
              Boutique
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, lineHeight: 1.1 }}>
                  Notre Collection
                </h1>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 8 }}>
                  <span style={{ color: 'var(--accent-gold)', fontFamily: 'Cormorant Garamond', fontSize: 20, fontWeight: 600 }}>{filtered.length}</span> produits trouvés
                </div>
              </div>
              {/* Mobile filter button */}
              <button className="mobile-filter-btn btn-outline" onClick={() => setSidebarOpen(true)} style={{ alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>
                Filtres {activeFiltersCount > 0 && <span className="badge">{activeFiltersCount}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '36px 32px', boxSizing: 'border-box' }}>
          <div className="shop-layout">

            {/* ── SIDEBAR ── */}
            <aside className="shop-sidebar">
              {/* Mobile close */}
              <div style={{ display: 'none' }} className="sidebar-close-btn">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                  <span style={{ fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>Filtres</span>
                  <button onClick={() => setSidebarOpen(false)} className="btn-ghost" style={{ padding: 8 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              </div>

              <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 32 }}>

                {/* Search */}
                <div>
                  <FilterLabel>Recherche</FilterLabel>
                  <div style={{ position: 'relative' }}>
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Rechercher un produit…"
                      style={{
                        width: '100%', boxSizing: 'border-box',
                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                        color: 'var(--text-primary)', padding: '10px 14px 10px 38px',
                        borderRadius: 'var(--radius)', fontSize: 13, outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                    <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.4, pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  </div>
                </div>

                <div className="divider" />

                {/* Categories */}
                <div>
                  <FilterLabel>Catégories</FilterLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {['all', ...categories].map(cat => {
                      const isActive = catParam === cat
                      return (
                        <button key={cat} onClick={() => setCategory(cat)} style={{
                          background: isActive ? 'var(--accent-gold-dim)' : 'transparent',
                          border: `1px solid ${isActive ? 'var(--border-hover)' : 'transparent'}`,
                          color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                          padding: '9px 14px', borderRadius: 'var(--radius)',
                          fontSize: 12, letterSpacing: 0.8, textTransform: 'capitalize',
                          cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}
                          onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-hover)' } }}
                          onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent' } }}
                        >
                          <span>{cat === 'all' ? 'Tous les produits' : cat}</span>
                          {isActive && <span style={{ fontSize: 10 }}>✓</span>}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="divider" />

                {/* Price range */}
                <div>
                  <FilterLabel>
                    Prix maximum&nbsp;
                    <span style={{ color: 'var(--accent-gold)', fontFamily: 'Cormorant Garamond', fontSize: 16 }}>${maxPrice}</span>
                  </FilterLabel>
                  <input
                    type="range" min="10" max="1000" value={maxPrice}
                    onChange={e => setMaxPrice(+e.target.value)}
                    style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer', marginBottom: 6 }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-dim)' }}>
                    <span>$10</span><span>$1000</span>
                  </div>
                </div>

                <div className="divider" />

                {/* Rating */}
                <div>
                  <FilterLabel>Note minimum</FilterLabel>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {[0, 3, 3.5, 4, 4.5].map(r => (
                      <button key={r} onClick={() => setMinRating(r)} style={{
                        background: minRating === r ? 'var(--accent-gold)' : 'var(--bg-card)',
                        border: `1px solid ${minRating === r ? 'var(--accent-gold)' : 'var(--border)'}`,
                        color: minRating === r ? '#000' : 'var(--text-secondary)',
                        padding: '5px 12px', borderRadius: 100, fontSize: 11,
                        cursor: 'pointer', transition: 'all 0.2s', fontWeight: minRating === r ? 600 : 400,
                      }}>
                        {r === 0 ? 'Tous' : `${r}★+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divider" />

                {/* Reset */}
                <button
                  className="btn-ghost"
                  onClick={resetFilters}
                  style={{ justifyContent: 'center', border: '1px solid var(--border)', width: '100%', opacity: activeFiltersCount > 0 ? 1 : 0.4 }}
                  disabled={activeFiltersCount === 0}
                >
                  {activeFiltersCount > 0 ? `Réinitialiser (${activeFiltersCount})` : 'Aucun filtre actif'}
                </button>
              </div>
            </aside>

            {/* ── PRODUCTS AREA ── */}
            <div style={{ minWidth: 0 }}>
              {/* Sort bar */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 28, padding: '12px 18px',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', gap: 12, flexWrap: 'wrap',
              }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                  <span style={{ color: 'var(--accent-gold)', fontFamily: 'Cormorant Garamond', fontSize: 20, fontWeight: 600 }}>{filtered.length}</span> résultat{filtered.length !== 1 ? 's' : ''}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text-dim)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Trier :</span>
                  <select value={sort} onChange={e => setSort(e.target.value)} style={{
                    background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                    color: 'var(--text-primary)', padding: '7px 32px 7px 12px', borderRadius: 'var(--radius)',
                    fontSize: 12, cursor: 'pointer', outline: 'none', appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a09890' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
                  }}>
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Active filter pills */}
              {activeFiltersCount > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                  {search && (
                    <FilterPill label={`"${search}"`} onRemove={() => setSearch('')} />
                  )}
                  {catParam !== 'all' && (
                    <FilterPill label={catParam} onRemove={() => setCategory('all')} />
                  )}
                  {maxPrice < 1000 && (
                    <FilterPill label={`Max $${maxPrice}`} onRemove={() => setMaxPrice(1000)} />
                  )}
                  {minRating > 0 && (
                    <FilterPill label={`${minRating}★+`} onRemove={() => setMinRating(0)} />
                  )}
                </div>
              )}

              {/* Product Grid */}
              {loading ? (
                <div className="products-grid">
                  {Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)}
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-dim)' }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ marginBottom: 20, opacity: 0.3 }}>
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <div className="display" style={{ fontSize: 36, marginBottom: 12, fontWeight: 300 }}>Aucun résultat</div>
                  <div style={{ fontSize: 14, marginBottom: 24 }}>Essayez d'ajuster vos filtres</div>
                  <button className="btn-outline" onClick={resetFilters}>Réinitialiser les filtres</button>
                </div>
              ) : (
                <div className="products-grid">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} product={p} delay={i * 0.04} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 299, backdropFilter: 'blur(4px)' }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .shop-sidebar { display: ${sidebarOpen ? 'block !important' : 'none !important'}; }
          .sidebar-close-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

function FilterLabel({ children }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: 12, fontWeight: 500 }}>
      {children}
    </div>
  )
}

function FilterPill({ label, onRemove }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: 'var(--accent-gold-dim)', border: '1px solid var(--border-hover)',
      color: 'var(--accent-gold)', borderRadius: 100,
      padding: '4px 10px 4px 12px', fontSize: 11, letterSpacing: 0.5,
    }}>
      {label}
      <button onClick={onRemove} style={{
        background: 'none', border: 'none', color: 'var(--accent-gold)',
        cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: 14, display: 'flex', alignItems: 'center',
      }}>×</button>
    </div>
  )
}
