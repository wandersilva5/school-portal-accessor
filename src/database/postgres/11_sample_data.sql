
-- Set search path
SET search_path TO school_portal, public;

-- Insert sample academic years, terms and schedule periods
INSERT INTO terms (id, name, start_date, end_date, academic_year)
VALUES
  ('11111111-1111-1111-1111-111111111111', '1º Bimestre', '2023-02-01', '2023-04-15', '2023-2024'),
  ('22222222-2222-2222-2222-222222222222', '2º Bimestre', '2023-04-16', '2023-06-30', '2023-2024'),
  ('33333333-3333-3333-3333-333333333333', '3º Bimestre', '2023-08-01', '2023-10-15', '2023-2024'),
  ('44444444-4444-4444-4444-444444444444', '4º Bimestre', '2023-10-16', '2023-12-20', '2023-2024');

INSERT INTO schedule_periods (id, name, start_time, end_time)
VALUES
  ('11111111-aaaa-1111-1111-111111111111', '1º Período', '07:30:00', '08:20:00'),
  ('22222222-aaaa-2222-2222-222222222222', '2º Período', '08:20:00', '09:10:00'),
  ('33333333-aaaa-3333-3333-333333333333', '3º Período', '09:10:00', '10:00:00'),
  ('44444444-aaaa-4444-4444-444444444444', 'Intervalo', '10:00:00', '10:20:00'),
  ('55555555-aaaa-5555-5555-555555555555', '4º Período', '10:20:00', '11:10:00'),
  ('66666666-aaaa-6666-6666-666666666666', '5º Período', '11:10:00', '12:00:00');

-- Insert users
INSERT INTO users (id, name, email, password_hash, role, photo_url)
VALUES
  ('11111111-2222-3333-4444-555555555555', 'João Silva', 'aluno@escola.com', '$2a$10$xPPCItSXTGXGBBIJYSHReeK5RhRyUL7qJGXdnZWUTQggR9hNjcYMm', 'student', NULL), -- password: senha123
  ('22222222-3333-4444-5555-666666666666', 'Maria Oliveira', 'professor@escola.com', '$2a$10$xPPCItSXTGXGBBIJYSHReeK5RhRyUL7qJGXdnZWUTQggR9hNjcYMm', 'teacher', NULL),
  ('33333333-4444-5555-6666-777777777777', 'Carlos Souza', 'diretor@escola.com', '$2a$10$xPPCItSXTGXGBBIJYSHReeK5RhRyUL7qJGXdnZWUTQggR9hNjcYMm', 'admin', NULL),
  ('44444444-5555-6666-7777-888888888888', 'Ana Pereira', 'responsavel@escola.com', '$2a$10$xPPCItSXTGXGBBIJYSHReeK5RhRyUL7qJGXdnZWUTQggR9hNjcYMm', 'guardian', NULL),
  ('55555555-6666-7777-8888-999999999999', 'Maria Silva', 'aluno2@escola.com', '$2a$10$xPPCItSXTGXGBBIJYSHReeK5RhRyUL7qJGXdnZWUTQggR9hNjcYMm', 'student', NULL),
  ('66666666-7777-8888-9999-aaaaaaaaaaaa', 'Pedro Santos', 'professor2@escola.com', '$2a$10$xPPCItSXTGXGBBIJYSHReeK5RhRyUL7qJGXdnZWUTQggR9hNjcYMm', 'teacher', NULL);

-- Insert classes
INSERT INTO classes (id, name, grade_level, academic_year)
VALUES
  ('aaaaaaaa-1111-1111-1111-111111111111', '9º Ano A', '9', '2023-2024'),
  ('bbbbbbbb-2222-2222-2222-222222222222', '7º Ano B', '7', '2023-2024'),
  ('cccccccc-3333-3333-3333-333333333333', '8º Ano C', '8', '2023-2024');

-- Insert student profiles
INSERT INTO students (id, user_id, enrollment_id, class_id)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-2222-3333-4444-555555555555', '20230001', 'aaaaaaaa-1111-1111-1111-111111111111'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '55555555-6666-7777-8888-999999999999', '20230005', 'bbbbbbbb-2222-2222-2222-222222222222');

