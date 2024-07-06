import React from 'react'
import "./addUser.css"
import { BsPersonSquare } from "react-icons/bs";

const AddUser = () => {
  return (
    <div className='addUser'>
      <form>
        <input type='text' placeholder='Username' name='username'/>
        <button>Search</button>
      </form>
      <div className='user'>
        <div className='detail'>
          <BsPersonSquare className='img'/>
          <span>Joe Doe</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  )
}

export default AddUser
