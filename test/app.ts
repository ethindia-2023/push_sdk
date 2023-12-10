import express, { Request } from 'express';
import bodyParser from 'body-parser';
import { init, sendNotification, createTeamGroup } from '../src/index';

import * as dotenv from 'dotenv';
dotenv.config();

import { GroupRequest, Notification } from '../src/types';

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

app.get('/createGroup', async (req, res) => {
    let params: GroupRequest = {
        name: "Test Name",
        description: "Test",
        admin: ["0x5F746B46D856165919c43483f35055dD009eD0aa"],
        image: ""
    }
    let group = await createTeamGroup(params);
    console.log("group created", group);
    res.send("Sup");
});

app.listen(process.env.PORT || 3000, async () => {
    await init(process.env.PRIVATE_KEY || '');
    console.log('Example app listening on port 3000!');
})