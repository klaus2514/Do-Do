import './App.css';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import Chat from './Chat';
import { MyContext, MyProvider } from './MyContext';
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";

function App(){
  const[prompt, setPrompt]= useState("");
  const [reply, setReply]= useState(null);
  const [currThreadid, setCurrThreadid]= useState(uuidv1);
  const[prevChats,setPrevChats]= useState([]);
  const [newChat, setNewChat]= useState(true);
  const [allThreads, setAllthreads]= useState([]);

  const providerValues= {
    prompt, setPrompt,
    reply, setReply,
    currThreadid, setCurrThreadid,
    newChat, setNewChat,
    prevChats,setPrevChats,
    allThreads,setAllthreads
  };
  return(
    <MyProvider>
    <div className='main'>
      {/* <MyContext.provider values= {providerValues}/> */}
      <Sidebar></Sidebar>
      <ChatWindow></ChatWindow>
    </div>
    </MyProvider>
  )
}

export default App;