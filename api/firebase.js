const { initializeApp } = require('firebase/app');

import { config } from './configs';

const firebase = initializeApp(config.firebaseConfig);

export default firebase;
