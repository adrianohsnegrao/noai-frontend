/*
  # Add Likes and Comments to NOAI

  1. New Tables
    - `post_likes`
      - `id` (uuid, primary key)
      - `post_id` (text, references posts)
      - `user_id` (text, references users)
      - `created_at` (timestamptz)
    
    - `post_comments`
      - `id` (uuid, primary key)
      - `post_id` (text, references posts)
      - `user_id` (text, references users)
      - `content` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Users can read all likes and comments
    - Users can create/delete their own likes
    - Users can create/delete their own comments
    - Users cannot modify others' likes or comments

  3. Indexes
    - Index on post_id for both tables for fast lookups
    - Unique constraint on (post_id, user_id) for likes to prevent duplicates
*/

-- Create post_likes table
CREATE TABLE IF NOT EXISTS post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id text NOT NULL,
  user_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Create post_comments table
CREATE TABLE IF NOT EXISTS post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id text NOT NULL,
  user_id text NOT NULL,
  user_name text NOT NULL,
  user_avatar text,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON post_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_created_at ON post_comments(created_at DESC);

-- Enable RLS
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for post_likes

-- Anyone can view likes
CREATE POLICY "Anyone can view likes"
  ON post_likes
  FOR SELECT
  TO public
  USING (true);

-- Authenticated users can create their own likes
CREATE POLICY "Users can create own likes"
  ON post_likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

-- Users can delete their own likes
CREATE POLICY "Users can delete own likes"
  ON post_likes
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);

-- RLS Policies for post_comments

-- Anyone can view comments
CREATE POLICY "Anyone can view comments"
  ON post_comments
  FOR SELECT
  TO public
  USING (true);

-- Authenticated users can create comments
CREATE POLICY "Users can create comments"
  ON post_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments"
  ON post_comments
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Users can update their own comments
CREATE POLICY "Users can update own comments"
  ON post_comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);