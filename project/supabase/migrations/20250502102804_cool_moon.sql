/*
  # Initial Schema Setup

  1. New Tables
    - users (extends Supabase auth.users)
      - id (uuid, references auth.users)
      - full_name (text)
      - avatar_url (text)
      - is_host (boolean)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - properties
      - id (uuid)
      - host_id (uuid, references users)
      - title (text)
      - description (text)
      - type (text)
      - price_per_night (integer)
      - location (text)
      - city (text)
      - state (text)
      - country (text)
      - lat (float)
      - lng (float)
      - max_guests (integer)
      - bedrooms (integer)
      - beds (integer)
      - baths (integer)
      - instant_book (boolean)
      - created_at (timestamp)
      - updated_at (timestamp)

    - property_images
      - id (uuid)
      - property_id (uuid, references properties)
      - url (text)
      - alt (text)
      - is_primary (boolean)
      - created_at (timestamp)

    - property_amenities
      - id (uuid)
      - property_id (uuid, references properties)
      - name (text)
      - icon (text)
      - category (text)
      - created_at (timestamp)

    - bookings
      - id (uuid)
      - property_id (uuid, references properties)
      - user_id (uuid, references users)
      - check_in (date)
      - check_out (date)
      - guests (integer)
      - total_price (integer)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

    - reviews
      - id (uuid)
      - property_id (uuid, references properties)
      - user_id (uuid, references users)
      - rating (integer)
      - comment (text)
      - created_at (timestamp)

    - wishlists
      - id (uuid)
      - user_id (uuid, references users)
      - property_id (uuid, references properties)
      - created_at (timestamp)

    - messages
      - id (uuid)
      - sender_id (uuid, references users)
      - receiver_id (uuid, references users)
      - property_id (uuid, references properties)
      - content (text)
      - read (boolean)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for property owners/hosts
*/

-- Create users table extending auth.users
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  full_name TEXT,
  avatar_url TEXT,
  is_host BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  price_per_night INTEGER NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  max_guests INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  beds INTEGER NOT NULL,
  baths INTEGER NOT NULL,
  instant_book BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create property_images table
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  alt TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create property_amenities table
CREATE TABLE property_amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create wishlists table
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users NOT NULL,
  property_id UUID REFERENCES properties ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Create messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users NOT NULL,
  receiver_id UUID REFERENCES users NOT NULL,
  property_id UUID REFERENCES properties ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Properties policies
CREATE POLICY "Anyone can view properties"
  ON properties FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Hosts can insert properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = host_id AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND is_host = true
  ));

CREATE POLICY "Hosts can update their own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = host_id);

-- Property images policies
CREATE POLICY "Anyone can view property images"
  ON property_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Hosts can manage their property images"
  ON property_images FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE id = property_id AND host_id = auth.uid()
    )
  );

-- Property amenities policies
CREATE POLICY "Anyone can view property amenities"
  ON property_amenities FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Hosts can manage their property amenities"
  ON property_amenities FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE id = property_id AND host_id = auth.uid()
    )
  );

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM properties
    WHERE id = property_id AND host_id = auth.uid()
  ));

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND EXISTS (
    SELECT 1 FROM bookings
    WHERE property_id = reviews.property_id
    AND user_id = auth.uid()
    AND status = 'completed'
  ));

-- Wishlists policies
CREATE POLICY "Users can manage their wishlists"
  ON wishlists FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Create functions and triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_properties_host_id ON properties(host_id);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_property_images_property_id ON property_images(property_id);
CREATE INDEX idx_property_amenities_property_id ON property_amenities(property_id);
CREATE INDEX idx_bookings_property_id ON bookings(property_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_reviews_property_id ON reviews(property_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX idx_wishlists_property_id ON wishlists(property_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);