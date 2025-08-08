import "./Styles/Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    const {
        allThreads, setAllThreads,
        currThreadid, setNewChat,
        setPrompt, setReply,
        setCurrThreadid, setPrevChats
    } = useContext(MyContext);

    const [isHidden, setIsHidden] = useState(false); // 👈 Sidebar visibility state
    const token = localStorage.getItem("token");

    const getAllThreads = async () => {
        try {
            const response = await fetch("https://do-do.onrender.com/api/thread", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText);
            }

            const res = await response.json();
            const filteredData = res.map(thread => ({
                threadId: thread.threadId,
                title: thread.title
            }));
            setAllThreads(filteredData);
        } catch (err) {
            console.error("Error fetching threads:", err.message);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadid]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadid(uuidv1());
        setPrevChats([]);
    };

    const changeThread = async (newThreadId) => {
        setCurrThreadid(newThreadId);
        try {
            const response = await fetch(`https://do-do.onrender.com/api/thread/${newThreadId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText);
            }

            const res = await response.json();
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.error("Error loading thread:", err.message);
        }
    };

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`https://do-do.onrender.com/api/thread/${threadId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText);
            }

            const res = await response.json();
            

            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));
            if (threadId === currThreadid) {
                createNewChat();
            }
        } catch (err) {
            console.error("Error deleting thread:", err.message);
        }
    };

    return (
        <>
            <i
                className="fa-solid fa-square-minus sidebar-toggle"
                onClick={() => setIsHidden(!isHidden)}
            ></i>

            <section className={`sidebar ${isHidden ? "sidebar-hidden" : ""}`}>
                <button onClick={createNewChat}>
                    <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo" />
                    <span><i className="fa-solid fa-pen-to-square"></i></span>
                </button>

                <ul className="history">
                    {
                        allThreads?.map((thread, idx) => (
                            <li
                                key={idx}
                                onClick={() => changeThread(thread.threadId)}
                                className={thread.threadId === currThreadid ? "highlighted" : ""}
                            >
                                {thread.title}
                                <i
                                    className="fa-solid fa-trash"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteThread(thread.threadId);
                                    }}
                                ></i>
                            </li>
                        ))
                    }
                </ul>

                <div className="sign">
                    <p>By Manjeet Sharan &hearts;</p>
                </div>
            </section>
        </>
    );
}

export default Sidebar;
