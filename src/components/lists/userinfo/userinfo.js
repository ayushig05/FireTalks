import React from 'react'
import "./userinfo.css"
import { FaVideo } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import { useUserStore } from '../../../lib/userStore';

const Userinfo = () => {

  const { currentUser } = useUserStore();

  return (
    <div className='userinfo'>
        <div className='user'>
            <img src={currentUser.avatar || <BsPersonSquare /> } />
            <h2>{currentUser.username}</h2>
        </div>
        <div className='icons'>
            <MdMoreHoriz className='img'/>
            <FaVideo className='img'/>
            <FaRegEdit className='img'/>
        </div>
    </div>
  )
}

export default Userinfo