import React from 'react'
import { connect } from "react-redux";
import { login }  from "../store"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
    this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  onChange (ev) {
    this.setState({[ev.target.name]: ev.target.value})
  }

  handleClick(ev) {
    ev.preventDefault()
    this.props.handleLogin(this.state)
    window.location.hash = "/"
  }
  render() {
    const { email, password} = this.state
    const { onChange, handleClick } = this
  return (
    <form>
      <label htmlFor="email">
      Email <input name="email" value={email} onChange={onChange}/>
      </label>
      <label htmlFor="password">
      Password <input type="password" name="password" value={password} onChange={onChange} />
      </label>
      <button type="submit" onClick={handleClick}>Sign In</button>
    </form>
  )
  }
}

const dispatchToprops = dispatch => {
  return {
    handleLogin: logonInfo => dispatch(login(logonInfo))
  }
}
export default connect(null, dispatchToprops)(Login)
