import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const WEB_CLIENT_URL = process.env.WEB_CLIENT_URL || 'http://localhost:5173'

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY in env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

app.use(cors({ origin: WEB_CLIENT_URL }))
app.use(express.json())

// Simple health
app.get('/api/health', (req, res) => res.json({ ok: true }))

// Products: proxy to Supabase table `products`
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').select('*')
    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error('GET /api/products', err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// Create checkout / order
app.post('/api/checkout', async (req, res) => {
  try {
    const { cart, customer } = req.body
    if (!cart || !Array.isArray(cart) || cart.length === 0) return res.status(400).json({ error: 'Empty cart' })

    // Validate items structure minimally
    for (const item of cart) {
      if (!item.id || !item.qty) return res.status(400).json({ error: 'Invalid cart item' })
    }

    // Create order row in Supabase
    const order = {
      items: cart,
      total: cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 0), 0),
      customer: customer || null,
      status: 'pending'
    }

    const { data, error } = await supabase.from('orders').insert([order]).select()
    if (error) throw error

    res.json({ order: data[0] })
  } catch (err) {
    console.error('POST /api/checkout', err)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
