export type MessageDto = {
    id?: string;
    userId: string;
    userName: string;
    text: string;
    attachedFiles?: string[];
    createdAt?: string;
};
