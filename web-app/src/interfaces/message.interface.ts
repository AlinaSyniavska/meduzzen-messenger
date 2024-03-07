export interface IMessage {
    id?: string,
    userId: string,
    userName: string,
    text: string,
    attachedFiles?: string[],
    createdAt?: string,
}
