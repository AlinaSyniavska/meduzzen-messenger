import React, { FC, useState } from 'react';

import { useAddMessageMutation } from '../../store';

interface IProps {
    scroll: React.MutableRefObject<any>;
}

const SendMessage: FC<IProps> = ({ scroll }) => {
// const SendMessage: FC<IProps> = () => {
    const [addMessage, { isLoading }] = useAddMessageMutation();

    const [message, setMessage] = useState<string>('');

    const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() === '') {
            alert('Enter valid message');
            return;
        }

        await addMessage({
            userId: localStorage.getItem('userId'),
            userName: localStorage.getItem('userName'),
            text: message,
            attachedFiles: [],
        });

        setMessage('');

        scroll.current.scrollIntoView({ behavior: 'smooth' });
    };

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
            {isLoading && ' Loading...'}
        </form>
    );
};

export { SendMessage };
