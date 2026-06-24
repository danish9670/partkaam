-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL CHECK(role IN ('student', 'employer', 'admin')),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  city TEXT,
  avatar_url TEXT,
  is_verified INTEGER DEFAULT 0,
  is_banned INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Student profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
  user_id TEXT PRIMARY KEY,
  college TEXT,
  degree TEXT,
  graduation_year INTEGER,
  skills TEXT DEFAULT '[]',
  bio TEXT,
  resume_url TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Employer profiles table
CREATE TABLE IF NOT EXISTS employer_profiles (
  user_id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  company_description TEXT,
  website TEXT,
  logo_url TEXT,
  is_approved INTEGER DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  employer_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  job_type TEXT CHECK(job_type IN ('remote', 'on-site', 'hybrid')),
  city TEXT,
  pay_amount REAL,
  pay_type TEXT CHECK(pay_type IN ('hourly', 'monthly', 'per-task')),
  hours_per_week INTEGER,
  status TEXT DEFAULT 'active' CHECK(status IN ('pending', 'active', 'closed', 'rejected')),
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT,
  FOREIGN KEY (employer_id) REFERENCES users(id)
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  resume_url TEXT,
  status TEXT DEFAULT 'applied' CHECK(status IN ('applied', 'reviewing', 'shortlisted', 'rejected', 'hired')),
  applied_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(job_id, student_id),
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  content TEXT NOT NULL,
  sent_at TEXT DEFAULT (datetime('now')),
  is_read INTEGER DEFAULT 0,
  FOREIGN KEY (sender_id) REFERENCES users(id)
);

-- Salary records table
CREATE TABLE IF NOT EXISTS salary_records (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  employer_id TEXT NOT NULL,
  amount REAL NOT NULL,
  month TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'paid', 'overdue')),
  due_date TEXT,
  paid_date TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (employer_id) REFERENCES users(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_jobs_city_status ON jobs(city, status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category, status);
CREATE INDEX IF NOT EXISTS idx_apps_student ON applications(student_id);
CREATE INDEX IF NOT EXISTS idx_apps_job ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_salary_student ON salary_records(student_id);