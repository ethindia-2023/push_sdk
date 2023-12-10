export interface Notification {
    title: string;
    message: string;
    address: string;
}

export interface GroupRequest {
    name: string;
    description: string;
    image: string;
    admin: string[];
}