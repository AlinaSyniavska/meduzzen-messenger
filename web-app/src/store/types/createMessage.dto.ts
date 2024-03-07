export interface CreateMessageDto {
    userId: string;
    userName: string;
    text: string;
    attachedFiles?: string[];
}