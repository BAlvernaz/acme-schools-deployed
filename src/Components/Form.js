import React from 'react';
import { connect } from 'react-redux';
import { addStudent } from '../store';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
      schoolId: '',
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev) {
    const { firstName, lastName, email, gpa, errors } = this.state;
    ev.preventDefault();
    if (!firstName) {
      errors.push('Validation notEmpty on firstName failed');
      this.setState({errors})
    }
    if (!lastName) {
        errors.push('Validation notEmpty on lastName failed');
        this.setState({errors})
    }
    if (!email) {
      errors.push('Validation notEmpty on email failed');
      this.setState({errors})
    }
    if (!gpa) {
      errors.push('Validation notEmpty on gpa failed');
      this.setState({errors})
    } else {
    this.props.handlesubmit({ firstName, lastName, email, gpa });
  }
}

  render() {
    const { firstName, lastName, email, gpa, errors } = this.state;
    const { schools } = this.props;
    const { onChange, onSubmit } = this;
    return (
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="firstName" className="inputLables">
            First Name{' '}
            <input name="firstName" value={firstName} onChange={onChange} />
          </label>
          <label htmlFor="lastName" className="inputLables">
            Last Name{' '}
            <input name="lastName" value={lastName} onChange={onChange} />
          </label>
          <label htmlFor="email" className="inputLables">
            Email <input name="email" value={email} onChange={onChange} />
          </label>
          <label htmlFor="gpa" className="inputLables">
            GPA <input name="gpa" value={gpa} onChange={onChange} />
          </label>
          <label htmlFor="schoolId">
            Enroll At{' '}
            <select name="schoolId" onChange={onChange} defaultValue={null}>
              <option>--Not Enrolled --</option>
              {schools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </label>
          <input type="submit" value="Save" />
        </form>
        {errors.length > 0
          ? errors.map((error, idx) => (
              <div key={idx} id="errors">
                <p>{error}</p>
              </div>
            ))
          : ''}
      </div>
    );
  }
}

const stateToProps = ({ schools }) => {
  return {
    schools
  };
};

const distpatchToProps = dispatch => {
  return {
    handlesubmit: student => dispatch(addStudent(student))
  };
};

export default connect(
  stateToProps,
  distpatchToProps
)(Form);
