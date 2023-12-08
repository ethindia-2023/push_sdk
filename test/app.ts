import express, { Request } from 'express';
import bodyParser from 'body-parser';
import { init, sendNotification } from '../src/index';

import * as dotenv from 'dotenv';
dotenv.config();

import { Notification } from '../src/types';

const app = express();

app.get('/', (req, res) => {
    let notif: Notification = {
        title: "Hello",
        message: "World",
        address: "0x5F746Bffdggdsv5919c43483flskcuibD009eD0aa"
    };
    sendNotification(notif);
    res.send('Hello World!');
});

app.get('/sendNotifs', bodyParser.json(), (req: Request, res) => {
    let notif: Notification = {
        title: req.body.title,
        message: req.body.message,
        address: req.body.address
    };
    sendNotification(notif);
    res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, async () => {
    await init(process.env.PRIVATE_KEY || '');
    console.log('Example app listening on port 3000!');
})