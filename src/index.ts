import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";

import { Notification } from "./types";

let user: PushAPI;

export async function init(privateKey: string) {
    const signer = new ethers.Wallet(privateKey);
    user = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });
}

export async function sendNotification(notification: Notification) {
    await user.channel.send([notification.address], {
        notification: {
            title: notification.title,
            body: notification.message,
        }
    });
}