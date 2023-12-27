const getAvaiableCourse = async (
  offeredCourses: any,
  completedCourses: any,
  studentCurrentSemesterCourses: any
) => {
  const completeCourseId = completedCourses.map(
    (course: any) => course.courseId
  );

  const availableCoursesList = offeredCourses.filter(
    (offeredCourse: any) =>
      !completeCourseId
        .includes(offeredCourse.courseId)
        .filter((course: any) => {
          const preRequisites = course.course.preRequisite;
          if (preRequisites.length === 0) {
            return true;
          } else {
            const preRequisiteIds = preRequisites.map(
              (preRequisite: any) => preRequisite.preRequisiteId
            );
            return preRequisiteIds.every((id: string) =>
              completeCourseId.includes(id)
            );
          }
        })
        .map((course: any) => {
          const isAlreadyTakenCourse = studentCurrentSemesterCourses.find(
            (c: any) => c.offeredCourseId === course.id
          );
          if (isAlreadyTakenCourse) {
            course.offeredCourseSections.map((section: any) => {
              if (section.id === isAlreadyTakenCourse.offeredCourseSectionId) {
                section.isTaken = true;
              } else {
                section.isTaken = false;
              }
            });
            return {
              ...course,
              isTaken: true,
            };
          } else {
            course.offeredCourseSections.map((section: any) => {
              section.isTaken = false;
            });
            return {
              ...course,
              isTaken: false,
            };
          }
        })
  );
  return availableCoursesList;
};

export const semesterRegistrationUtils = {
  getAvaiableCourse,
};
