class Message {
    constructor(id, userId, userName, text, attachedFiles, createdAt) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.text = text;
        this.attachedFiles = attachedFiles;
        this.createdAt = createdAt;
    }
}

export default Message;
