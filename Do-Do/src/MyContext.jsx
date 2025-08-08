import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [currThreadid, setCurrThreadid] = useState("");
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(false); 
  const [allThreads, setAllThreads] = useState([]);

  return (
    <MyContext.Provider
      value={{
        token, setToken,
        prompt, setPrompt,
        reply, setReply,
        currThreadid, setCurrThreadid,
        prevChats, setPrevChats,
        newChat, setNewChat,
        allThreads, setAllThreads
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
