import React from 'react'
import axios from 'axios'

class Login extends React.Component {
  constructor() {
    super()
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

  async handleClick(ev) {
    ev.preventDefault()
    const response = await axios.post('/api/session', this.state)
    if(response.data) {
      window.location.hash = '/'
      document.cookie = response.data
    }
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
      <button onClick={handleClick}>Button</button>
    </form>
  )
  }
}

export default Login
