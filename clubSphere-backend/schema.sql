CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT CHECK (role IN ('super_admin', 'college', 'club_manager', 'student')) NOT NULL,
  name TEXT,
  college_id UUID REFERENCES colleges(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  college_id UUID REFERENCES users(id) NOT NULL,
  manager_id UUID REFERENCES users(id) NOT NULL,
  requirements TEXT,     -- plain text or JSON describing what AI should look for
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES users(id) NOT NULL,
  club_id UUID REFERENCES clubs(id) NOT NULL,
  cv_path TEXT NOT NULL,
  ai_score INTEGER,
  ai_feedback TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID REFERENCES clubs(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  venue TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id),
  student_id UUID REFERENCES users(id),
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, student_id)
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- colleges table
CREATE TABLE colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT UNIQUE NOT NULL,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- documents
CREATE TABLE college_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID REFERENCES colleges(id),
  file_path TEXT
);

-- OTP table
CREATE TABLE otp_table (
  id SERIAL PRIMARY KEY,
  email TEXT,
  otp TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (email, password, role, college_id)
VALUES ($1,$2,$3,$4)

ALTER TABLE otp_table
ADD COLUMN expires_at TIMESTAMP;