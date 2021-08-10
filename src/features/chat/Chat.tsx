import React from 'react'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginStatus,
    selectUsername}
    from './chatSlice';
import styles from './Chat.module.css';

type Props = {
    onSend: Function,
    onDelete: Function,
    messages: {name: string, message: string}[],
    chatName: string
}

export default function Chat(props : Props)
{
    const [message, setMessage] = useState('');
    const dispatch = useAppDispatch();
    const login = useAppSelector(selectLoginStatus);
    const username = useAppSelector(selectUsername);

    return <div>
        <h2>{props.chatName}</h2>
        <div className={styles.chatView}>
            {props.messages.map((m, index) => {
                let divClass = styles.message;
                if(m.name === username)
                {
                    divClass = styles.userMessage;
                }
                return (<div className={divClass} key={index}>
                    {m.name} : {m.message}
                    <button onClick={() => {dispatch(props.onDelete(index))}} >delete</button>
                    </div>);
                })}
        </div>
        { login ?
        <div>
            <input onChange={(event) => { setMessage(event.target.value) }}></input>
            <button onClick={() => {dispatch(props.onSend({name: username, message: message}))}}>send</button>
        </div> :
        <div>Login to send messages</div>}
    </div>;
}