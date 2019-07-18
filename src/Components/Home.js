import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { popularHelper, topSchoolHelper } from '../helpers';
import Form from './Form';

const Home = ({ schools, students }) => {
  const mostPopular = popularHelper(students, schools);
  const topSchool = topSchoolHelper(students, schools);
  return (
    <div>
      <div>
        <Form />
      </div>
      <h1>Home</h1>
      {mostPopular ? (
        <p>
          Our most popular school is{' '}
          <Link to={`/schools/${mostPopular.id}`}>{mostPopular.name}</Link> with{' '}
          {
            students.filter(student => student.schoolId === mostPopular.id)
              .length
          }{' '}
          students{' '}
        </p>
      ) : (
        ''
      )}
      {topSchool ? (
        <p>
          Our top performing school is{' '}
          <Link to={`/schools/${topSchool.id}`}>{topSchool.name}</Link> with and
          GPA of {topSchool.averageGPA}
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

const stateToProps = ({ students, schools }) => {
  return {
    schools,
    students
  };
};

export default connect(stateToProps)(Home);
