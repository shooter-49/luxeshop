import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)
const WishlistContext = createContext(null)

// ─── Cart ───────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.item.id)
      if (existing) return state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...state, { ...action.item, qty: 1 }]
    }
    case 'REMOVE': return state.filter(i => i.id !== action.id)
    case 'UPDATE_QTY': return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i)
    case 'CLEAR': return []
    default: return state
  }
}

// ─── Wishlist ────────────────────────────────────────────────────────
function wishlistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.find(i => i.id === action.item.id)
      return exists ? state.filter(i => i.id !== action.item.id) : [...state, action.item]
    }
    default: return state
  }
}

// ─── Provider ────────────────────────────────────────────────────────
export function StoreProvider({ children }) {
  function safeParse(key, fallback) {
    try {
      const v = localStorage.getItem(key)
      return v ? JSON.parse(v) : fallback
    } catch (e) {
      console.error('safeParse localStorage failed for', key, e)
      return fallback
    }
  }

  const [cart, cartDispatch] = useReducer(cartReducer, safeParse('lux_cart', []))
  const [wishlist, wishlistDispatch] = useReducer(wishlistReducer, safeParse('lux_wish', []))

  useEffect(() => { try { localStorage.setItem('lux_cart', JSON.stringify(cart)) } catch (e) { console.error('localStorage setItem lux_cart failed', e) } }, [cart])
  useEffect(() => { try { localStorage.setItem('lux_wish', JSON.stringify(wishlist)) } catch (e) { console.error('localStorage setItem lux_wish failed', e) } }, [wishlist])

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, cartDispatch, cartTotal, cartCount }}>
      <WishlistContext.Provider value={{ wishlist, wishlistDispatch }}>
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export const useWishlist = () => useContext(WishlistContext)
