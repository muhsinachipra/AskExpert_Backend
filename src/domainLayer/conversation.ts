// backend\src\domainLayer\conversation.ts

export interface IConversation{
    _id: string;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
}