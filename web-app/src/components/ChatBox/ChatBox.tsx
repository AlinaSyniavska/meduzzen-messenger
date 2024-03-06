import { FC, useEffect, useRef, useState } from "react";
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Unsubscribe } from "firebase/auth";

import { Message } from "../Message/Message";
import { SendMessage } from "../SendMessage/SendMessage";
import { IMessage } from "../../interfaces";

const ChatBox: FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const scroll = useRef(null);

    useEffect((): Unsubscribe => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt"),
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [] as IMessage[];
            QuerySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id} as IMessage);
            });
            setMessages(messages);
        });
        return () => unsubscribe;
    }, [])

    return (
        <main className="chat-box">
            <div className="messages-wrapper">
                {messages?.map((message) => (
                    <Message key={message.id} message={message}/>
                ))}
            </div>
            {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
            <span ref={scroll}></span>
            <SendMessage scroll={scroll} />
        </main>
    );
};

export { ChatBox };
