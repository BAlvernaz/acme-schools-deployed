import React from 'react';
import { connect } from 'react-redux';
import { selectStudent } from '../store';

class SelectStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: ''
    };
    this.onChange = this.onChange.bind(this);
  }
   onChange(ev) {
    this.setState({ studentId: ev.target.value });
    this.props.sendIds({
      studentId: ev.target.value,
      schoolId: this.props.school.id
    });
  }
  render() {
    const { selection } = this.state;
    const { students, school } = this.props;
    const { onChange } = this;

    return (
      <select value={selection} onChange={onChange}>
        <option value="null">-- Add Student ---</option>
        {students
          .filter(student => student.schoolId !== school.id)
          .map(student => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName}
            </option>
          ))}
      </select>
    );
  }
}

const stateToProps = ({students}) => {
  return {
   students
}
}

const dispatchToProps = dispatch => {
  return {
    sendIds: data => dispatch(selectStudent(data))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(SelectStudent);
