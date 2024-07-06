import React from 'react'
import { 
  useState, 
  useRef, 
  useEffect } from 'react';
import "./chat.css"
import { BsPersonSquare } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
  const [open,setOpen] = useState(false)
  const [text,setText] = useState("")

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviour: "smooth" })
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  }

  return (
    <div className='chat'>
      <div className='top'>
        <div className='user'>
          <BsPersonSquare className='img'/>
          <div className='text'>
            <span>Joe Doe</span>
            <p>hello my name is joe doe.</p>
          </div>
        </div>
        <div className='icons'>
          <FaPhoneAlt className='img'/>
          <FaVideo className='img'/>
          <FaInfoCircle className='img'/>
        </div>
      </div>
      <div className='center'>
        <div className='message'>
          <BsPersonSquare className='img'/>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message'>
          <BsPersonSquare className='img'/>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message'>
          <BsPersonSquare className='img'/>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message'>
          <BsPersonSquare className='img'/>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message'>
          <BsPersonSquare className='img'/>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message'>
          <BsPersonSquare className='img'/>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message'>
          <BsPersonSquare className='img'/>
          <div className='text'>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
          <div className='text'>
            <BsPersonSquare className='img'/>
            <p>hello my name is joe doe</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className='bottom'>
        <div className='icons'>
          <FaImage className='img'/>
          <FaCamera className='img'/>
          <FaMicrophone className='img'/>
        </div>
        <input type='text' placeholder='Type a messgae...' value={text} onChange={(e) => setText(e.target.value)}/>
        <div className='emoji'>
          <MdEmojiEmotions className='img' onClick={() => setOpen((prev) => !prev)}/>
          <EmojiPicker open={open} onEmojiClick={handleEmoji} className='picker'/>
        </div>
        <button className='btn'>Send</button>
      </div>
    </div>
  )
}

export default Chat