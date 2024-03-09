import React, { FC, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { IMessage } from '../../interfaces';
import { commonHelper } from '../../helpers';
import style from './Message.module.css';
import { useDeleteMessageMutation } from '../../store';
import {chatAction} from "../../constants";

interface IProps {
    message: IMessage;
    setMessageForUpdate: React.Dispatch<React.SetStateAction<IMessage>>,
    setAction: React.Dispatch<React.SetStateAction<string>>,
}

const Message: FC<IProps> = ({ message, setMessageForUpdate, setAction }) => {
    const [deleteMessage] = useDeleteMessageMutation();
    const userId = localStorage.getItem('userId');

    const initials = useMemo(
        () => commonHelper.getInitials(message.userName),
        [message.userName],
    );

    const editNote = () => {
        setAction(chatAction.update);
        setMessageForUpdate(message);
    };

    const deleteNote = () => {
        deleteMessage(message.id);
    };

    return (
        <div
            className={`chat-bubble ${message.userId === userId ? 'right' : ''}`}
        >
            <div className="chat-bubble__left">
                <span>{initials}</span>
            </div>
            <div className="chat-bubble__right">
                <p className="user-name">{message.userName}</p>
                <p className="user-message">{message.text}</p>
            </div>

            {message.userId === userId && (
                <div className={style.btnControl}>
                    <div className={style.btn} onClick={editNote}>
                        <FontAwesomeIcon icon={faPen} title={'Edit'} />
                    </div>

                    <div className={style.btn} onClick={deleteNote}>
                        <FontAwesomeIcon icon={faTrash} title={'Delete'} />
                    </div>
                </div>
            )}
        </div>
    );
};

export { Message };
