import {FC, useRef} from "react";

import { Message } from "../Message/Message";
import { SendMessage } from "../SendMessage/SendMessage";
import {useGetMessagesQuery} from "../../store";
import style from './ChatBox.module.css';

const ChatBox: FC = () => {
  const scroll = useRef<any>(null);
  const {data: messages = [], isError, error,} = useGetMessagesQuery();

/*    if (isLoading || isFetching) {
        return (
            <div className={style.text}>
                Loading... <span ref={scroll}></span>
            </div>
        );
    }*/

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
                    <Message key={message.id} message={message}/>
                ))}
            </div>

            <span ref={scroll}></span>
            <SendMessage scroll={scroll} />
            {/*<SendMessage />*/}
        </main>
    );
};

export { ChatBox };
