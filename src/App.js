import './App.css';
import List from "./components/lists/lists";
import Chat from "./components/chats/chat";
import Detail from "./components/details/details";

function App() {
  return (
    <div className='container'>
      <List/>
      <Chat/>
      <Detail/>
    </div>    
  );
}

export default App;
