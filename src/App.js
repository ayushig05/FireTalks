import './App.css';
import List from "./components/lists/lists";
import Chat from "./components/chats/chat";
import Detail from "./components/details/details";
import Login from "./components/login/login"
import Notification from './components/notifications/notification';

function App() {
  const user =true

  return (
    <div className='container'>
      {
        user ? (
          <>
            <List/>
            <Chat/>
            <Detail/>
          </>
        ) : ( <Login /> )
      }
      <Notification />
    </div>    
  );
}

export default App;
