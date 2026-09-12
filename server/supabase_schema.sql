-- Supabase schema for Luxeshop
-- Run this in the Supabase SQL editor or via psql

-- Enable pgcrypto for gen_random_uuid()
create extension if not exists pgcrypto;

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price numeric(10,2) not null default 0,
  image text,
  category text,
  metadata jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_products_category on products (category);

-- Orders table (simple JSON-based payload for items and customer info)
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  items jsonb not null,
  total numeric(10,2) not null,
  customer jsonb,
  status text not null default 'pending',
  created_at timestamptz default now()
);
create index if not exists idx_orders_status on orders (status);

-- Example inserts (uncomment to seed)
-- insert into products (title, description, price, image, category, metadata) values
-- ('Example product','A short description',19.99,'/images/example.jpg','general','{"color":"blue"}');
