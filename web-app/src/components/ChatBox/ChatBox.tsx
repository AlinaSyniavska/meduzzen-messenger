import { FC, useRef, useState } from 'react';

import { Message } from '../Message/Message';
import { SendMessage } from '../SendMessage/SendMessage';
import { useGetMessagesQuery } from '../../store';
import style from './ChatBox.module.css';
import {chatAction} from "../../constants";
import {IMessage} from "../../interfaces";

const ChatBox: FC = () => {
    const { data: messages = [], isError, error } = useGetMessagesQuery();
    const scroll = useRef<any>(null);
    const [messageForUpdate, setMessageForUpdate] = useState<IMessage>({} as IMessage);
    const [action, setAction] = useState<string>(chatAction.create);

    if (isError) {
        console.log({ error });
        return (
            <div className={`${style.text}, ${style.error}`}>
                Error was received...<span ref={scroll}></span>
            </div>
        );
    }

    return (
        <main className="chat-box">
            <div className="messages-wrapper">
                {messages?.map((message) => (
                    <Message key={message.id} message={message} setMessageForUpdate={setMessageForUpdate} setAction={setAction}/>
                ))}
                <div ref={scroll} style={{
                  height: 70,
                }}></div>
            </div>

            <SendMessage scroll={scroll} action={action} messageForUpdate={messageForUpdate} setAction={setAction}/>
        </main>
    );
};

export { ChatBox };
