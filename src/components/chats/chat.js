import React from "react";
import { useState, useRef, useEffect } from "react";
import "./chat.css";
import { BsPersonSquare } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import Upload from "../../lib/upload";
import Detail from "../details/details";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const [showDetails, setShowDetails] = useState(false);

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (response) => {
      setChat(response.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  console.log(chat);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await Upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setImg({
        file: null,
        url: "",
      });

      setText("");
    }
  };

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const handleBack = () => {
    setShowDetails(false);
  };

  return (
    <div className="chat">
      {showDetails ? (
        <Detail onBack={handleBack} />
      ) : (
        <>
          <div className="top">
            <div className="user" onClick={toggleDetails}>
              <img src={user?.avatar || <BsPersonSquare />} alt="" />
              <div className="text">
                <span>{user?.username}</span>
                <p>Hello! my name is {user?.username}</p>
              </div>
            </div>
            <div className="icons">
              <FaPhoneAlt className="img" />
              <FaVideo className="img" />
              <FaInfoCircle className="img" onClick={toggleDetails}/>
            </div>
          </div>
          <div className="center">
            {chat?.messages?.map((message) => {
              const createdAt = message.createdAt
                ? new Date(message.createdAt.seconds * 1000)
                : null;
              return (
                <div
                  className={
                    message.senderId === currentUser?.id
                      ? "message own"
                      : "message"
                  }
                  key={message?.createdAt?.seconds || Math.random()}
                >
                  <div className="text">
                    {message.img && (
                      <img src={message.img} alt="Message Image" />
                    )}
                    <p>{message.text}</p>
                    <span>
                      {createdAt
                        ? createdAt.toLocaleTimeString()
                        : "Unknown Time"}
                    </span>
                  </div>
                </div>
              );
            })}
            {img.url && (
              <div className="message own">
                <div className="texts">
                  <img src={img.url} alt="Preview" />
                </div>
              </div>
            )}
            <div ref={endRef}></div>
          </div>
          <div className="bottom">
            <div className="icons">
              <label htmlFor="file">
                <FaImage className="img" />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleImg}
              />
              <FaCamera className="img" />
              <FaMicrophone className="img" />
            </div>
            <input
              type="text"
              placeholder={
                isCurrentUserBlocked || isReceiverBlocked
                  ? "You cannot send a message"
                  : "Type a message..."
              }
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isCurrentUserBlocked || isReceiverBlocked}
            />
            <div className="emoji">
              <MdEmojiEmotions
                className="img"
                onClick={() => setOpen((prev) => !prev)}
              />
              <EmojiPicker
                open={open}
                onEmojiClick={handleEmoji}
                className="picker"
              />
            </div>
            <button
              className="btn"
              onClick={handleSend}
              disabled={isCurrentUserBlocked || isReceiverBlocked}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
