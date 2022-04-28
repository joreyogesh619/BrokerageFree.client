import './App.css'
import Dashboard from './Components/Dashboard';
import LoginForm from './Components/LoginForm';
import House from './Components/House';
import HouseRent from './Components/HouseRent';
import Plot from './Components/Plot';
import Farm from './Components/Farm';
import Warehousesell from './Components/Warehousesell';
import WarehouseRent from './Components/WarehouseRent';
import Rfarmhouse from './Components/Rfarmhouse';
import Hostel from './Components/Hostel';
import Flat from './Components/Flat';
import FlatR from './Components/FlatR';
import Farmhouse from './Components/Farmhouse';
import HouseSearch from './Components/HouseSearch';
import RegistrationForm from './Components/RegistrationForm';
import Userprofile from './Components/Userprofile';
import Loginuserdashboard from './Components/Loginuserdashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import Editprofile from './Components/Editphoto';
import Admindashboard from './Components/Admindashboard';
import Editpassword from './Components/Editpassword';
import Editmobileno from './Components/Editmobileno';
import Editphoto from './Components/Editphoto';
import Feedback2 from './Components/Feedback2';
import Adminprofile from './Components/Adminprofile';
import Feedbacktable from './Components/Feedbacktable';
import Aboutus from './Components/Aboutus';

function App() {
  const [user,setLoginUser]=useState({});
  return (
    <div>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/LoginForm" element={<LoginForm/>}/>
         <Route path="/RegistrationForm" element={<RegistrationForm/>}></Route>
         <Route path="/Dashboard" element={<Dashboard/>}></Route>
         <Route path="/House" element={<House/>}></Route>
         <Route path="/HouseRent" element={<HouseRent/>}></Route>
         <Route path="/Plot" element={<Plot/>}></Route>
         <Route path="/Warehousesell" element={<Warehousesell/>}></Route>
         <Route path="/WarehouseRent" element={<WarehouseRent/>}></Route>
         <Route path="/Rfarmhouse" element={<Rfarmhouse/>}></Route>
         <Route path="/Hostel" element={<Hostel/>}></Route>
         <Route path="/Flat" element={<Flat/>}></Route>
         <Route path="/FlatR" element={<FlatR/>}></Route>
         <Route path="/Farmhouse" element={<Farmhouse/>}></Route>
         <Route path="/HouseSearch" element={<HouseSearch/>}></Route>
         <Route path="/Farm" element={<Farm/>}></Route>
         <Route path="/Userprofile" element={<Userprofile data={user}/>}></Route>
         <Route path="/Loginuserdashboard" element={<Loginuserdashboard/>}></Route>
         <Route path="/Editprofile" element={<Editprofile/>}></Route>
         <Route path="/Admindashboard" element={<Admindashboard/>}></Route>
         <Route path="/Editpassword" element={<Editpassword/>}></Route>
         <Route path="/Editmobileno" element={<Editmobileno/>}></Route>
         <Route path="/Editphoto" element={<Editphoto/>}></Route>
         <Route path="/Feedback2" element={<Feedback2/>}></Route>
         <Route path="/Adminprofile" element={<Adminprofile/>}></Route>
         <Route path="/Feedbacktable" element={<Feedbacktable/>}></Route>
         <Route path="/Aboutus" element={<Aboutus/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
