import Heading from './Heading';
import React ,{useState,useEffect} from 'react';
import axios from 'axios' //npm i axios
import '../Style/housestyle.css'
import {useNavigate} from "react-router-dom";
import Loginusernavbar from './LoginuserNavbar';
export default function House()  {
    const nevigate=useNavigate();
        const [data,setData]=useState([]);
        var [district,setDistrict]=useState([]);
        const [getstate,setState]=useState('');
        const [getcity,setCity]=useState('');
        const [getimages,setgetImages]=useState('');

        useEffect(()=>{
            axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
            .then(res=>setData(res.data))
            .catch(err=>console.log(err));
        },[])
    
        const country=[...new Set(data.map(item=> item.country))];
        country.sort();
        const indiadata=data.filter(c=>c.country==='India');

        const states=[...new Set(indiadata.map(i=>i.subcountry))];
        states.sort();
        const [housedetails, setDetails] = useState(
            {
                name: '',
                address: '',
                noofhalls: 0,
                noofbedrooms: 0,
                noofbathroom: 0,
                bathroomtype:'',
                noofkitchen: 0,
                nooftoilet: 0,
                noofbalconies: 0,
                area:0,
                price:0,
                mobileno:0
            }
        );
  
        const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData();                      
            formData.append('name', housedetails.name);
            formData.append('address', housedetails.address);
            formData.append('noofhalls', housedetails.noofhalls);
            formData.append('noofbedrooms', housedetails.noofbedrooms);
            formData.append('noofbathroom', housedetails.noofbathroom);
            formData.append('bathroomtype', housedetails.bathroomtype);
            formData.append('noofkitchen', housedetails.noofkitchen);
            formData.append('nooftoilet', housedetails.nooftoilet);
            formData.append('noofbalconies', housedetails.noofbalconies);
            formData.append('area', housedetails.area);
            formData.append('price', housedetails.price);
            formData.append('photos', getimages);
            formData.append('state',getstate );
            formData.append('district', getcity);
            formData.append('mobileno', housedetails.mobileno);
            
            if(housedetails.name && housedetails.address && getcity && getcity && (9999999999>housedetails.mobileno && housedetails.mobileno>999999999) && housedetails.area && housedetails.price)
            {
                 axios({
                    method: "post",
                    url: "http://localhost:3009/inserthousedetails",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    alert(response.data.message);nevigate("/Loginuserdashboard")
                  }).catch(err=>console.log(err))
            }    
            else{
                alert("Error!!! Fill mandatory data or incorrect mobile no.")
            } 
        }
    
        const handleChange = (e) => {
        
            setDetails({...housedetails, [e.target.name]: e.target.value});
            
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
    <h1>House Details</h1></div>
        <Loginusernavbar></Loginusernavbar>
      <div id="main2">
            <form encType="multipart/form-data" method='post' onSubmit={handleSubmit}>
                <table style={{marginLeft:"15%"}} className='t'>
                    <tr className='r'><td className='d'>Enter your Full name</td><td><input type="text"placeholder="name"
                name="name"value={housedetails.name} onChange={handleChange}/></td></tr>

                <tr className='r'><td className='d'>Enter Mobile No</td><td><input type="number" id="mobileno" min={999999999} max={9999999999}
                    name='mobileno' value={housedetails.mobileno} onChange={handleChange}></input></td></tr>

                    <tr className='r'><td className='d'>Enter your Address</td><td><textarea rows="5" id="address"
                    placeholder="Enter Your Address" name='address'value={housedetails.address} 
                    onChange={handleChange}></textarea></td></tr>

                    <tr className='r'>
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

                    <tr className='r'><td className='d'>Enter Number of halls</td><td><input type="number" id="noofhalls" min="0"
                    name='noofhalls' value={housedetails.noofhalls} onChange={handleChange}></input></td></tr>

                    <tr className='r'><td className='d'>Enter Number of Bedrooms</td><td><input type="number" id="noofbedrooms" min="0"
                    name='noofbedrooms' value={housedetails.noofbedrooms} onChange={handleChange}></input></td></tr>    

                    <tr className='r'><td className='d'>Enter Number of Kitchen</td><td><input type="number" id="noofkitchen" min="0"
                    name='noofkitchen' value={housedetails.noofkitchen} onChange={handleChange}></input></td></tr>

                    <tr className='r'><td className='d'>Enter Number of Toilet</td><td><input type="number" id="nooftoilet" min="0"
                    name='nooftoilet' value={housedetails.nooftoilet} onChange={handleChange}></input></td></tr>

                    <tr className='r'><td className='d'>Enter Number of Bathroom</td><td><input type="number" id="noofbathroom" min="0"
                    name='noofbathroom' value={housedetails.noofbathroom} onChange={handleChange}></input></td></tr>

                    <tr className='r'><td className='d'>Type of Bathroom</td><td className='d'>Combined 
                        <input type="radio" name="bathroomtype" id="combined"
                    value="combined" onChange={handleChange}></input>
                           Separate <input type="radio" name="bathroomtype" id="separate"
                           value="separate" onChange={handleChange}></input></td></tr>


                    <tr className='r'><td className='d'>Enter Number of Balconies</td><td><input type="number" id="noofbalconies" min="0"
                    name='noofbalconies' value={housedetails.noofbalconies} onChange={handleChange}></input></td></tr>

                    <tr className='r'><td className='d'>Enter Area of House</td><td><input type="number" id="area" min="0" placeholder="in Sq.Ft"
                    name='area' value={housedetails.area} onChange={handleChange}></input></td></tr>

                    <tr className='r'><td className='d'>Enter Price of House</td><td><input type="number" id="price"
                    name='price' value={housedetails.price} onChange={handleChange}></input></td></tr>
                
                <tr className='r'><td><input type="file" accept=".png, .jpg, .jpeg,.jfif" name="photos" onChange={handlePhoto} /></td></tr>

                    <tr className='r'><td className='d' style={{textAlign: "center"}} colSpan="2"><input type="submit"></input></td></tr>

                </table>
            </form>  
            </div>
    </div>
    );
  }
  

