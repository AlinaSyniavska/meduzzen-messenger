class Message {
    constructor(id, userId, text, attachedFiles, createdAt) {
        this.id = id;
        this.userId = userId;
        this.text = text;
        this.attachedFiles = attachedFiles;
        this.createdAt = createdAt;
    }
}

export default Message;
