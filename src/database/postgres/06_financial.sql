
-- Payment categories
CREATE TABLE IF NOT EXISTS payment_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Financial records
CREATE TABLE IF NOT EXISTS financial_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  description VARCHAR(200) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES payment_categories(id) ON DELETE SET NULL,
  due_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('paid', 'pending', 'overdue', 'canceled')),
  payment_date DATE,
  payment_method VARCHAR(50),
  reference_number VARCHAR(100),
  notes TEXT,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payment receipts
CREATE TABLE IF NOT EXISTS payment_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  financial_record_id UUID NOT NULL REFERENCES financial_records(id) ON DELETE CASCADE,
  receipt_number VARCHAR(100) NOT NULL UNIQUE,
  issue_date DATE NOT NULL,
  payment_amount DECIMAL(10,2) NOT NULL,
  file_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
