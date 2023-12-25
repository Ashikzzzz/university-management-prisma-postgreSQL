export type IStudentEnrolledCourseMarkFilterRequest = {
  searchTerm?: string | undefined;
  academicSemesterId?: string | undefined;
  studentId?: string | undefined;
  studentEnrolledCourseId?: string | undefined;
  courseId?: string | undefined;
};

export const studentEnrolledCourseMarkFilterableFields: string[] = [
  'academicSemesterId',
  'studentId',
  'studentEnrolledCourseId',
  'examType',
  'courseId',
];
