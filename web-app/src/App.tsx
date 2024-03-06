import { FC } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';

import './App.css';
import { ChatBox, NavBar, Welcome } from './components';
// import {auth} from "./firebase.ts";

const App: FC = () => {
    // const [user] = useAuthState(auth);
  const user = true;

    return (
        <div className="App">
            <NavBar />
            {!user ? <Welcome /> : <ChatBox />}
        </div>
    );
};

export { App };
