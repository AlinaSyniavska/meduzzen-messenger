const fb = require("firebase/app");

const { config } = require('./configs');

const firebase = fb.initializeApp(config.firebaseConfig);

module.exports = firebase;
