import React from 'react'
import "./chatlist.css"
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useState } from 'react';
import { BsPersonSquare } from "react-icons/bs";
import AddUser from './adduser/addUser';

const Chatlist = () => {
  const [addMode, setAddMode] = useState(false);
  return (
    <div className='chatlist'>
      <div className='search'>
        <div className='searchbar'>
          <FaSearch />
          <input type='text' placeholder='Search'/>
        </div>
        <div onClick={() => setAddMode((prev) => !prev)}> 
          {addMode ? <FaMinus className="img add" /> : <FaPlus className="img add" />}
        </div>
      </div>
      <div className='item'>
        <BsPersonSquare className='img'/>
        <div className='text'>
          <span>Joe Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <BsPersonSquare className='img'/>
        <div className='text'>
          <span>Joe Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <BsPersonSquare className='img'/>
        <div className='text'>
          <span>Joe Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <BsPersonSquare className='img'/>
        <div className='text'>
          <span>Joe Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <BsPersonSquare className='img'/>
        <div className='text'>
          <span>Joe Doe</span>
          <p>Hello</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  )
}

export default Chatlist