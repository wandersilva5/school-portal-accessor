
-- Tags
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  is_important BOOLEAN DEFAULT FALSE,
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expiry_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Announcement tags
CREATE TABLE IF NOT EXISTS announcement_tags (
  announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (announcement_id, tag_id)
);

-- Announcement target audiences
CREATE TABLE IF NOT EXISTS announcement_audiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  audience_type VARCHAR(20) NOT NULL CHECK (audience_type IN ('all', 'students', 'teachers', 'guardians', 'admin', 'class')),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CHECK (
    (audience_type = 'class' AND class_id IS NOT NULL) OR
    (audience_type != 'class' AND class_id IS NULL)
  )
);
