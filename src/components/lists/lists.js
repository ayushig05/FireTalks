import React from "react";
import "./lists.css";
import UserInfo from "./userinfo/userinfo";
import ChatList from "./chatlist/chatlist";

const List = () => {
  return (
    <div className="list">
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;
