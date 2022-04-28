import {React,useState} from 'react'
import '../Style/Editprofilestyle.css';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
export default function Editpassword() {

    const nevigate=useNavigate();
    const [Password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [getimages,setgetImages]=useState('');
    const eid=sessionStorage.getItem("eid");
    const ename=sessionStorage.getItem("name");
    const eaddress=sessionStorage.getItem("address");
    const epassword=sessionStorage.getItem("p");
    const emobileno=sessionStorage.getItem("mobileno");
    const eadharno=sessionStorage.getItem("adharno");
    const handlePhoto = (e) => {   
      setgetImages(e.target.files[0]);  
  }
  const savechanges=(e)=>{
    e.preventDefault();
        if(Password===confirmPassword)
        {
            axios.post("http://localhost:3009/editpassword",{"p":Password,"emailid":eid})
        .then(res=>{console.log(res.data);alert(res.data.message);nevigate("/Userprofile")})
        .catch(err=>console.log(err))
        }
        else{
            alert("Please match password");
            nevigate("/Editpassword");
        }
        
    } 
  
  return (
    <div>
        <div className="container-xl px-4 mt-4">
    
    <hr className="mt-0 mb-4"/>
    <div className="row">
        <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                    
                    <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                    
                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                    <div className="form-group">
                        <label for="Image">Your Profile Picture:</label>
                         </div>
                    
                </div>
            </div>
        </div>
        <div className="col-xl-8">
            
            <div className="card mb-4">
                <div className="card-header">User Details</div>
                <div className="card-body">
                    <form method='post'>
                        
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-12">
                                <label className="small mb-1" for="inputLocation">Address</label>
                                <input className="form-control" id="inputLocation" type="text" 
                                 placeholder="Enter your new address" value={eaddress}/>
                            </div>
                        </div>
                        
                        <div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Email address</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your new email address" 
                             value={eid}/>
                        </div>
                        
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputPhone">Mobile number</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your new mobile number"
                                value={emobileno}/>
                            </div>
                            
                        </div>

                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputPhone">New Password</label>
                                <input className="form-control" id="p1" type="password" placeholder="Enter your new password number"
                                 value={Password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            </div>
                            
                        </div>

                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputPhone">Confirm new Password</label>
                                <input className="form-control" id="p2" type="password" placeholder="Enter your new password number"
                                 value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                            </div>
                            
                        </div>
                        
                        <button className="btn btn-primary" type="button" onClick={savechanges}>Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}
