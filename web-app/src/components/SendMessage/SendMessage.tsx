import React, {FC, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";
import {IconButton} from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {useAddMessageMutation, useUpdateMessageMutation} from '../../store';
import {chatAction} from "../../constants";
import {IMessage} from "../../interfaces";
import {storage} from "../../firebase.ts";
import style from './SendMessage.module.css';

interface IProps {
    scroll: React.MutableRefObject<any>,
    action: string,
    messageForUpdate?: IMessage,
    setAction: React.Dispatch<React.SetStateAction<string>>,
}

const SendMessage: FC<IProps> = ({
    scroll,
    action,
    messageForUpdate,
    setAction,
}) => {
    const [addMessage, { isLoading }] = useAddMessageMutation();
    const [updateMessage] = useUpdateMessageMutation();
    const [message, setMessage] = useState<string>('');

    const [files, setFiles] = useState<any[]>([]);
    const [percent, setPercent] = useState<number>(0);
    const [attachedFileUrls, setAttachedFileUrls] = useState<string[]>([]);

    useEffect(() => {
        const send = async () => {
           await addMessage({
                userId: localStorage.getItem('userId'),
                userName: localStorage.getItem('userName'),
                text: message,
                attachedFiles: attachedFileUrls,
            });

            setAttachedFileUrls([]);
            setPercent(0);
            setMessage('');
        }
        if (attachedFileUrls.length && attachedFileUrls.length === files.length) {
            send().then();
        }
    }, [attachedFileUrls]);

    const handleMultipleChange = (event: any) => {
        setFiles([...event.target.files]);
    };

    const handleMultipleSubmit = () => {
        if (!files.length) {
            alert('Please upload an image first!');
        }

        for (const file of files) {
            const storageRef = ref(storage, `/files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
              'state_changed',
              (snapshot) => {
                  const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                  );

                  // update progress
                  setPercent(percent);
              },
              (err) => console.log(err),
              () => {
                  // download url
                  getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                      setAttachedFileUrls((prevState) => [...prevState, url]);
                  });
              },
            );
        }
    };

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
            handleMultipleSubmit();

/*            await addMessage({
                userId: localStorage.getItem('userId'),
                userName: localStorage.getItem('userName'),
                text: message,
                attachedFiles: attachedFileUrls,
            });*/
        } else {
            await updateMessage({
                id: messageForUpdate?.id,
                body: {
                    userId: localStorage.getItem('userId'),
                    userName: localStorage.getItem('userName'),
                    text: message,
                    attachedFiles: messageForUpdate?.attachedFiles,
                },
            });

            setAction(chatAction.create);
            setMessage('');
        }

        scroll.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {isLoading && ' Loading...'}
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

                <input
                    accept="image/*"
                    id="icon-button-file"
                    multiple
                    onChange={handleMultipleChange}
                    type="file"
                    style={{ display: 'none' }}
                />
                <label
                    htmlFor="icon-button-file"
                    style={{ backgroundColor: '#7cc5d9' }}
                >
                    <IconButton
                        color="default"
                        aria-label="upload picture"
                        component="span"
                    >
                        <FontAwesomeIcon icon={faPaperclip} title={'Attach'} />
                    </IconButton>
                </label>
                <p className={style.progress}>{percent} "% done"</p>

                <button type="submit">
                    {action === chatAction.create ? 'Send' : 'Update'}
                </button>
            </form>
        </>
    );
};

export { SendMessage };
