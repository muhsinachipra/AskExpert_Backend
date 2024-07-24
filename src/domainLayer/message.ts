// backend\src\domainLayer\message.ts

export interface IMessage {
    conversationId : string;
    senderId : string;
    receiverId:string;
    text: string;
    status?:boolean;
}