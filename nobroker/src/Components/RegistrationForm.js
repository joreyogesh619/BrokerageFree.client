//import React, { Component } from 'react'
import Navbar2 from './Navbar2';
import Heading from './Heading';
import "../Style/Registrationformstyle.css";
import React ,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from 'axios' //npm i axios
export default function RegistrationForm()  {
    const nevigate=useNavigate();
  const [Fullname,setFullname]= useState("");//useState - react 16 react hook 
  const [Emailid,setEmailid]=useState("");
  const [Password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [Address,setAddress]=useState("");
  const [Dateofbirth,setDateofbirth]=useState(0);
  const [Mobilenumber,setMobilenumber]=useState(0);
  const [Adharnumber,setAdharnumber]=useState(0);
  const [getimages,setgetImages]=useState('');
  const handlePhoto = (e) => {   
      console.log(e.target.files[0]);
      console.log(e.target.files[0].size);
      if(e.target.files[0].size<1000000)
      {
        setgetImages(e.target.files[0]);
      }
      else{
          alert("Image size is greater than 1Mb");
      }
                
}

const handleSubmit = (e) => {
    e.preventDefault();

    console.log(Password.length);
    const formData = new FormData();                      
    formData.append('Fullname',Fullname );
    formData.append('Address', Address);
    formData.append('Emailid', Emailid);
    formData.append('Password', Password);
    formData.append('Dateofbirth', Dateofbirth);
    formData.append('Mobilenumber', Mobilenumber);
    formData.append('Adharnumber', Adharnumber);
    formData.append('photos', getimages);

    if(Fullname && Emailid && Address && Dateofbirth && (9999999999>Mobilenumber && Mobilenumber>999999999)
     && (Adharnumber>99999999999 && Adharnumber<999999999999) && (Password===confirmPassword) &&(Password.length>6))
  {
         Axios({
            method: "post",
            url: "http://localhost:3009/insert",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(res=>{alert(res.data.message);
        if(res.data.message=="Registration Failed")
        {
            nevigate("/RegistrationForm")
        }
        else{
            nevigate("/Loginform");
        }})
        
    } 
    else{
        alert("Registration Failed");
      nevigate("/RegistrationForm");
    }  
}
   
    return (
      <div className="container-fluid">
          <Heading></Heading>
      <div style={{backgroundColor: "lightblue",width:"100%"}} className="jumbotron text-center">
    <h1>Registration Form</h1></div>
    
          <Navbar2 ></Navbar2>
      <div className="form-group">
        <label for="Fullname">Full Name</label>
        <input type="text" className="form-control" id="Fullname"
            placeholder="Enter Your Fullname" pattern="[a-zA-Z]*" 
            onInvalid={"setCustomValidity('Please enter on alphabets only. ')"}
            value={Fullname} required 
            onChange={(event)=> { setFullname(event.target.value) }}
        />
        
    </div>
    <div className="form-group">
        <label for="Emailid">Email Id</label>
        <input type="email" className="form-control" id="Emailid"
            placeholder="Enter Your Emailid" required
            value={Emailid}
            onChange={(event)=> { setEmailid(event.target.value) }}
        />
    </div>
    <div className="form-group">
        <label for="Password">Password</label>
        <input type="password" className="form-control" id="Password" required
            placeholder="Enter Your Password"
            value={Password}
            onChange={(event)=> { setPassword(event.target.value) }}
        />
    </div>

    <div className="form-group">
        <label for="Password">Confirm Password</label>
        <input type="password" className="form-control" id="confirmPassword"
            placeholder="re-enter Password" required message="password must "
            value={confirmPassword}
            onChange={(event)=> { setConfirmPassword(event.target.value) }}
        />
    </div>

    <div className="form-group">
        <label for="Address">Address</label>
        <input type="text" className="form-control" id="Address"
            placeholder="Enter Your Address" required
            value={Address}
            onChange={(event)=> { setAddress(event.target.value) }}
        />
    </div>
    <div className="form-group">
        <label for="Dateofbirth">Date of birth</label>
        <input type="date" className="form-control" id="Dateofbirth"
            placeholder="Enter Your Date of birth" required
            value={Dateofbirth}
            onChange={(event)=> { setDateofbirth(event.target.value) }}
        />
    </div>
    <div className="form-group">
        <label for="Mobilenumber"> Mobile number</label>
        <input type="text" className="form-control" id="Mobilenumber"
        oninvalid="setCustomValidity('Please enter 10 digit number. ')"
            placeholder="Enter Mobilenumber" required max={9999999999} min={1000000000}
            value={Mobilenumber}
            onChange={(event)=> { setMobilenumber(event.target.value) }}
        />
    </div> 
    <div className="form-group">
        <label for="Adharnumber"> Adhar number:</label>
        <input type="number" className="form-control" id="Adharnumber"
            placeholder="Enter Adhar number" required
            value={Adharnumber}
            onChange={(event)=> { setAdharnumber(event.target.value) }}
        />
    </div>

        <div className="form-group">
        <label for="Image">Upload Profile Picture:</label>
        <input type="file" className="form-control" id="photos"
            accept=".png, .jpg, .jpeg,.jfif" 
            onChange={handlePhoto}
        />
        
    </div>
        <div>

        </div>
        <div className="form-group">
            <button type="submit" onClick={handleSubmit} className="btn btn-primary" id='b'>Submit</button>
    </div>

    </div>
    );
  }
  

