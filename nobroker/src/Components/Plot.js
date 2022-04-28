import Heading from './Heading';
import React ,{useState,useEffect} from 'react';
import Axios from 'axios' //npm i axios
import '../Style/housestyle.css'
import {useNavigate} from "react-router-dom";
import Loginusernavbar from './LoginuserNavbar';
export default function Plot()  {
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

        const [plotdetails, setDetails] = useState(
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
                        
            formData.append('name', plotdetails.name);
            formData.append('address', plotdetails.address);
            formData.append('area', plotdetails.area);
            formData.append('price', plotdetails.price);
            formData.append('photos', getimages);
            formData.append('state',getstate );
            formData.append('district', getcity);
            formData.append('mobileno', plotdetails.mobileno);
            
            if(plotdetails.name&&plotdetails.address&&plotdetails.area&&plotdetails.price&&getcity&&getstate&&(9999999999>plotdetails.mobileno &&plotdetails.mobileno>999999999))
            {
                 Axios({
                    method: "post",
                    url: "http://localhost:3009/insertplotdetails",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    alert(response.data.message);nevigate("/Loginuserdashboard")
                  }).catch(err=>console.log(err))
            }
            else
            {
                alert("Error!!! Fill mandatory data or incorrect mobile no.")
            }  
        }
    
        const handleChange = (e) => {
            setDetails({...plotdetails, [e.target.name]: e.target.value});
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
    <h1>Plot Details</h1></div>
            <Loginusernavbar></Loginusernavbar>
      <div id="main2">
            <form encType="multipart/form-data" method='post' onSubmit={handleSubmit}>
                <table style={{marginLeft:"15%"}}>
                    <tr><td className='d'>Enter your Full name</td><td><input type="text"placeholder="name"
                name="name"value={plotdetails.name} onChange={handleChange}/></td></tr>

        <tr><td className='d'>Enter Mobile No</td><td><input type="number" id="mobileno"
                    name='mobileno' value={plotdetails.mobileno} onChange={handleChange}></input></td></tr>

                    <tr><td className='d'>Enter your Address</td><td><textarea rows="5" id="address"
                    placeholder="Enter Your Address" name='address'value={plotdetails.address} 
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

                
                    <tr><td className='d'>Enter Area of Plot</td><td><input type="number" id="area" min="0" placeholder="in Sq.Ft"
                    name='area' value={plotdetails.area} onChange={handleChange}></input></td></tr>

                    <tr><td className='d'>Enter Price of Plot</td><td><input type="number" id="price"
                    name='price' value={plotdetails.price} onChange={handleChange}></input></td></tr>
                
                <tr><td><input type="file" accept=".png, .jpg, .jpeg,.jfif" name="photos" onChange={handlePhoto} /></td></tr>

                    <tr><td className='d' style={{textAlign: "center"}} colSpan="2"><input type="submit"></input></td></tr>

                </table>
            </form>  
            </div>
    </div>
    );
  }
