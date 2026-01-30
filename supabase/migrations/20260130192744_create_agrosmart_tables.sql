/*
  # AgroSmart Agricultural Platform Database Schema

  ## Overview
  Complete database schema for the AgroSmart AI-powered agricultural platform.
  This migration creates all core tables needed for user management, marketplace,
  soil testing, crop intelligence, and agricultural advisory features.

  ## New Tables Created

  ### 1. `profiles`
  User profile information extending Supabase auth.users
  - `id` (uuid, FK to auth.users) - User identifier
  - `name` (text) - Full name of the user
  - `role` (text) - User role: 'FARMER' or 'ADMIN'
  - `avatar` (text) - Profile picture URL
  - `location` (text) - User's farm location
  - `total_acreage` (numeric) - Total land owned in acres
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last profile update

  ### 2. `products`
  Agricultural marketplace product catalog
  - `id` (uuid) - Product identifier
  - `name` (text) - Product name
  - `category` (text) - Seeds, Fertilizers, Tools, Pesticides, Tech
  - `price` (numeric) - Product price in local currency
  - `description` (text) - Product description
  - `image` (text) - Product image URL
  - `rating` (numeric) - Average customer rating (0-5)
  - `stock_quantity` (integer) - Available inventory
  - `is_active` (boolean) - Product availability status
  - `created_at` (timestamptz) - Product listing date

  ### 3. `cart_items`
  User shopping cart items
  - `id` (uuid) - Cart item identifier
  - `user_id` (uuid, FK) - Reference to profiles
  - `product_id` (uuid, FK) - Reference to products
  - `quantity` (integer) - Quantity in cart
  - `created_at` (timestamptz) - Added to cart timestamp
  - `updated_at` (timestamptz) - Last quantity update

  ### 4. `soil_tests`
  Soil analysis test results
  - `id` (uuid) - Test identifier
  - `user_id` (uuid, FK) - Reference to profiles
  - `nitrogen` (numeric) - Nitrogen level (mg/kg)
  - `phosphorus` (numeric) - Phosphorus level (mg/kg)
  - `potassium` (numeric) - Potassium level (mg/kg)
  - `ph` (numeric) - Soil pH level
  - `location` (text) - Test location
  - `analysis_result` (text) - AI-generated analysis report
  - `created_at` (timestamptz) - Test date

  ### 5. `crop_profiles`
  Crop intelligence database
  - `id` (uuid) - Crop identifier
  - `name` (text) - Crop name
  - `season` (text) - Kharif, Rabi, Zaid, or Annual
  - `duration_days` (integer) - Growth cycle duration
  - `image` (text) - Crop image URL
  - `optimal_temp_min` (numeric) - Minimum optimal temperature (°C)
  - `optimal_temp_max` (numeric) - Maximum optimal temperature (°C)
  - `water_requirement` (text) - Low, Moderate, High
  - `soil_types` (text[]) - Suitable soil types
  - `common_pests` (text[]) - Common pest list
  - `intelligence_data` (jsonb) - Detailed crop information
  - `created_at` (timestamptz) - Entry creation date

  ### 6. `planting_plans`
  Beginner planner generated plans
  - `id` (uuid) - Plan identifier
  - `user_id` (uuid, FK) - Reference to profiles
  - `crop_name` (text) - Target crop
  - `soil_type` (text) - User's soil type
  - `weather_condition` (text) - Expected weather
  - `plan_data` (text) - AI-generated planting plan
  - `status` (text) - Draft, Active, Completed
  - `created_at` (timestamptz) - Plan creation date

  ### 7. `field_scans`
  Crop health scan results
  - `id` (uuid) - Scan identifier
  - `user_id` (uuid, FK) - Reference to profiles
  - `image_url` (text) - Scanned field image URL
  - `analysis_result` (text) - AI disease detection result
  - `risk_level` (text) - Low, Medium, High
  - `created_at` (timestamptz) - Scan timestamp

  ### 8. `orders`
  Marketplace order records
  - `id` (uuid) - Order identifier
  - `user_id` (uuid, FK) - Reference to profiles
  - `total_amount` (numeric) - Total order value
  - `status` (text) - Pending, Processing, Completed, Cancelled
  - `shipping_address` (text) - Delivery address
  - `created_at` (timestamptz) - Order date
  - `updated_at` (timestamptz) - Last status update

  ### 9. `order_items`
  Individual items in orders
  - `id` (uuid) - Order item identifier
  - `order_id` (uuid, FK) - Reference to orders
  - `product_id` (uuid, FK) - Reference to products
  - `quantity` (integer) - Ordered quantity
  - `price_at_purchase` (numeric) - Price at time of purchase
  - `created_at` (timestamptz) - Order item creation

  ## Security Implementation

  All tables have Row Level Security (RLS) enabled with the following policies:

  ### User Access Policies
  - **Farmers** can view and manage their own data only
  - **Admins** have read access to aggregated data (not individual user details)
  - All policies use `auth.uid()` for user identification

  ### Data Protection
  - Cart items are private to each user
  - Soil tests and field scans are user-private
  - Orders are visible only to the ordering user
  - Products are publicly readable but admin-managed

  ## Important Notes
  - All primary keys use `gen_random_uuid()` for security
  - Timestamps default to `now()` for automatic tracking
  - Foreign keys have CASCADE deletes where appropriate
  - Enum-like text fields use CHECK constraints for validation
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'FARMER' CHECK (role IN ('FARMER', 'ADMIN')),
  avatar text,
  location text,
  total_acreage numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('Seeds', 'Fertilizers', 'Tools', 'Pesticides', 'Tech')),
  price numeric NOT NULL CHECK (price >= 0),
  description text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  stock_quantity integer DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by authenticated users"
  ON products FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'ADMIN'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'ADMIN'
    )
  );

-- =====================================================
-- CART ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into own cart"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from own cart"
  ON cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- SOIL TESTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS soil_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  nitrogen numeric NOT NULL CHECK (nitrogen >= 0),
  phosphorus numeric NOT NULL CHECK (phosphorus >= 0),
  potassium numeric NOT NULL CHECK (potassium >= 0),
  ph numeric NOT NULL CHECK (ph >= 0 AND ph <= 14),
  location text NOT NULL DEFAULT '',
  analysis_result text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE soil_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own soil tests"
  ON soil_tests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own soil tests"
  ON soil_tests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own soil tests"
  ON soil_tests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own soil tests"
  ON soil_tests FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- CROP PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS crop_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  season text NOT NULL CHECK (season IN ('Kharif', 'Rabi', 'Zaid', 'Annual')),
  duration_days integer CHECK (duration_days > 0),
  image text DEFAULT '',
  optimal_temp_min numeric,
  optimal_temp_max numeric,
  water_requirement text DEFAULT 'Moderate' CHECK (water_requirement IN ('Low', 'Moderate', 'High')),
  soil_types text[],
  common_pests text[],
  intelligence_data jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE crop_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Crop profiles are viewable by all authenticated users"
  ON crop_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage crop profiles"
  ON crop_profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'ADMIN'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'ADMIN'
    )
  );

-- =====================================================
-- PLANTING PLANS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS planting_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  crop_name text NOT NULL,
  soil_type text NOT NULL,
  weather_condition text NOT NULL,
  plan_data text,
  status text DEFAULT 'Draft' CHECK (status IN ('Draft', 'Active', 'Completed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE planting_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own planting plans"
  ON planting_plans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own planting plans"
  ON planting_plans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own planting plans"
  ON planting_plans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own planting plans"
  ON planting_plans FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- FIELD SCANS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS field_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  analysis_result text,
  risk_level text DEFAULT 'Low' CHECK (risk_level IN ('Low', 'Medium', 'High')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE field_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own field scans"
  ON field_scans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own field scans"
  ON field_scans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own field scans"
  ON field_scans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own field scans"
  ON field_scans FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  status text DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Completed', 'Cancelled')),
  shipping_address text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- ORDER ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity integer NOT NULL CHECK (quantity > 0),
  price_at_purchase numeric NOT NULL CHECK (price_at_purchase >= 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for own orders"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_soil_tests_user_id ON soil_tests(user_id);
CREATE INDEX IF NOT EXISTS idx_planting_plans_user_id ON planting_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_field_scans_user_id ON field_scans(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at 
  BEFORE UPDATE ON cart_items 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
