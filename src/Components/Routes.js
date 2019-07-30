import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Navbar from './NavBar'
import Home from './Home'
import Schools from './Schools'
import Students from './Students'
import { loadAll } from '../store'
import School from './School'
import Login  from './Login'

class Routes extends React.Component {
  componentDidMount() {
    this.props.getAll()
  }
  render() {
    const { loggedInUser } = this.props
    return (
      <HashRouter>
      <Route component={Navbar} />
      <div>
        <Switch>
        {loggedInUser && <Route exact path="/" component={Home} />}
        {loggedInUser && <Route exact path="/schools" component={Schools} />}
        {loggedInUser && <Route path="/schools/:id" component={School} />}
        {loggedInUser && <Route path="/students" component={Students} />}
        <Redirect to="/login" />
        </Switch>
        <Route path="/login" component={Login} />
      </div>
    </HashRouter>
    )
  }
}

const stateToProps = ({ loggedInUser }) => {
  return {
    loggedInUser
  }
}

const dispatchToProps = dispatch => {
  return {
    getAll: () => dispatch(loadAll())
  }
}



export default connect(stateToProps, dispatchToProps)(Routes)
