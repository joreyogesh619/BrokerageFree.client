import {React,useEffect,useState} from 'react'
import axios from 'axios';
import Heading from './Heading';
import Adminnavbar from './Adminnavbar';
import '../Style/Feedbacktablestyle.css'

export default function Feedbacktable() {
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3009/getfeedback')
        .then(res=>{setData(res.data.result);console.log(res)})
        .catch(err=>console.log(err))
      })
  return (
    <div>
        <Heading></Heading>
        <div style={{backgroundColor: "lightblue",width:"100%"}} className="jumbotron text-center">
    <h1>Feedback Data</h1>
          </div>
       <Adminnavbar></Adminnavbar>

    <div class="container">
  <table class="table table-fixed">
    <thead>
      <tr>
        <th class="col-xs-3" style={{"backgroundColor":"#f39c12"}}>Rating</th>
        <th class="col-xs-3" style={{"backgroundColor":"#f39c12"}}>Description</th>
      </tr>
    </thead>
    <tbody>
    {data.map((e)=>{
        return(
         <tr><td className="col-xs-3">{e.rating}</td><td className="col-xs-3">{e.feedbackdata}</td></tr>
        )
      })}
    </tbody>
  </table>
</div>

    </div>
  )
}