-- Insert teacher profiles
INSERT INTO teachers (id, user_id, teacher_id)
VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-3333-4444-5555-666666666666', 'T20230001'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '66666666-7777-8888-9999-aaaaaaaaaaaa', 'T20230002');

-- Insert admin profile
INSERT INTO administrators (id, user_id, admin_id)
VALUES
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-4444-5555-6666-777777777777', 'A20230001');

-- Insert guardian profile
INSERT INTO guardians (id, user_id, guardian_id)
VALUES
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '44444444-5555-6666-7777-888888888888', 'G20230001');

-- Insert guardian-student relationships
INSERT INTO guardian_students (guardian_id, student_id, relationship, is_primary)
VALUES
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mãe', true),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Mãe', true);

-- Insert subjects
INSERT INTO subjects (id, name, code, description)
VALUES
  ('aaaaaaaa-2222-2222-2222-222222222222', 'Matemática', 'MAT', 'Matemática básica e avançada'),
  ('bbbbbbbb-3333-3333-3333-333333333333', 'Português', 'PORT', 'Língua portuguesa e literatura'),
  ('cccccccc-4444-4444-4444-444444444444', 'Ciências', 'CIEN', 'Ciências naturais'),
  ('dddddddd-5555-5555-5555-555555555555', 'História', 'HIST', 'História geral e do Brasil'),
  ('eeeeeeee-6666-6666-6666-666666666666', 'Geografia', 'GEO', 'Geografia geral e do Brasil'),
  ('ffffffff-7777-7777-7777-777777777777', 'Física', 'FIS', 'Física básica');

-- Insert teacher-subject relationships
INSERT INTO teacher_subjects (teacher_id, subject_id)
VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-2222-2222-2222-222222222222'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'ffffffff-7777-7777-7777-777777777777'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'bbbbbbbb-3333-3333-3333-333333333333'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'cccccccc-4444-4444-4444-444444444444');

-- Insert rooms
INSERT INTO rooms (id, name, type, capacity, building, floor)
VALUES
  ('aaaaaaaa-3333-3333-3333-333333333333', 'Sala 101', 'classroom', 30, 'Bloco A', '1'),
  ('bbbbbbbb-4444-4444-4444-444444444444', 'Sala 102', 'classroom', 30, 'Bloco A', '1'),
  ('cccccccc-5555-5555-5555-555555555555', 'Laboratório Ciências', 'laboratory', 25, 'Bloco B', '2'),
  ('dddddddd-6666-6666-6666-666666666666', 'Sala 201', 'classroom', 30, 'Bloco A', '2');

-- Insert class schedules
INSERT INTO class_schedules (class_id, subject_id, teacher_id, room_id, period_id, day_of_week, term_id)
VALUES
  ('aaaaaaaa-1111-1111-1111-111111111111', 'aaaaaaaa-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-3333-3333-3333-333333333333', '11111111-aaaa-1111-1111-111111111111', 1, '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-1111-1111-1111-111111111111', 'bbbbbbbb-3333-3333-3333-333333333333', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-3333-3333-3333-333333333333', '22222222-aaaa-2222-2222-222222222222', 1, '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-1111-1111-1111-111111111111', 'cccccccc-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'cccccccc-5555-5555-5555-555555555555', '33333333-aaaa-3333-3333-333333333333', 1, '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-1111-1111-1111-111111111111', 'aaaaaaaa-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-3333-3333-3333-333333333333', '55555555-aaaa-5555-5555-555555555555', 2, '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-2222-2222-2222-222222222222', 'bbbbbbbb-3333-3333-3333-333333333333', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'bbbbbbbb-4444-4444-4444-444444444444', '11111111-aaaa-1111-1111-111111111111', 1, '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-2222-2222-2222-222222222222', 'aaaaaaaa-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-4444-4444-4444-444444444444', '22222222-aaaa-2222-2222-222222222222', 1, '11111111-1111-1111-1111-111111111111');

-- Insert assessment types
INSERT INTO assessment_types (id, name, weight)
VALUES
  ('aaaaaaaa-4444-4444-4444-444444444444', 'Prova', 0.7),
  ('bbbbbbbb-5555-5555-5555-555555555555', 'Trabalho', 0.2),
  ('cccccccc-6666-6666-6666-666666666666', 'Participação', 0.1);

