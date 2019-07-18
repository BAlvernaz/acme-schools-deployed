export const popularHelper = (students, schools) => {
  students.map(student => {
    if (!student.schoolId) {
      return null;
    }
    if (!student.schoolId) {
      return null;
    }
    const school = schools.find(_school => _school.id === student.schoolId);
    if (!school) {
      return null;
    }
    school.students = students.filter(
      _student => _student.schoolId === school.id
    ).length;
  });
  const sortSchools = schools.sort((a, b) => b.students - a.students);
  return sortSchools[0];
};

export const topSchoolHelper = (students, schools) => {
  students.map(student => {
    if (!student.schoolId) {
      return null;
    }
    const school = schools.find(_school => _school.id === student.schoolId);
    if (!school) {
      return null
    }
    const filteredStudents = students.filter(
      _student => _student.schoolId === school.id
    );
    school.averageGPA = filteredStudents.reduce((acc, val) => {
      acc += (val.gpa * 1) / filteredStudents.length;
      return acc;
    }, 0);
  });
  const sortSchools = schools.sort((a, b) => b.averageGPA - a.averageGPA);
  return sortSchools[0];
};
