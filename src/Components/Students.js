import React from "react";
import { connect } from "react-redux";
import Form from "./Form";
import { destroyStudent, selectStudent } from "../store";

const Students = ({
  students,
  schools,
  removeStudent,
  enrollSchool,
  getImage
}) => {
  return (
    <div>
      <Form />
      <div id="allStudentsContainer">
        {students.map(student => (
          <div id="studentCard" key={student.id}>
            <h3>
              {student.firstName} {student.lastName}
            </h3>
            {getImage(student, schools)}
            <p>GPA: {student.gpa}</p>
            <select
              defaultValue={student.schoolId}
              onChange={ev =>
                enrollSchool({
                  schoolId: ev.target.value,
                  studentId: student.id
                })
              }
            >
              <option value=''>--Not Enrolled --</option>
              {schools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
            <button id="destoryBtn"onClick={() => removeStudent(student.id)}>
              Destroy Student
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const stateToProps = ({ students, schools }, { match }) => {
  if (!match.params.id) {
    return {
      students,
      schools,
      match
    };
  } else {
    return {
      schools,
      match
    };
  }
};

const dispatchToProps = dispatch => {
  return {
    removeStudent: data => dispatch(destroyStudent(data)),
    enrollSchool: data => dispatch(selectStudent(data)),
    getImage: (student, schools) => {
      const school = schools.find(s => s.id === student.schoolId);
      if (!school) {
        return null
      }
      return <img className="schoolImg" src={school.image}/>
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Students);
