import React from 'react'
import '../Style/Navbar3style.css'
export default function Loginusernavbar2() {

    const logout=()=>{
        sessionStorage.removeItem("empid");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("address");
        sessionStorage.removeItem("p");
        sessionStorage.removeItem("mobileno");
        sessionStorage.removeItem("adharno");
        sessionStorage.removeItem("dob");
        sessionStorage.removeItem("img");
    }
  return (
    <div>
        <div className="navbar" style={{"paddingBottom":"500px"}}>
        <a className="navbar-brand" href="Loginuserdashboard" style={{"fontSize":"30px","marginTop":"20px"}}>BrokerageFree.com</a>
  <a href="Loginuserdashboard">Home</a>
  <a href="LoginForm">Login</a>
  <a href="RegistrationForm">Registration</a>
  <div className="dropdown">
    <button className="dropbtn">Sell 
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
      <a href="House">House</a>
      <a href="Flat">Flat</a>
      <a href="Plot">Plot</a>
      <a href="Farmhouse">Farmhouse</a>
      <a href="Farm">Farm</a>
      <a href="Warehousesell">Store</a>
    </div>
  </div> 
  <div className="dropdown">
    <button className="dropbtn">Rent 
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
      <a href="HouseRent">House</a>
      <a href="FlatR">Flat</a>
      <a href="Hostel">Hostel</a>
      <a href="Rfarmhouse">Farmhouse</a>
      <a href="Warehouserent">Store</a>
    </div>
  </div> 
  <li className="nav-item">
          <a name="n" href='Feedback2' className="nav-link" id="feedback">Feedback</a>
        </li>
        <li className="nav-item">
          <a href='Aboutus' className="nav-link">About Us</a>
        </li>
        
        <div className="dropdown">
    <button className="dropbtn"> 
    <a className="bi bi-person-circle dropdown-toggle"role="button" data-bs-toggle="dropdown" aria-expanded="false"><i  ></i></a>
    </button>
    <div className="dropdown-content">
      <a href="Userprofile">View Profile</a>
      <a href="Dashboard" onClick={logout}>Logout</a>
    </div>
  </div> 

</div>

    </div>
  )
}
