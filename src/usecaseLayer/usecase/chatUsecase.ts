// backend\src\usecaseLayer\usecase\chatUsecase.ts

import { IChatRepository } from "../interface/repository/IChatRepository";
import { IRequestValidator } from "../interface/repository/IValidateRepository";
import { createConversation } from "./chat/createConversation";
import { createMessage } from "./chat/createMessage";
import { getConversation } from "./chat/getConversation";
import { getMessage } from "./chat/getMessage";
import { getUnReadMessages } from "./chat/getUnReadMessages";
import { viewMessages } from "./chat/viewMessages";
// import { createMessage } from "./chat/createMessage";
// import { getMessage } from "./chat/getMessage";
// import { getUnReadMessages } from "./chat/getUnReadMessages";
// import { viewMessages } from "./chat/viewMessages";


export class ChatUseCase {
    private readonly chatRepository: IChatRepository;
    private readonly requestValidator: IRequestValidator;

    constructor(
        serviceRepository: IChatRepository,
        requestValidator: IRequestValidator
    ) {
        this.chatRepository = serviceRepository;
        this.requestValidator = requestValidator;
    }

    //to create conversation
    async createConversation({ senderId, receiverId }: {
        senderId: string, receiverId: string
    }) {
        return createConversation(
            this.requestValidator,
            this.chatRepository,
            senderId,
            receiverId
        );
    }

    async getConversation(userId: string) {
        return getConversation(
            this.requestValidator,
            this.chatRepository,
            userId
        );
    }


    //to create createMessage
    async createMessage({ conversationId, senderId, receiverId, text
    }: { conversationId: string, senderId: string, receiverId: string, text: string }) {
        return createMessage(
            this.requestValidator,
            this.chatRepository,
            conversationId,
            senderId,
            receiverId,
            text
        );
    }


    //to create service
    async getMessage(conversationId: string) {
        return getMessage(
            this.requestValidator,
            this.chatRepository,
            conversationId
        );
    }


    //to create createMessage
    async viewMessages({ _id }: { _id: string[] }) {
        return viewMessages(
            this.chatRepository,
            _id
        );
    }

    //to create service
    async getUnReadMessages(id: string) {
        return getUnReadMessages(
            this.requestValidator,
            this.chatRepository,
            id
        );
    }

}
