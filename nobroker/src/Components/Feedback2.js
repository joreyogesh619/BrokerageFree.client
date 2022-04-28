import {React,useState} from 'react'
import {FaStar} from 'react-icons/fa';
import Heading from './Heading';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

export default function Feedback2() {

    const nevigate=useNavigate();
    const color={
        orange:"#FFBA5A",
        grey:"#a9a9a9"
    }
    const styles={
        container:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        },
        textarea:{
            border:"1px solid #a9a9a9",
            borderRadius:5,
            width:500,
            margin:"20px 0",
            minHeight:200,
            padding:10,
            fontSize:"25px"
        },
        button:{
            border:"1px solid #a9a9a9",
            borderRadius:5,
            width:300,
            padding:10,
            fontSize:"20px"
        }
        
    }
    const stars=Array(5).fill(0);
    const [currentvalue,setCurrentvalue]=useState(0);
    const [hovervalue,setHovervalue]=useState(undefined);
    const [feedbackdata,setFeedbackdata]=useState("");
    const handleClick=value=>{
        setCurrentvalue(value);
        console.log(currentvalue);
    }
    const handleMouseHover=value=>{
        setHovervalue(value);
    }
    const handleMouseLeave=()=>{
        setHovervalue(undefined);
    }
    function handleSubmit(){
        console.log(currentvalue);
        axios.post("http://localhost:3009/insertfeedback",{"feedbackdata":feedbackdata,"rating":currentvalue})
        .then(res=>{alert(res.data.message); nevigate("/Loginuserdashboard")})
        .catch(err=>console.log(err))
    }

  return (
    <div style={styles.container}>
        <Heading></Heading>
        <div style={{backgroundColor: "lightblue",width:"100%"}} className="jumbotron text-center">
    <h1>Feedback Form</h1>
          </div>

        <div style={styles.stars}>
            {
                stars.map( (_,index)=>{
                    return(
                        <FaStar key={index}
                        size={24}
                        style={{marginRight:10,cursor:"pointer"}}
                        color={(hovervalue||currentvalue)>index?color.orange:color.grey}
                        onClick={()=>handleClick(index+1)}
                        onMouseOver={()=>handleMouseHover(index+1)}
                        onMouseLeave={handleMouseLeave}/>
                    )
                })
            }

        </div>
         <textarea placeholder='What is your Feedback' style={styles.textarea}
         onChange={(e)=>{setFeedbackdata(e.target.value)}}></textarea>
        <button style={styles.button} onClick={handleSubmit}>Submit</button>
        <br></br>
        <button style={styles.button}>Back</button>
    
    </div>
  )
}
