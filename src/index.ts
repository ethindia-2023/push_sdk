import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";

import { GroupRequest, Notification } from "./types";

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

export async function createTeamGroup(data: GroupRequest) {
    const createTokenGatedGroup = await user.chat.group.create(
        data.name, // name
        {
            description: data.description, // description
            image: data.image, // base64 image
            admins: data.admin, // user's address
            private: true,

            rules: {
                entry: {
                    conditions: {
                        any: [
                        {
                            any: [
                            {
                                type: "PUSH",
                                category: "INVITE",
                                subcategory: "DEFAULT",
                                data: {
                                    inviterRoles: ["ADMIN"],
                                },
                            },
                            ],
                        },
                        ],
                    },

                },
            },
        },

    );
}