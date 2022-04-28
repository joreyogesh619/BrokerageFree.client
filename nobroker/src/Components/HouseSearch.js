import React ,{useState} from 'react';
import Axios from 'axios';
import Searchdata from './Searchdata';
export default function HouseSearch () {
  const [collection,setCollection]= useState("BuyHouse");//selected value from drop downbox
  const [district,setDistrict]=useState("");//search box value
  const [data,setData]=useState([{
                name: '',
                address: '',
                state:'',
                district:'',
                noofhalls: 0,
                noofbedrooms: 0,
                noofbathroom: 0,
                bathroomtype:'',
                noofkitchen: 0,
                nooftoilet: 0,
                noofbalconies: 0,
                area:0,
                price:0,
                photos:"",
                mobileno:0
  }]
  );
  
  
  function onSearch()
  {
  Axios.get(`http://localhost:3009/searchdata${collection}`)
  .then((result) => {
    console.log(result);
      setData(result.data);
      console.log(data);
    }).catch((err) => {
          console.log(err);
    })
    console.log(data);
  }

  return (
    <div id="fetchdata">
      <button onClick={onSearch}>Search</button>
    {data.map((d) => {
        return (
          <Searchdata
            name={d}
          ></Searchdata>
        );
      })}
        
    </div>
  )
}
