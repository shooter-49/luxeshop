-- Seed products for Luxeshop
-- Run this after creating the `products` table (supabase_schema.sql)

insert into products (title, description, price, image, category, metadata)
values
('Classic White Tee', 'Comfortable cotton t-shirt, regular fit', 19.99, 'https://cdn.example.com/images/white-tee.jpg', 'apparel', '{"color":"white","material":"cotton"}'::jsonb),
('Slim Fit Jeans', 'Mid-rise slim-fit denim, stretch blend', 49.95, 'https://cdn.example.com/images/slim-jeans.jpg', 'apparel', '{"waist_sizes":[30,32,34,36],"color":"blue"}'::jsonb),
('Leather Tote Bag', 'Full-grain leather tote with interior pockets', 129.00, 'https://cdn.example.com/images/leather-tote.jpg', 'accessories', '{"color":"tan","dimensions":"14x11x5"}'::jsonb),
('Running Sneakers', 'Lightweight runners with breathable mesh', 89.5, 'https://cdn.example.com/images/sneakers.jpg', 'footwear', '{"sizes":[8,9,10,11],"gender":"unisex"}'::jsonb),
('Minimalist Watch', 'Quartz movement, 40mm stainless steel case', 199.99, 'https://cdn.example.com/images/watch.jpg', 'accessories', '{"water_resistant":true,"band":"leather"}'::jsonb),
('Ceramic Mug', '12oz hand-glazed ceramic mug', 14.5, 'https://cdn.example.com/images/mug.jpg', 'home', '{"capacity_oz":12,"dishwasher_safe":true}'::jsonb)
;
