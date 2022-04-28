import {React,useEffect,useState} from 'react'
import Heading from './Heading'
import axios from 'axios'
import Adminnavbar from './Adminnavbar';
import Userdata from './Userdata';

export default function Admindashboard() {

  const [userdata,setUserdata]=useState([]);
useEffect((res)=>{
    axios.get("http://localhost:3009/userdetailsdata")
    .then(res=>{setUserdata(res.data.result);console.log(res.data.result)})
    .catch(err=>console.log(err))
},[])
  return (
    <div>
        <Heading></Heading>
        <div style={{backgroundColor: "lightblue",width:"100%"}} className="jumbotron text-center">
    <h1>Admin Profile</h1>
          </div>
       <Adminnavbar></Adminnavbar>
       
       {/* {userdata.map((d) => {
        return (
          <Userdata
            name={d}
          ></Userdata>
        );
      })} */}

       
    </div>
  )
}
