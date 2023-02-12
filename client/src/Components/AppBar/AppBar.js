import React,{useState} from 'react'
import './AppBar.css'

const AppBar = () => {

  const [scrolled,setScrolled] = useState(false)
    const handleScroll = (event) =>{
      
      if(window.scrollY>=20){
        
        return setScrolled(true)
        
  
      }else if(window.scrollY<20) {
        
        return setScrolled(false)
      }    
    }
    
        window.addEventListener('scroll',handleScroll)

  return (
    <div className={scrolled? 'appbar-containeroff' : 'appbar-container'}>
        Home
    </div>
  )
}

export default AppBar