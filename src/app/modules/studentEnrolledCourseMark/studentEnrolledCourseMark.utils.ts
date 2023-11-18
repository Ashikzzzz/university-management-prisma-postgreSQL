const getGradeForMarks = (marks: number) => {
  let result = {
    grade: '',
  };

  if (marks >= 0 && marks <= 39) {
    result = {
      grade: 'F',
    };
  } else if (marks >= 40 && marks <= 49) {
    result = {
      grade: 'D',
    };
  } else if (marks >= 51 && marks <= 59) {
    result = {
      grade: 'C',
    };
  } else if (marks >= 61 && marks <= 69) {
    result = {
      grade: 'B',
    };
  } else if (marks >= 71 && marks <= 79) {
    result = {
      grade: 'B+',
    };
  } else if (marks >= 80 && marks <= 100) {
    result = {
      grade: 'A+',
    };
  }

  return result;
};

export const getGradeForMarksUtils = {
  getGradeForMarks,
};
