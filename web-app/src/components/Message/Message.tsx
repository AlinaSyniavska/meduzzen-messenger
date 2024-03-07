import { FC, useMemo } from 'react';

import { IMessage } from '../../interfaces';
import { personHelper } from '../../helpers';

interface IProps {
    message: IMessage;
}

const Message: FC<IProps> = ({ message }) => {
    const initials = useMemo(() => personHelper.getInitials(message.userName), [message.userName],);

    const userId = localStorage.getItem('userId');

    return (
        <div
            className={`chat-bubble ${message.userId === userId ? 'right' : ''}`}
        >
            <div className="chat-bubble__left"><span>{initials}</span></div>
            <div className="chat-bubble__right">
                <p className="user-name">{message.userName}</p>
                <p className="user-message">{message.text}</p>
            </div>
        </div>
    );
};

export { Message };
