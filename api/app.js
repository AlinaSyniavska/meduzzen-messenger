require('dotenv').config();
const { config } = require('./configs');

const express = require('express');
const cors = require('cors');

// const { chatsRouter, authRouter, userRouter } = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options('*', cors()); // include before other routes
app.use(cors(_configureCors()));

/*app.use('/auth', authRouter);
app.use('/chats', chatsRouter);
app.use('/users', usersRouter);*/

app.use('*', (req, res) => {
    res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        error: err.message || 'Unknown Error',
        code: err.status || 400,
    });
});

app.listen(config.PORT, () => {
    console.log(`Started on port ${config.PORT}`);
});

function _configureCors() {
    const whitelist = config.CORS_WHITE_LIST.split(';');

    return {
        origin: (origin, callback) => {
            if (whitelist.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    };
}
