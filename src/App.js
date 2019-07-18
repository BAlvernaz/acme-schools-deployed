import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import Routes from './Components/Routes'

const App = () => {
  return (
    <Provider store={store} >
     <Routes />
    </Provider>
  )
}

export default App
