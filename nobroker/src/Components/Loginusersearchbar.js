import React,{useState,useEffect} from 'react'
import "../Style/searchbar.css";
import axios from 'axios';
import Loginusersearchdata from './Loginusersearchdata';
export default function Loginusersearchbar() {

    const [selectedcollection,setSelectedCollection]= useState("");
    const [selectedoption,setSelectedoption]= useState("");
    const [typeofproperty,setTypeofproperty]=useState([]);
    const [getsearchvalue,setSearchvalue]=useState([]);
    const[data,setData]=useState([]);
    const [housedata,setHouseData]=useState([]);
    const [plotdata,setPlotData]=useState([]);
    const [hosteldata,setHostelData]=useState([]);
    const [storedata,setStoreData]=useState([]);
    const buy=["House","Flat","Plot","Farmhouse","Farm","StoreAndWarehouse"];
    const rent=["House","Flat","Hostel","StoreAndWarehouse"];
    function onSearch()
  {
    axios.post(`http://localhost:3009/searchdata${selectedoption}${typeofproperty}`,{"searchvalue":getsearchvalue})
      .then((result) => {
        if(typeofproperty=="House"||typeofproperty=="Flat"||typeofproperty=="Farmhouse")
        {
          console.log(result);
        setHouseData(result.data); 
        }
        else if(typeofproperty=="Plot"||typeofproperty=="Farm")
        {
          console.log(result);
          setHouseData(result.data); 
        }
        else if(typeofproperty=="Hostel")
        {
          console.log(result);
          setHouseData(result.data); 
        }
        else{
          setHouseData(result.data); 
        }
        
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
    {/* {(()=>{
      if(housedata.length!=0)
      {
        console.log("house");
        {housedata.map((d) => {
          return (
            <Searchdata
              name={d}
            ></Searchdata>
          );
        })}
      }
      else if(plotdata!=null)
      {
        {plotdata.map((d) => {
          return (
            <Searchdata
              name={d}
            ></Searchdata>
          );
        })}
      }
      else if(hosteldata!=null)
      {
        {hosteldata.map((d) => {
          return (
            <Searchdata
              name={d}
            ></Searchdata>
          );
        })}
      }
      else
      {
        {storedata.map((d) => {
          return (
            <Searchdata
              name={d}
            ></Searchdata>
          );
        })}
      }
    })} */}

    {housedata.map(((res)=>{
        return (
          <Loginusersearchdata
            name={res} type={typeofproperty}
          ></Loginusersearchdata>
        );
    }))}
    </div>
    </div>
  )
}
