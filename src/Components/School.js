import React from 'react';
import { connect } from 'react-redux';
import Students from './Students';
import SelectStudent from './SelectStudent';
const School = ( {students, match, school } ) => {
  return (
    <div>
      {school ? <div><h3>{school.name} ({students.length} Student{students.length > 1 ? "s" :''} Enrolled)</h3>
      <SelectStudent school={school}/>
      <Students students={students} match={match}/></div> : '' }
    </div>
  );
};

const stateToProps = ({ students, schools },  { match }) => {
  const school = schools.find(s => s.id === match.params.id)
  return {
    students: students.filter(student => student.schoolId === match.params.id),
    school
  }
}

export default connect(stateToProps)(School);
