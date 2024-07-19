// backend\src\usecaseLayer\interface\repository\IChatRepository.ts

import { IConversation } from "../../../domainLayer/conversation";
import { IMessage } from "../../../domainLayer/message";
import { IConversationData } from "../services/IResponse";


export interface IChatRepository {
    createConversation(senderId: string, receiverId: string): Promise<string>;
    findConversation(senderId: string, receiverId: string): Promise<IConversationData | undefined>;
    // createMessage(newMessage:IMessage): Promise<IMessage>;
    // getMessage(conversationId:string): Promise<MessageResponse | null>;
    // getUnReadMessages(id:string): Promise<MessageResponse | null>;
    // viewMessages(_id:string[]): Promise<string>;
}