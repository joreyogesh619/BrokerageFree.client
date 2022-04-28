//import React, { Component } from 'react'
import Navbar2 from './Navbar2';
import Heading from './Heading';
import '../Style/loginformstyle.css';
import App from '../App';
import Userprofile from './Userprofile';
import React ,{useState} from 'react';
import Axios from 'axios' //npm i axios
import {useNavigate} from "react-router-dom";
export default function LoginForm({setLoginUser})  {
  const navigate=useNavigate();
  const [Emailid,setEmailid]=useState("");
  const [Password,setPassword]=useState("");
  const [userdata,setData]=useState([{}]);
  const [error,setError]=useState(null);
  
 function logCheck()
{
  //path inside axios = express path 
  Axios.post("http://localhost:3009/logcheck",{ "Emailid":Emailid,"Password":Password})
  .then(result=>{alert(result.data.message);
    console.log(result.data.result);
    sessionStorage.setItem("eid",result.data.result[0].Emailid,);
    sessionStorage.setItem("name",result.data.result[0].Fullname);sessionStorage.setItem("p",result.data.result[0].Password);
    sessionStorage.setItem("address",result.data.result[0].Address);sessionStorage.setItem("dob",result.data.result[0].Dateofbirth);
    sessionStorage.setItem("adharno",result.data.result[0].Adharnumber);sessionStorage.setItem("mobileno",result.data.result[0].Mobilenumber);
    sessionStorage.setItem("img",result.data.result[0].photos);sessionStorage.setItem("Empid",result.data.result[0].Employeeid);
    sessionStorage.setItem("salary",result.data.result[0].Salary);
  if(result.data.message==="Login Failed"){navigate("/LoginForm")}
    else if(result.data.message==="Login successful" && result.data.result[0].Employeeid==null){navigate("/Loginuserdashboard")}
    else{navigate("/Admindashboard")}
    setData((result.data.result).userdata)})
  .catch(err=>console.log(err)); 
  console.log(userdata);
} 
    
    return (
      <div>
        <Heading></Heading>
      <div style={{backgroundColor: "lightblue",width:"100%"}} className="jumbotron text-center">
    <h1>Login Form</h1></div>
      <Navbar2></Navbar2>
    <div className="form-group">
        <label for="Emailid">Emailid</label>
        <input type="text" class="form-control" id="Emailid"
            placeholder="Enter Your Emailid" style={{"height":"50px","fontSize":"25px"}}
            value={Emailid}
            onChange={(event)=> { setEmailid(event.target.value) }}
        />
    </div>
    <div className="form-group">
        <label for="Password">Password</label>
        <input type="password" class="form-control" id="p"
            placeholder="Enter Your Password"
            value={Password} style={{"height":"50px","fontSize":"25px"}}
            onChange={(event)=> { setPassword(event.target.value) }}
        />
    </div>
    
        <div className="form-group">
            <button type="submit" id="b" onClick={logCheck} class="btn btn-primary">Submit</button>
    </div>

    </div>
    );
  }
  

