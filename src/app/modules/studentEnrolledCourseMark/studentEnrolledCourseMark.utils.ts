import { Course, StudentEnrollerdCourse } from '@prisma/client';

const getGradeForMarks = (marks: number) => {
  let result = {
    grade: '',
    point: 0,
  };

  if (marks >= 0 && marks <= 39) {
    result = {
      grade: 'F',
      point: 1.5,
    };
  } else if (marks >= 40 && marks <= 49) {
    result = {
      grade: 'D',
      point: 2.0,
    };
  } else if (marks >= 51 && marks <= 59) {
    result = {
      grade: 'C',
      point: 2.5,
    };
  } else if (marks >= 61 && marks <= 69) {
    result = {
      grade: 'B',
      point: 3.0,
    };
  } else if (marks >= 71 && marks <= 79) {
    result = {
      grade: 'B+',
      point: 3.5,
    };
  } else if (marks >= 80 && marks <= 100) {
    result = {
      grade: 'A+',
      point: 4.0,
    };
  }

  return result;
};

// calculation of cgpa and grade

const calcCGPAandGrade = async (
  payload: (StudentEnrollerdCourse & { course: Course })[]
) => {
  if (payload.length === 0) {
    return {
      totalCompletedCredit: 0,
      cgpa: 0,
    };
  }

  let totalCredit = 0;
  let totalCGPA = 0;

  for (const grade of payload) {
    totalCGPA = grade.point || 0;
    totalCredit = grade.course.credits || 0;
  }

  const avgCGPA = Number((totalCGPA / payload.length).toFixed(2));

  return {
    totalCompletedCredit: totalCredit,
    cgpa: avgCGPA,
  };
};

export const getGradeForMarksUtils = {
  getGradeForMarks,
  calcCGPAandGrade,
};
