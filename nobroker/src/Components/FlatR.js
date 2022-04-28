//import React, { Component } from 'react'
import Heading from './Heading';
import React ,{useState,useEffect} from 'react';
import Axios from 'axios' //npm i axios
import '../Style/housestyle.css'
import {useNavigate} from "react-router-dom";
import Loginusernavbar from './LoginuserNavbar';
export default function FlatR()  {
    const nevigate=useNavigate();
    const [data,setData]=useState([]);
    var [district,setDistrict]=useState([]);
    const [getstate,setState]=useState('');
    const [getcity,setCity]=useState('');
    const [getimages,setgetImages]=useState('');

    useEffect(()=>{
        Axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err));
    },[])

    const country=[...new Set(data.map(item=> item.country))];
    country.sort();
    const indiadata=data.filter(c=>c.country==='India');

    const states=[...new Set(indiadata.map(i=>i.subcountry))];
    states.sort();
        const [flatdetails, setDetails] = useState(
            {
                name: '',
                address: '',
                noofhalls: 0,
                noofbedrooms: 0,
                noofbathroom: 0,
                bathroomtype:'',
                noofkitchen: 0,
                parking: 0,
                nooftoilet: 0,
                noofbalconies: 0,
                apartmentname: '',
                area:0,
                rent:0,
                mobileno:0
            }
        );
  
        const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData();
                        
            formData.append('name', flatdetails.name);
            formData.append('address', flatdetails.address);
            formData.append('noofhalls', flatdetails.noofhalls);
            formData.append('noofbedrooms', flatdetails.noofbedrooms);
            formData.append('noofbathroom', flatdetails.noofbathroom);
            formData.append('bathroomtype', flatdetails.bathroomtype);
            formData.append('noofkitchen', flatdetails.noofkitchen);
            formData.append('nooftoilet', flatdetails.nooftoilet);
            formData.append('noofbalconies', flatdetails.noofbalconies);
            formData.append('apartmentname', flatdetails.apartmentname);
            formData.append('parking', flatdetails.parking);
            formData.append('area', flatdetails.area);
            formData.append('rent', flatdetails.rent);
            formData.append('photos', getimages);
            formData.append('state',getstate );
            formData.append('district', getcity);
            formData.append('mobileno', flatdetails.mobileno);
            
            if(flatdetails.name&&flatdetails.address&&flatdetails.area&&flatdetails.rent&&getcity&&getstate&&(9999999999>flatdetails.mobileno && flatdetails.mobileno>999999999))
            { 
            Axios.post('http://localhost:3009/insertflatrdetails',formData)
            .then(res => {
                alert(res.data.message);
                    nevigate("/Loginuserdashboard")
             })
             .catch(err => {
                console.log(err);
             });
            }
            else
            {
                alert({message:"Error!!! Incomplete Details filled or incorrect mobile no."})
            }     

        }
    
        const handleChange = (e) => {
            setDetails({...flatdetails, [e.target.name]: e.target.value});
        }
    
        const handleState=(e)=>{
            setState(e.target.value);
            var cities=indiadata.filter(city=>city.subcountry===e.target.value);
            const city=[...new Set(cities.map(item=> item.name))];
            city.sort();
            setDistrict(city);
        }
        
        const handleCity=(e)=>{
            setCity(e.target.value);
        }

        const handlePhoto = (e) => {   
            if(e.target.files[0].size<1000000)
            {
              setgetImages(e.target.files[0]);
            }
            else{
                alert("Image size is greater than 1Mb");
            }
                      
      }
    
    return (
      <div>
          <Heading></Heading>
          
      <div style={{backgroundColor: "lightblue",width:"100%"}} className="jumbotron text-center">
    <h1>Flat Details</h1></div>
    <Loginusernavbar></Loginusernavbar>
      <div id="main2">
            <form encType="multipart/form-data" method='post' onSubmit={handleSubmit}>
                <table style={{marginLeft:"15%"}}>
                    <tr><td className='d'>Enter your Full name</td><td><input type="text"placeholder="name"
                name="name"value={flatdetails.name} onChange={handleChange}/></td></tr>

            <tr><td className='d'>Enter Mobile No</td><td><input type="number" id="mobileno"
                    name='mobileno' value={flatdetails.mobileno} onChange={handleChange}></input></td></tr>

                    <tr><td className='d'>Enter Address</td><td><textarea rows="5" id="address"
                    placeholder="Enter Your Address" name='address'value={flatdetails.address} 
                    onChange={handleChange}></textarea></td></tr>

                    <tr>
                        <td><select name='state'  onChange={handleState}>
                        <option >--Select State--</option>
                        {
                            states.map( (item,index)=>
                                <option key={index} >{item}</option>
                            )
                        }
                        </select></td>
                        <td><select name="district"  onChange={handleCity}>
                        <option >--Select District--</option>
                        {
                            district.map( (item)=>
                                <option >{item}</option>
                            )
                        }
                        </select></td></tr>
                    <tr><td className='d'>Apartment Name </td><td><input type="text" id="apartmentname"
                    name='apartmentname' value={flatdetails.apartmentname} onChange={handleChange}></input></td></tr>

                    <tr><td className='d'>Enter Number of Bedrooms</td><td><input type="number" id="noofbedrooms" min="0"
                    name='noofbedrooms' value={flatdetails.noofbedrooms} onChange={handleChange}></input></td></tr>

                    <tr><td className='d'>Enter No of Balconies</td><td><input type="number" id="noofbalconies"
                    name='noofbalconies' value={flatdetails.noofbalconies} onChange={handleChange}></input></td></tr>

                    <tr><td className='d'>Type of Bathroom</td><td className='d'>Combined 
                        <input type="radio" name="bathroomtype" id="combined"
                    value="combined" onChange={handleChange}></input>
                           Separate <input type="radio" name="bathroomtype" id="separate"
                           value="separate" onChange={handleChange}></input></td></tr>
                    
                    <tr><td className='d'>Enter Number of halls</td><td><input type="number" id="noofhalls" min="0"
                    name='noofhalls' value={flatdetails.noofhalls} onChange={handleChange}></input></td></tr>

                    <tr><td className='d'>Enter Number of Toilet</td><td><input type="number" id="nooftoilet" min="0"
                    name='nooftoilet' value={flatdetails.nooftoilet} onChange={handleChange}></input></td></tr>

                    <tr><td className='d'>Enter Number of Bathroom</td><td><input type="number" id="noofbathroom" min="0"
                    name='noofbathroom' value={flatdetails.noofbathroom} onChange={handleChange}></input></td></tr>
                    <tr><td className='d'>parking Availabolity</td><td>Yes 
                        <input type="radio" name="parking" id="yes"
                    value="yes" onChange={handleChange}></input>
                           No <input type="radio" name="parking" id="no"
                           value="no" onChange={handleChange}></input></td></tr>
                    

                    <tr><td className='d'>Enter rent of flat</td><td><input type="number" id="rent"
                    name='rent' value={flatdetails.rent} onChange={handleChange}></input></td></tr>

                    <tr><td className='d'>Enter Area in Sq.Ft</td><td><input type="number"  id="area"
                    placeholder="Enter Area in Sq.Ft" name='area'value={flatdetails.area} 
                    onChange={handleChange}></input></td></tr>

                    <input type="file"  accept=".png, .jpg, .jpeg,.jfif" name="photos" onChange={handlePhoto} />

                    <tr><td className='d' style={{textAlign: "center"}} colSpan="2"><input type="submit"></input></td></tr>
                    
                </table>
            </form>  
            </div>
    </div>
    );
  }
  

