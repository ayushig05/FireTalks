import './App.css';
import List from "./components/lists/lists";
import Chat from "./components/chats/chat";
import Detail from "./components/details/details";
import Login from "./components/login/login"
import Notification from './components/notifications/notification';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';

function App() {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className='loading'>Loading...</div>

  return (
    <div className='container'>
      {
        currentUser ? (
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
