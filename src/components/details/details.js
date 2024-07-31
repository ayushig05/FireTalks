import React from "react";
import "./details.css";
import { BsPersonSquare } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { 
  arrayRemove, 
  arrayUnion, 
  doc, 
  updateDoc 
} from "firebase/firestore";

const Detail = () => {
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || <BsPersonSquare />} alt="" />
        <h2>{user?.username}</h2>
        <p>Hello! my name is {user?.username}</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <IoIosArrowUp className="img" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <IoIosArrowUp className="img" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <IoIosArrowDown className="img" />
          </div>
        </div>
        <div className="photo">
          <div className="item">
            <div className="detail">
              <BsPersonSquare className="img" />
              <span>photo_2024_6.png</span>
            </div>
            <FaDownload className="img1" />
          </div>
          <div className="item">
            <div className="detail">
              <BsPersonSquare className="img" />
              <span>photo_2024_6.png</span>
            </div>
            <FaDownload className="img1" />
          </div>
          <div className="item">
            <div className="detail">
              <BsPersonSquare className="img" />
              <span>photo_2024_6.png</span>
            </div>
            <FaDownload className="img1" />
          </div>
          <div className="item">
            <div className="detail">
              <BsPersonSquare className="img" />
              <span>photo_2024_6.png</span>
            </div>
            <FaDownload className="img1" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <IoIosArrowUp className="img" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are blocked!"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button className="btn" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
