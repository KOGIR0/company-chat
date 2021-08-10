import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Link, Route} from "react-router-dom";
import styles from './Chat.module.css';
import Chat from "./Chat";
import {
    addTalkMessage, 
    addWorkMessage,
    selectTalkMessages,
    selectWorkMessages,
    deleteTalkMessage,
    deleteWorkMessage,
    changeTalkMessage,
    changeWorkMessage
    } 
    from "./chatSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import LoginPage from "./LoginPage";

export function CompanyChat()
{
    const dispatch = useAppDispatch();
    const talkMessages = useAppSelector(selectTalkMessages);
    const workMessages = useAppSelector(selectWorkMessages);
    
    localStorage.setItem('talkMessages', JSON.stringify(talkMessages));
    localStorage.setItem('workMessages', JSON.stringify(workMessages));

    const onWorkMessageSend = (message: {name: string, message: string}) => {
        dispatch(addWorkMessage({name: message.name, message: message.message}))
    };
    const onTalkMessageSend = (message: {name: string, message: string}) => {
        dispatch(addTalkMessage({name: message.name, message: message.message}))
    };

    const onWorkMessageChange = (message: {index : number, message: string}) => {
        dispatch(changeWorkMessage({index: message.index, message: message.message}))
    };
    const onTalkMessageChange = (message: {index : number, message: string}) => {
        dispatch(changeTalkMessage({index: message.index, message: message.message}))
    }

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
                        onSend={onWorkMessageSend}
                        onDelete={(i : number) => dispatch(deleteWorkMessage(i))}
                        onChange={onWorkMessageChange} 
                        />} />
                    <Route path="/talk"
                        element={<Chat chatName="Talk Chat"
                        messages={talkMessages}
                        onSend={onTalkMessageSend}
                        onDelete={(i : number) => dispatch(deleteTalkMessage(i))}
                        onChange={onTalkMessageChange}
                        />} />
                </Routes>
            </div>
        </Router>
    )
}