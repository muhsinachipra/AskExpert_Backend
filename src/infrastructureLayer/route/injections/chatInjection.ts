// backend\src\infrastructureLayer\route\injections\chatInjection.ts

import { ChatAdapter } from "../../../controllerLayer/chatAdapter";
import { ChatUseCase } from "../../../usecaseLayer/usecase/chatUsecase";
import ConversationModel from "../../database/model/conversation";
import MessageModel from "../../database/model/message";
import { ChatRepository } from "../../database/repository/chatRepository";
import RequestValidator from "../../services/validateRepository";

// creating injection to provide the route
const chatRepository = new ChatRepository(ConversationModel, MessageModel);
const requestValidator = new RequestValidator();
const chatusecase = new ChatUseCase(chatRepository, requestValidator);
const chatAdapter = new ChatAdapter(chatusecase);

export { chatAdapter };
