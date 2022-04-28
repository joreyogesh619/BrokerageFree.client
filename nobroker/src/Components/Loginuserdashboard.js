import React from 'react'
import Loginusernavbar2 from './Loginusernavbar2';
import Heading from './Heading';

import Searchbar from './Searchbar';
import Loginusersearchbar from './Loginusersearchbar';

export default function Loginuserdashboard() {

  return (

    <div class="container-fluid">
      <Heading></Heading>
      <div style={{backgroundColor: "lightblue",width:"100%"}} className="jumbotron text-center">
    <h1>Welcome to BrokerageFree.com</h1></div>
        <Loginusernavbar2></Loginusernavbar2>
        <Loginusersearchbar></Loginusersearchbar>
    </div>
  )
}
