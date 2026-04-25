CREATE TABLE users (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT        UNIQUE NOT NULL,
  password_hash TEXT        NOT NULL,
  role          TEXT        CHECK (role IN ('college', 'club_manager', 'student', 'super_admin')) NOT NULL,
  name          TEXT,
  college_id    UUID        REFERENCES users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- colleges table (full, with new fields)
CREATE TABLE colleges (
  id                      UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  name                    TEXT    NOT NULL,
  domain                  TEXT    UNIQUE NOT NULL,
  email                   TEXT,
  phone                   TEXT,
  website                 TEXT,
  address                 TEXT,
  college_type            TEXT    CHECK (college_type IN ('government','private','autonomous')),
  reg_number              TEXT,
  accreditation           TEXT,
  university_affiliation  TEXT,
  year_established        INTEGER CHECK (year_established >= 1800 AND year_established <= 2100),
  status                  TEXT    DEFAULT 'pending',
  created_at              TIMESTAMP DEFAULT NOW()
);

CREATE TABLE college_documents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id  UUID REFERENCES colleges(id) ON DELETE CASCADE,
  file_path   TEXT
);

CREATE TABLE clubs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  description  TEXT,
  college_id   UUID REFERENCES users(id) NOT NULL,
  manager_id   UUID REFERENCES users(id) NOT NULL,
  requirements TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE applications (
  id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id   UUID    REFERENCES users(id) NOT NULL,
  club_id      UUID    REFERENCES clubs(id) NOT NULL,
  cv_path      TEXT    NOT NULL,
  ai_score     INTEGER,
  ai_feedback  TEXT,
  status       TEXT    DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  applied_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id      UUID REFERENCES clubs(id) NOT NULL,
  title        TEXT NOT NULL,
  description  TEXT,
  venue        TEXT,
  event_date   TIMESTAMPTZ NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event_registrations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      UUID REFERENCES events(id),
  student_id    UUID REFERENCES users(id),
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, student_id)
);

CREATE TABLE notifications (
  id         UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID    REFERENCES users(id),
  message    TEXT,
  is_read    BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE otp_table (
  id         SERIAL    PRIMARY KEY,
  email      TEXT,
  otp        TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);