import React, { useState,createContext,useReducer,useContext } from 'react'
import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import './App.css';
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import {initialState,AdminReducer} from './reducers/AdminReducer'

export const AdminContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(AdminContext)

  const admin = localStorage.getItem('admin')
  const token = localStorage.getItem('jwt')
  const appStart = ()=>{
    if(admin && token){
      dispatch({type:'ADMIN',payload:admin})
      dispatch({type:'TOKEN',payload:token})
      // history.push('/')
    }else{
      history.push('/login')
      
    }
  }
  useEffect(() => {
    appStart()
  }, [])
  return (
    <Switch>
      
      <Route path='/login' ><SignIn /></Route>
      <Route exact path='/' ><Home /></Route>

    </Switch>
  )

}

function App() {

  const [state,dispatch] = useReducer(AdminReducer,initialState)


  return (
    <div className="App" >
      <AdminContext.Provider value={{state,dispatch}}>
      <Router>
        <Routing />
      </Router>
      </AdminContext.Provider>

    </div>
  );
}

export default App;
