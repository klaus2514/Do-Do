import "./Styles/ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function ChatWindow() {
    const {
        prompt, setPrompt,
        reply, setReply,
        currThreadid, setCurrThreadid,
        setPrevChats, setNewChat
    } = useContext(MyContext);

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // ✅ Set threadId once after initial mount
    useEffect(() => {
        if (!currThreadid) {
            const newId = uuidv4();
            setCurrThreadid(newId);
        }
    }, [currThreadid, setCurrThreadid]);

    const getReply = async () => {
        if (!currThreadid || !prompt.trim()) return;

        setLoading(true);
        setNewChat(false);

        const token = localStorage.getItem('token');

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadid
            })
        };

        try {
            const response = await fetch("http://localhost:8080/api/chat", options);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const res = await response.json();
            setReply(res.reply);
        } catch (err) {
            console.error("Fetch error:", err.message);
            setReply("❌ Failed to fetch reply. Please try again.");
        }

        setLoading(false);
    };

    // ✅ Append user & assistant messages to chat history
    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => [
                ...prevChats,
                { role: "user", content: prompt },
                { role: "assistant", content: reply }
            ]);
        }
        setPrompt("");
    }, [reply]);

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>Do-Do <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>

            {isOpen && (
                <div className="dropDown">
                    <div className="dropDownItem" onClick={handleLogout}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                    </div>
                </div>
            )}

            <Chat />

            <ScaleLoader color="#fff" loading={loading} />

            <div className="chatInput">
                <div className="inputBox">
                    <input
                        placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : null}
                    />
                    <div id="submit" onClick={getReply}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                <p className="info">
                    Do-Do can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    );
}

export default ChatWindow;
