
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  photoURL?: string | null;
  enrollmentId?: string; // For students
  teacherId?: string; // For teachers
  adminId?: string; // For admins
  class?: string; // For students
  subjects?: string[]; // For teachers
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Schedule types
export interface SchedulePeriod {
  time: string;
  subject: string;
  teacher?: string; // For student schedules
  class?: string; // For teacher schedules
  room: string;
}

export interface ScheduleDay {
  day: string;
  periods: SchedulePeriod[];
}

// Grade types
export interface Grade {
  term?: string;
  assessment: string;
  grade: number;
  maxGrade?: number;
}

export interface SubjectGrades {
  subject: string;
  teacher: string;
  grades: Grade[];
  average: number;
}

export interface StudentGradeRecord {
  id: string;
  name: string;
  grades: Grade[];
  average: number;
}

export interface ClassGrades {
  className: string;
  subject: string;
  students: StudentGradeRecord[];
}

// Announcement types
export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  important: boolean;
}
