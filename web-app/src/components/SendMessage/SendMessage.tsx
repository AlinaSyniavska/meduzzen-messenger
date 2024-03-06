import React, { FC, useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { User } from "firebase/auth";

interface IProps {
    scroll: React.MutableRefObject<any>,
}

const SendMessage: FC<IProps> = ({scroll}) => {
    const [message, setMessage] = useState<string>('');

    const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() === "") {
            alert("Enter valid message");
            return;
        }

        const {uid, displayName, photoURL} = auth.currentUser as User;
        await addDoc(collection(db, "messages"), {
            text: message,
            name: displayName,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            uid,
        });
        setMessage("");

        scroll.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <form onSubmit={(event) => sendMessage(event)} className="send-message">
            <label htmlFor="messageInput" hidden>
                Enter Message
            </label>
            <input
                id="messageInput"
                name="messageInput"
                type="text"
                className="form-input__input"
                placeholder="type message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
};

export { SendMessage };
