import React from 'react'
import { useEffect } from 'react';
import "./chatlist.css"
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useState } from 'react';
import { BsPersonSquare } from "react-icons/bs";
import AddUser from './adduser/addUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../../lib/firebase';

const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (response) => {
      const items = response.data().chats;

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return {...item, user};
      });

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unSub();
    };
  },[currentUser.id]);

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
      {chats.map((chat) => (
        <div className='item' key={chat.chatId}>
          <BsPersonSquare className='img'/>
          <div className='text'>
            <span>Joe Doe</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  )
}

export default Chatlist