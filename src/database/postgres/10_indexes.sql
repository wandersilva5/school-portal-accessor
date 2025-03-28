
-- Create indexes for better query performance

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Students indexes
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_enrollment_id ON students(enrollment_id);
CREATE INDEX idx_students_class_id ON students(class_id);

-- Guardians indexes
CREATE INDEX idx_guardian_students_guardian_id ON guardian_students(guardian_id);
CREATE INDEX idx_guardian_students_student_id ON guardian_students(student_id);

-- Class schedules indexes
CREATE INDEX idx_class_schedules_class_id ON class_schedules(class_id);
CREATE INDEX idx_class_schedules_teacher_id ON class_schedules(teacher_id);
CREATE INDEX idx_class_schedules_subject_id ON class_schedules(subject_id);
CREATE INDEX idx_class_schedules_day_period ON class_schedules(day_of_week, period_id);

-- Grades indexes
CREATE INDEX idx_student_grades_student_id ON student_grades(student_id);
CREATE INDEX idx_student_grades_assessment_id ON student_grades(assessment_id);
CREATE INDEX idx_assessments_class_id ON assessments(class_id);
CREATE INDEX idx_assessments_subject_id ON assessments(subject_id);
CREATE INDEX idx_assessments_term_id ON assessments(term_id);

-- Attendance indexes
CREATE INDEX idx_attendance_student_id ON attendance_records(student_id);
CREATE INDEX idx_attendance_date ON attendance_records(date);
CREATE INDEX idx_attendance_status ON attendance_records(status);

-- Announcements indexes
CREATE INDEX idx_announcements_author_id ON announcements(author_id);
CREATE INDEX idx_announcements_publish_date ON announcements(publish_date);
CREATE INDEX idx_announcements_important ON announcements(is_important);

-- Financial records indexes
CREATE INDEX idx_financial_student_id ON financial_records(student_id);
CREATE INDEX idx_financial_status ON financial_records(status);
CREATE INDEX idx_financial_due_date ON financial_records(due_date);

-- Messages indexes
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_message_recipients_recipient_id ON message_recipients(recipient_id);
CREATE INDEX idx_message_recipients_read ON message_recipients(read_at);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
