import { useState, useEffect } from 'react'

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export function useProducts(category = null) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    let mounted = true
    const url = category && category !== 'all'
      ? `${BASE}/products/category/${encodeURIComponent(category)}`
      : `${BASE}/products`

    setLoading(true)
    setError(null)

    async function load() {
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        const data = await res.json()
        if (mounted) setProducts(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('useProducts error', err)
          if (mounted) setError(err.message || 'Failed to fetch products')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false; controller.abort() }
  }, [category])

  return { products, loading, error }
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const controller = new AbortController()
    let mounted = true
    setLoading(true)

    async function load() {
      try {
        const res = await fetch(`${BASE}/products/${id}`, { signal: controller.signal })
        if (!res.ok) {
          if (res.status === 404) {
            if (mounted) setProduct(null)
            return
          }
          throw new Error(`${res.status} ${res.statusText}`)
        }
        const data = await res.json()
        if (mounted) setProduct(data)
      } catch (err) {
        if (err.name !== 'AbortError') console.error('useProduct error', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false; controller.abort() }
  }, [id])

  return { product, loading }
}

export function useCategories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let mounted = true
    const controller = new AbortController()

    async function load() {
      try {
        const res = await fetch(`${BASE}/products/categories`, { signal: controller.signal })
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        const data = await res.json()
        if (mounted) setCategories(data)
      } catch (err) {
        if (err.name !== 'AbortError') console.error('useCategories error', err)
      }
    }

    load()
    return () => { mounted = false; controller.abort() }
  }, [])

  return categories
}
