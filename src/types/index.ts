
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'guardian' | 'secretary';
  photoURL?: string | null;
  enrollmentId?: string; // For students
  teacherId?: string; // For teachers
  adminId?: string; // For admins and secretaries
  guardianId?: string; // For guardians
  department?: string; // For secretaries
  class?: string; // For students
  subjects?: string[]; // For teachers
  children?: string[]; // IDs of children for guardians
  childrenData?: StudentData[]; // Details of children for guardians
}

export interface StudentData {
  id: string;
  name: string;
  class: string;
  enrollmentId: string;
  photoURL: string | null;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  important: boolean;
  tags: string[]; // Added tags property which was missing
}

export interface SubjectGrades {
  subject: string;
  teacher: string;
  grades: {
    evaluation: string;
    grade: number;
    weight: number;
    date: string;
    term: string; // Added term
    assessment: string; // Added assessment
    maxGrade: number; // Added maxGrade
  }[];
  average: number;
}

export interface SchedulePeriod {
  subject: string;
  teacher: string;
  class?: string;
  time: string;
  room: string;
}

export interface ScheduleDay {
  day: string;
  periods: SchedulePeriod[];
}

export interface FinancialRecord {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
}
