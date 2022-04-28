import {React,useState} from 'react'
import '../Style/Editprofilestyle.css';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
export default function Editphoto() {

    const nevigate=useNavigate();
    const eid=sessionStorage.getItem("eid");
    const [Emailid,setEmailid]=useState("");
    const [getimages,setgetImages]=useState('');
    const handlePhoto = (e) => {   
        console.log(e.target.files[0].name)
      setgetImages(e.target.files[0].name);  
  }
  const savechanges=(e)=>{
    e.preventDefault();

            axios.post("http://localhost:3009/editphoto",{"photo":getimages,"emailid":eid})
        .then(res=>{console.log(res.data);alert(res.data.message);nevigate("/Userprofile")})
        .catch(err=>console.log(err))
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
                        <label for="Image">Upload Profile Picture:</label>
                        <input type="file" className="form-control" id="photos"
                            accept=".png, .jpg, .jpeg,.jfif" 
                        onChange={handlePhoto}/>
                         </div>
                         <button className="btn btn-primary" type="button" onClick={savechanges}>Save changes</button>
                </div>
            </div>
        </div>
        
    </div>
</div>
    </div>
  )
}
