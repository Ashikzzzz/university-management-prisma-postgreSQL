export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourse: {
    courseId: string;
    isDeleted: null;
  }[];
};

export type ICourseFilter = {
  searchTerm?: string;
};
