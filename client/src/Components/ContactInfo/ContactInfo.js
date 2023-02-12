import React,{useEffect, useState,useContext} from 'react'
import './ContactInfo.css'
import { AdminContext } from '../../App'
import { images } from '../../constants'
import Seperator from '../Seperator'



const ContactInfo = () => {

    const {state,dispatch} = useContext(AdminContext)
    const admin = JSON.parse(localStorage.getItem('admin'))
    
    

    const [date,setDate] = useState(new Date().toLocaleDateString('en-GB'))
    const [time,setTime]= useState(new Date().toLocaleTimeString(undefined,{timeZone:'Asia/Kolkata'}))

    useEffect(()=>{
        setInterval(()=>{
            setDate(new Date().toLocaleDateString('en-GB'))
            setTime(new Date().toLocaleTimeString(undefined,{timeZone:'Asia/Kolkata'}))
        },1000)
    },[])
    

  return (
    <div className='info-container' >
        <div className='logo'>
            <img className='d2d_logo' src={images.D2D} alt="" />
        </div>

        <div className='info' >
            {/* <div style={{paddingLeft:'20px',paddingRight:'20px',display:'flex'}} >
                <h3>Admin: {admin?.username? admin?.username : ''}</h3>
            </div> */}
            <div style={{paddingLeft:'20px',paddingRight:'20px',display:'flex'}} >
                <h5>{date}</h5>
                <Seperator width={'20px'} />
                <h5>{time}</h5>
            </div>
        </div>

    </div>
  )
}

export default ContactInfo