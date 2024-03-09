import {FC, useState} from 'react';

import './App.css';
import { ChatBox, NavBar, Welcome } from './components';
import {IUser} from "./interfaces";

const App: FC = () => {

  const [user, setUser] = useState<IUser | null>(null);

    return (
        <div className="App">
            <NavBar user={user} setUser={setUser}/>
            {/*{!user ? <Welcome /> : <ChatBox />}*/}
            <ChatBox />
        </div>
    );
};

export { App };