-- Insert assessments
INSERT INTO assessments (id, title, description, subject_id, class_id, teacher_id, assessment_type_id, term_id, max_grade, date)
VALUES
  ('aaaaaaaa-5555-5555-5555-555555555555', 'Prova 1 de Matemática', 'Primeira prova de matemática', 'aaaaaaaa-2222-2222-2222-222222222222', 'aaaaaaaa-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 10.0, '2023-03-15'),
  ('bbbbbbbb-6666-6666-6666-666666666666', 'Trabalho de Português', 'Trabalho sobre literatura brasileira', 'bbbbbbbb-3333-3333-3333-333333333333', 'aaaaaaaa-1111-1111-1111-111111111111', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'bbbbbbbb-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 10.0, '2023-03-20'),
  ('cccccccc-7777-7777-7777-777777777777', 'Prova 2 de Matemática', 'Segunda prova de matemática', 'aaaaaaaa-2222-2222-2222-222222222222', 'aaaaaaaa-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 10.0, '2023-05-10'),
  ('dddddddd-8888-8888-8888-888888888888', 'Prova de Português', 'Prova sobre gramática', 'bbbbbbbb-3333-3333-3333-333333333333', 'bbbbbbbb-2222-2222-2222-222222222222', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 10.0, '2023-03-18');

-- Insert student grades
INSERT INTO student_grades (student_id, assessment_id, grade, comments, graded_by)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-5555-5555-5555-555555555555', 8.5, 'Bom desempenho', '22222222-3333-4444-5555-666666666666'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-6666-6666-6666-666666666666', 9.0, 'Excelente trabalho', '66666666-7777-8888-9999-aaaaaaaaaaaa'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-7777-7777-7777-777777777777', 7.5, 'Precisa melhorar em alguns pontos', '22222222-3333-4444-5555-666666666666'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'dddddddd-8888-8888-8888-888888888888', 8.0, 'Bom trabalho', '66666666-7777-8888-9999-aaaaaaaaaaaa');

-- Insert attendance records
INSERT INTO attendance_records (student_id, class_schedule_id, date, status, minutes_late, notes, recorded_by)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '1', '2023-03-01', 'present', 0, NULL, '22222222-3333-4444-5555-666666666666'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '1', '2023-03-08', 'late', 10, 'Chegou atrasado', '22222222-3333-4444-5555-666666666666'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '1', '2023-03-15', 'absent', 0, NULL, '22222222-3333-4444-5555-666666666666'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '5', '2023-03-01', 'present', 0, NULL, '66666666-7777-8888-9999-aaaaaaaaaaaa'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '5', '2023-03-08', 'present', 0, NULL, '66666666-7777-8888-9999-aaaaaaaaaaaa');

-- Insert absence justifications
INSERT INTO absence_justifications (attendance_id, justification, document_url, status, submitted_by, reviewed_by, review_date)
VALUES
  ('3', 'Atestado médico', 'https://example.com/documents/attest123.pdf', 'approved', '44444444-5555-6666-7777-888888888888', '33333333-4444-5555-6666-777777777777', '2023-03-16');

-- Insert tags
INSERT INTO tags (id, name)
VALUES
  ('aaaaaaaa-7777-7777-7777-777777777777', 'Importante'),
  ('bbbbbbbb-8888-8888-8888-888888888888', 'Evento'),
  ('cccccccc-9999-9999-9999-999999999999', 'Prova'),
  ('dddddddd-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Feriado');

-- Insert announcements
INSERT INTO announcements (id, title, content, author_id, is_important, publish_date, expiry_date)
VALUES
  ('aaaaaaaa-8888-8888-8888-888888888888', 'Reunião de Pais e Mestres', 'Prezados pais e responsáveis, convidamos para a reunião de pais e mestres que acontecerá no dia 15/04/2023 às 19h.', '33333333-4444-5555-6666-777777777777', true, '2023-04-01', '2023-04-16'),
  ('bbbbbbbb-9999-9999-9999-999999999999', 'Semana de Provas', 'Informamos que a semana de provas do 1º bimestre acontecerá de 10/04 a 14/04.', '33333333-4444-5555-6666-777777777777', false, '2023-03-20', '2023-04-15'),
  ('cccccccc-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Festa Junina', 'A Festa Junina da escola acontecerá no dia 24/06/2023. Contamos com a presença de todos!', '33333333-4444-5555-6666-777777777777', false, '2023-05-15', '2023-06-25');

-- Insert announcement tags
INSERT INTO announcement_tags (announcement_id, tag_id)
VALUES
  ('aaaaaaaa-8888-8888-8888-888888888888', 'aaaaaaaa-7777-7777-7777-777777777777'),
  ('aaaaaaaa-8888-8888-8888-888888888888', 'bbbbbbbb-8888-8888-8888-888888888888'),
  ('bbbbbbbb-9999-9999-9999-999999999999', 'cccccccc-9999-9999-9999-999999999999'),
  ('cccccccc-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-8888-8888-8888-888888888888');

-- Insert announcement audiences
INSERT INTO announcement_audiences (announcement_id, audience_type, class_id)
VALUES
  ('aaaaaaaa-8888-8888-8888-888888888888', 'all', NULL),
  ('bbbbbbbb-9999-9999-9999-999999999999', 'class', 'aaaaaaaa-1111-1111-1111-111111111111'),
  ('cccccccc-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'all', NULL);

-- Insert payment categories
INSERT INTO payment_categories (id, name, description)
VALUES
  ('aaaaaaaa-9999-9999-9999-999999999999', 'Mensalidade', 'Mensalidade escolar regular'),
  ('bbbbbbbb-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Material Didático', 'Pagamento de material didático'),
  ('cccccccc-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Excursão', 'Pagamento de excursões escolares');

-- Insert financial records
INSERT INTO financial_records (student_id, description, amount, category_id, due_date, status, payment_date, payment_method, reference_number, notes, created_by)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mensalidade Março 2023', 1200.00, 'aaaaaaaa-9999-9999-9999-999999999999', '2023-03-10', 'paid', '2023-03-09', 'Cartão de Crédito', 'TXN123456', NULL, '33333333-4444-5555-6666-777777777777'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mensalidade Abril 2023', 1200.00, 'aaaaaaaa-9999-9999-9999-999999999999', '2023-04-10', 'pending', NULL, NULL, NULL, NULL, '33333333-4444-5555-6666-777777777777'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Material Didático 2023', 500.00, 'bbbbbbbb-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2023-02-15', 'paid', '2023-02-14', 'Boleto Bancário', 'TXN123457', NULL, '33333333-4444-5555-6666-777777777777'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Mensalidade Março 2023', 1000.00, 'aaaaaaaa-9999-9999-9999-999999999999', '2023-03-10', 'paid', '2023-03-08', 'Débito Automático', 'TXN123458', NULL, '33333333-4444-5555-6666-777777777777'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Excursão Zoológico', 150.00, 'cccccccc-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2023-04-20', 'paid', '2023-04-15', 'Pix', 'TXN123459', NULL, '33333333-4444-5555-6666-777777777777');

-- Insert payment receipts
INSERT INTO payment_receipts (financial_record_id, receipt_number, issue_date, payment_amount, file_url)
VALUES
  ('1', 'RCT-2023-001', '2023-03-09', 1200.00, 'https://example.com/receipts/rct001.pdf'),
  ('3', 'RCT-2023-002', '2023-02-14', 500.00, 'https://example.com/receipts/rct002.pdf'),
  ('4', 'RCT-2023-003', '2023-03-08', 1000.00, 'https://example.com/receipts/rct003.pdf'),
  ('5', 'RCT-2023-004', '2023-04-15', 150.00, 'https://example.com/receipts/rct004.pdf');

-- Insert messages
INSERT INTO messages (id, subject, content, sender_id, parent_id)
VALUES
  ('aaaaaaaa-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Recuperação de Matemática', 'Prezado responsável, informamos que seu filho(a) precisará fazer recuperação em Matemática.', '22222222-3333-4444-5555-666666666666', NULL),
  ('bbbbbbbb-cccc-cccc-cccc-cccccccccccc', 'RE: Recuperação de Matemática', 'Compreendido. Vamos reforçar os estudos em casa.', '44444444-5555-6666-7777-888888888888', 'aaaaaaaa-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  ('cccccccc-dddd-dddd-dddd-dddddddddddd', 'Lembrete de Trabalho', 'Não esqueça de entregar o trabalho de Português até sexta-feira.', '66666666-7777-8888-9999-aaaaaaaaaaaa', NULL);

-- Insert message recipients
INSERT INTO message_recipients (message_id, recipient_id, read_at)
VALUES
  ('aaaaaaaa-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-5555-6666-7777-888888888888', '2023-03-25 15:30:00'),
  ('bbbbbbbb-cccc-cccc-cccc-cccccccccccc', '22222222-3333-4444-5555-666666666666', '2023-03-26 08:45:00'),
  ('cccccccc-dddd-dddd-dddd-dddddddddddd', '11111111-2222-3333-4444-555555555555', NULL);

-- Insert notifications
INSERT INTO notifications (user_id, title, message, type, reference_id, reference_type)
VALUES
  ('11111111-2222-3333-4444-555555555555', 'Nova Mensagem', 'Você recebeu uma nova mensagem do professor de Português', 'message', 'cccccccc-dddd-dddd-dddd-dddddddddddd', 'message'),
  ('11111111-2222-3333-4444-555555555555', 'Nota Lançada', 'Sua nota de Matemática foi lançada', 'grade', 'aaaaaaaa-5555-5555-5555-555555555555', 'assessment'),
  ('44444444-5555-6666-7777-888888888888', 'Pagamento Pendente', 'Lembrete de pagamento da mensalidade de Abril', 'financial', '2', 'financial_record');

-- Insert school calendar events
INSERT INTO school_calendar (title, start_date, end_date, event_type, description)
VALUES
  ('Início do Ano Letivo', '2023-02-01', '2023-02-01', 'academic', 'Primeiro dia de aula do ano letivo 2023'),
  ('Feriado - Carnaval', '2023-02-20', '2023-02-21', 'holiday', 'Feriado de Carnaval'),
  ('Semana de Provas - 1º Bimestre', '2023-04-10', '2023-04-14', 'exam', 'Semana de avaliações do 1º bimestre'),
  ('Reunião de Pais', '2023-04-15', '2023-04-15', 'meeting', 'Reunião de pais e mestres do 1º bimestre'),
  ('Recesso Escolar', '2023-07-10', '2023-07-21', 'vacation', 'Recesso escolar de inverno');

-- Insert system settings
INSERT INTO system_settings (key, value, data_type, description, updated_by)
VALUES
  ('school_name', 'Escola Modelo', 'string', 'Nome da escola', '33333333-4444-5555-6666-777777777777'),
  ('academic_year', '2023-2024', 'string', 'Ano letivo atual', '33333333-4444-5555-6666-777777777777'),
  ('allow_grade_changes', 'true', 'boolean', 'Permitir alterações de notas após lançamento', '33333333-4444-5555-6666-777777777777'),
  ('attendance_cutoff_time', '08:15:00', 'time', 'Horário limite para considerar atraso', '33333333-4444-5555-6666-777777777777'),
  ('minimum_passing_grade', '6.0', 'decimal', 'Nota mínima para aprovação', '33333333-4444-5555-6666-777777777777');

-- Insert audit logs
INSERT INTO audit_logs (user_id, action, entity, entity_id, details, ip_address)
VALUES
  ('33333333-4444-5555-6666-777777777777', 'create', 'user', '11111111-2222-3333-4444-555555555555', '{"role": "student"}', '192.168.1.100'),
  ('33333333-4444-5555-6666-777777777777', 'update', 'system_setting', NULL, '{"key": "academic_year", "old_value": "2022-2023", "new_value": "2023-2024"}', '192.168.1.100'),
  ('22222222-3333-4444-5555-666666666666', 'create', 'grade', NULL, '{"student_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "assessment_id": "aaaaaaaa-5555-5555-5555-555555555555"}', '192.168.1.101');
