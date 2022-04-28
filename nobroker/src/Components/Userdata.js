import React from 'react'

export default function Userdata(props) {
  return (
    <div>
        <form>
       <table className="table">
           <tr><th>Email Id</th><th>Name</th><th>Address</th><th>Date of birth</th>
           <th>Adhar number</th><th>Mobile No</th></tr>
       
           <tr><td>{props.name.Emailid}</td><td>{props.name.Fullname}</td><td>{props.name.Address}</td>
           <td>{props.name.Dateofbirth}</td>
           <td>{props.name.Adharnumber}</td><td>{props.name.Mobilenumber}</td></tr>
       
        </table>
        </form>

    </div>
  )
}
