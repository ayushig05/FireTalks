import React from 'react'
import "./details.css"
import { BsPersonSquare } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import { auth } from '../../lib/firebase';

const Detail = () => {
  return (
    <div className='detail'>
      <div className='user'>
        <BsPersonSquare className='img'/>
        <h2>Joe Doe</h2>
        <p>hello my name is joe doe</p>
      </div>
      <div className='info'>
        <div className='option'>
          <div className='title'>
            <span>Chat Settings</span>
            <IoIosArrowUp className='img'/>
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <span>Privacy & Help</span>
            <IoIosArrowUp className='img'/>
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <span>Shared Photos</span>
            <IoIosArrowDown className='img'/>
          </div>
        </div>
        <div className='photo'>
          <div className='item'>
            <div className='detail'>
              <BsPersonSquare className='img'/>
              <span>photo_2024_6.png</span>
            </div>
            <FaDownload className='img1'/>
          </div>
          <div className='item'>
            <div className='detail'>
              <BsPersonSquare className='img'/>
              <span>photo_2024_6.png</span>
            </div>
            <FaDownload className='img1'/>
          </div>
          <div className='item'>
            <div className='detail'>
              <BsPersonSquare className='img'/>
              <span>photo_2024_6.png</span>
            </div>
            <FaDownload className='img1'/>
          </div>
          <div className='item'>
            <div className='detail'>
              <BsPersonSquare className='img'/>
              <span>photo_2024_6.png</span>
            </div>
            <FaDownload className='img1'/>
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <span>Shared Files</span>
            <IoIosArrowUp className='img'/>      
          </div>
        </div>
        <button>Block User</button>
        <button className='btn' onClick={() => auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Detail