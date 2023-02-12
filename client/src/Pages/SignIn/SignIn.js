import axios from 'axios'
import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import Seperator from '../../Components/Seperator'
import {toast} from 'react-toastify'
import './SignIn.css'



const SignIn = () => {

  const history = useHistory()

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const adminLogin = async()=>{
   const adminDetails ={
      username:username,
      password:password
    }
    const adminResponse = await axios.post('http://ec2-54-159-166-105.compute-1.amazonaws.com:3000/api/admin-login',adminDetails)
    console.log(adminResponse);
    if(adminResponse?.data?.status === false){
      alert('error in password')
    }else if(adminResponse?.data.error){
      alert('something went wrong')
    }else{
      const admin = adminResponse?.data.admin
      localStorage.setItem('jwt',adminResponse?.data?.token)
      localStorage.setItem('admin',JSON.stringify(admin))
      history.push('/')
    }

  }
  return (
    <div className='login-container' >
      <div className='login-box' >
        <input placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className='text-input' />
        <Seperator height={'20px'} />
        <input placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} type="text" className='text-input' />
        <Seperator height={'30px'} />
        <button className='normal-button' onClick={()=>adminLogin()} >Login</button>

      </div>
    </div>
  )
}

export default SignIn