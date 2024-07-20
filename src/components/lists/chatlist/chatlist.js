import React from "react";
import { useEffect } from "react";
import "./chatlist.css";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";
import { BsPersonSquare } from "react-icons/bs";
import AddUser from "./adduser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { 
  doc, 
  getDoc, 
  onSnapshot, 
  updateDoc 
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState(false);

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (response) => {
        const items = response.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter((c) => {
    if (typeof input !== "string") {
      console.error("Input is not a string:", input);
      return false;
    }
    return c.user.username.toLowerCase().includes(input.toLowerCase());
  });

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchbar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div onClick={() => setAddMode((prev) => !prev)}>
          {addMode ? (
            <FaMinus className="img add" />
          ) : (
            <FaPlus className="img add" />
          )}
        </div>
      </div>
      {filteredChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe" }}
        >
          <img
            src={
              chat.user.blocked.includes(currentUser.id) ? (
                <BsPersonSquare />
              ) : (
                chat.user.avatar || <BsPersonSquare />
              )
            }
            alt=""
          ></img>
          <div className="text">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};

export default Chatlist;
