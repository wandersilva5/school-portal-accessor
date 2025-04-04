
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
