import {React,useState,useEffect} from 'react'
import axios from 'axios';
import UserPropertytable from '../Components/UserPropertytable';
export default function Userprofilesearchbar() {

  const [selectedcollection,setSelectedCollection]= useState("");
    const [selectedoption,setSelectedoption]= useState("");
    const [typeofproperty,setTypeofproperty]=useState([]);
    const [getsearchvalue,setSearchvalue]=useState([]);
    const[data,setData]=useState([]);
    const [propertydata,setPropertydata]=useState([]);
    const buy=["House","Flat","Plot","Farmhouse","Farm","StoreAndWarehouse"];
    const rent=["House","Flat","Hostel","StoreAndWarehouse"];
    const uname=sessionStorage.getItem("name");


    function onSearch()
  {
    axios.post(`http://localhost:3009/usersearchdata${selectedoption}${typeofproperty}`,
    {"searchvalue":getsearchvalue,"name":uname})
      .then((result) => {
        console.log(result);
        setPropertydata(result.data); 
    }).catch((err) => {
          console.log(err);
    })
    
  }
    function handleDropdown(e)
    {
      setSelectedoption(e.target.value)
        if(e.target.value==="Rent")
        {
            setData(rent);
        }
        else if(e.target.value=="Buy")
        {
            setData(buy);
        }
    }
  return (
    <div>

<nav  className="navbar navbar-expand-lg " id="n">
  <div className="container-fluid">
    
    <a className="navbar-brand" href="#" style={{"fontSize":"30px","marginTop":"5px","color":"black","marginLeft":"20px"}}>Search Property here</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{"--bs-scroll-height": "100px"}}>
      <select className="form-select"  onChange={handleDropdown} aria-label="Default select example" style={{"width":"80px","fontSize":"20px","marginLeft":"100px","marginTop":"25px"}}>
              <option >Select</option>
              <option >Buy</option>
              <option>Rent</option>
          </select>
          <select className="form-select" onChange={(e)=>{setTypeofproperty(e.target.value)}} aria-label="Default select example" style={{"width":"80px","fontSize":"20px","marginLeft":"80px","marginTop":"25px"}}>
                        <option>select</option>
                        {data.map((e)=><option>{e}</option>)}
      
          </select>
        
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" id="s" value={getsearchvalue}  onChange={(e)=>{setSearchvalue(e.target.value)}} aria-label="Search"style={{"width":"250px","height":"60px","fontSize":"20px"}} />
        <button className="btn btn-outline-success" type="button" id="b" onClick={onSearch} style={{"marginRight":"200px","width":"60px","fontSize":"12px"}}>Search</button>
      </form>
    </div>
    
  </div>
</nav>
<div>

    {propertydata.map(((res)=>{
        return (
          <UserPropertytable
            name={res} type={typeofproperty}
          ></UserPropertytable>
        );
    }))}
    </div>

    </div>
  )
}
