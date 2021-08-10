import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Link, Route} from "react-router-dom";
import styles from './Chat.module.css';
import Chat from "./Chat";
import {
    addTalkMessage, 
    addWorkMessage,
    selectTalkMessages,
    selectWorkMessages} 
    from "./chatSlice";
import { useAppSelector } from '../../app/hooks';
import LoginPage from "./LoginPage";

export function CompanyChat()
{
    const talkMessages = useAppSelector(selectTalkMessages);
    const workMessages = useAppSelector(selectWorkMessages);
    
    localStorage.setItem('talkMessages', JSON.stringify(talkMessages));
    localStorage.setItem('workMessages', JSON.stringify(workMessages));
    return (
        <Router>
            <div className={styles.header}>
                <div>Company Chat</div>
                <Link to="/login">Login</Link>
                <Link to="/work">Work</Link>
                <Link to="/talk">Talk</Link>
            </div>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/work"
                        element={<Chat chatName="Work Chat"
                        messages={workMessages}
                        onSend={addWorkMessage} />} />
                    <Route path="/talk"
                        element={<Chat chatName="Talk Chat"
                        messages={talkMessages}
                        onSend={addTalkMessage}/>} />
                </Routes>
            </div>
        </Router>
    )
}