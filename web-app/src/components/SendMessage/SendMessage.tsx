import React, {FC, useEffect, useState} from 'react';

import {useAddMessageMutation, useUpdateMessageMutation} from '../../store';
import {chatAction} from "../../constants";
import {IMessage} from "../../interfaces";

interface IProps {
    scroll: React.MutableRefObject<any>,
    action: string,
    messageForUpdate?: IMessage,
    setAction: React.Dispatch<React.SetStateAction<string>>,
}

const SendMessage: FC<IProps> = ({ scroll, action, messageForUpdate, setAction }) => {
    const [addMessage, { isLoading }] = useAddMessageMutation();
    const [updateMessage] = useUpdateMessageMutation();
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (action === chatAction.update) {
            setMessage(messageForUpdate?.text as string);
        }
    }, [action]);

    const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() === '') {
            alert('Enter valid message');

            return;
        }

        if (action === chatAction.create) {
            await addMessage({
                userId: localStorage.getItem('userId'),
                userName: localStorage.getItem('userName'),
                text: message,
                attachedFiles: [],
            });
        } else {
            await updateMessage({
                id: messageForUpdate?.id,
                body: {
                    userId: localStorage.getItem('userId'),
                    userName: localStorage.getItem('userName'),
                    text: message,
                    attachedFiles: [],
                }
            });

            setAction(chatAction.create);
        }

        setMessage('');
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <form
                onSubmit={(event) => sendMessage(event)}
                className="send-message"
            >
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
                <button type="submit">
                    {action === chatAction.create ? 'Send' : 'Update'}
                </button>
                {isLoading && ' Loading...'}
            </form>
        </>
    );
};

export { SendMessage };
