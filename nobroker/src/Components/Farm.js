import Heading from './Heading';
import React ,{useState,useEffect} from 'react';
import bootstrap from 'bootstrap';
import Axios from 'axios' //npm i axios
import {useNavigate} from "react-router-dom";
import '../Style/housestyle.css'
import Navbar from './Navbar';
import Loginusernavbar from './LoginuserNavbar';
export default function Farm()  {
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

        const [farmdetails, setDetails] = useState(
            {
                name: '',
                address: '',
                area:0,
                price:0,
                mobileno:0
            }
        );
  
        const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData();        
            formData.append('name', farmdetails.name);
            formData.append('address', farmdetails.address);
            formData.append('area', farmdetails.area);
            formData.append('price', farmdetails.price);
            formData.append('photos', getimages);
            formData.append('state',getstate );
            formData.append('district', getcity);
            formData.append('mobileno', farmdetails.mobileno);

            if(farmdetails.name&&farmdetails.address&&farmdetails.area&&farmdetails.price&&getcity&&getstate&&(9999999999>farmdetails.mobileno && farmdetails.mobileno>999999999))
            {
                Axios({
                    method: "post",
                    url: "http://localhost:3009/insertfarmdetails",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((res) => {
                    alert(res.data.message);
                    nevigate("/Loginuserdashboard")
             }).catch(err=>console.log(err))
            }
            else{
                alert({message:"Error!!! Incomplete Details filled or incorrect mobile no."})
            }
                 
        }
    
        const handleChange = (e) => {
            setDetails({...farmdetails, [e.target.name]: e.target.value});
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
    <h1>Farm Details</h1>
          </div>
          <Loginusernavbar></Loginusernavbar>

      <div id="main2">
            <form encType="multipart/form-data" method='post' onSubmit={handleSubmit}>
                <table style={{marginLeft:"15%"}}>
                    <tr><td className='d'>Enter your Full name</td><td><input type="text"placeholder="name"
                name="name"value={farmdetails.name} onChange={handleChange}/></td></tr>

        <tr><td className='d'>Enter Mobile No</td><td><input type="number" id="mobileno"
                    name='mobileno' value={farmdetails.mobileno} onChange={handleChange}></input></td></tr>

                    <tr><td className='d'>Enter your Address</td><td><textarea rows="5" id="address"
                    placeholder="Enter Your Address" name='address'value={farmdetails.address} 
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

                
                    <tr><td className='d'>Enter Area of farm</td><td><input type="number" id="area" min="0" placeholder="in Sq.Ft"
                    name='area' value={farmdetails.area} onChange={handleChange}></input></td></tr>

                    <tr><td className='d'>Enter Price of farm</td><td><input type="number" id="price"
                    name='price' value={farmdetails.price} onChange={handleChange}></input></td></tr>
                
                <tr><td ><input type="file" accept=".png, .jpg, .jpeg , .jfif" name="photos" onChange={handlePhoto} /></td></tr>

                    <tr><td className='d' style={{textAlign: "center"}} colSpan="2"><input type="submit"></input></td></tr> 
                     
                </table>
            </form>  
            </div>
    </div>
    );
  }
  

