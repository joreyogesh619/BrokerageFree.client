import React from 'react'
import '../Style/Navbar3style.css'
export default function Navbar2() {
  return (
    <div>
        
        <div className="navbar" style={{"paddingBottom":"500px"}}>
        <a className="navbar-brand" href="Dashboard" style={{"fontSize":"30px","marginTop":"20px"}}>BrokerageFree.com</a>
  <a href="Dashboard">Home</a>
  <a href="LoginForm">Login</a>
  <a href="RegistrationForm">Registration</a>
  
        <li className="nav-item">
          <a href='Aboutus' className="nav-link">About Us</a>
        </li> 

</div>

    </div>
  )
}
