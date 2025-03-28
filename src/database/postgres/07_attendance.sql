
-- Attendance records
CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_schedule_id UUID NOT NULL REFERENCES class_schedules(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
  minutes_late INTEGER,
  notes TEXT,
  recorded_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, class_schedule_id, date)
);

-- Absence justifications
CREATE TABLE IF NOT EXISTS absence_justifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attendance_id UUID NOT NULL REFERENCES attendance_records(id) ON DELETE CASCADE,
  justification TEXT NOT NULL,
  document_url VARCHAR(255),
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  reviewed_by UUID REFERENCES users(id) ON DELETE RESTRICT,
  review_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
