import React from 'react'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginStatus,
    selectUsername}
    from './chatSlice';
import styles from './Chat.module.css';
import cx from 'classnames'

type Props = {
    onSend: Function,
    onDelete: Function,
    messages: {name: string, message: string}[],
    chatName: string,
    onChange: Function
}

type messageProps = {
    onDelete: Function,
    message: {name: string, message: string},
    username: string,
    index: number,
    onChange: Function
}

function Message(props: messageProps)
{
    let divClass = styles.message;
    const isCurrentUser = props.message.name === props.username;
    const [isChanging, setIsChanging] = useState(false);
    let [message, setMessage] = useState(props.message.message);
    if(isCurrentUser)
    {
        divClass = cx(styles.userMessage, styles.message);
    } else {
        divClass = cx(styles.anotherUserMessage, styles.messages);
    }

    let submitChange = () => {
        setIsChanging(false);
        props.onChange({index: props.index, message: message});
    };

    if(isChanging)
    {
        return (<div className={divClass} key={props.index}>
            {props.message.name} : <input value={message} onChange={(e) => setMessage(e.target.value)}></input>
            <div>
                {isCurrentUser ? <button onClick={submitChange}>submit</button> : null}
            </div>
        </div>);
    } else {
        return (<div className={divClass} key={props.index}>
            {props.message.name} : {props.message.message}
            <div>
                {isCurrentUser ? <button onClick={() => {props.onDelete(props.index)}} >delete</button> : null}
                {isCurrentUser ? <button onClick={() => {setIsChanging(true)}}>change</button> : null}
            </div>
        </div>);
    }
}

function MessageInput(props : {onSend: Function})
{
    const login = useAppSelector(selectLoginStatus);
    const username = useAppSelector(selectUsername);
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        props.onSend({name: username, message: message})
    }

    if(login)
    {
        return (<div className={styles.messageInput}>
                <input onChange={(event) => { setMessage(event.target.value) }}
                    onKeyPress={(e) => e.key === "Enter" ? sendMessage() : null}>
                </input>
                <button onClick={sendMessage}>
                    send
                </button>
            </div>);
    } else {
        return (<div>Login to send messages</div>);
    }
}

export default function Chat(props : Props)
{
    const username = useAppSelector(selectUsername);

    return (<div>
        <h2>{props.chatName}</h2>
        <div className={styles.chatView}>
            {props.messages.map((m, index) => {
                return (<Message key={index} index={index} message={m}
                    username={username as string}
                    onDelete={props.onDelete}
                    onChange={props.onChange}/>);
                })}
        </div>
        <MessageInput onSend={props.onSend}/>
    </div>);
}