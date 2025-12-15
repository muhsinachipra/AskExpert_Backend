// backend\src\controllerLayer\chatAdapter.ts

import { getPresignedUrl, uploadFileToS3 } from "../infrastructureLayer/services/uploadService";
import { uploadFileToCloudinary } from '../infrastructureLayer/services/uploadService';
import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { ChatUseCase } from "../usecaseLayer/usecase/chatUsecase";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export class ChatAdapter {
    private readonly chatUsecase: ChatUseCase;

    constructor(chatUsecase: ChatUseCase) {
        this.chatUsecase = chatUsecase;
    }

    //@desc     Create conversation
    //route     Post /api/chat/conversations
    //@access   Private
    async createConversation(req: Req, res: Res, next: Next) {
        try {
            const newConversation = await this.chatUsecase.createConversation(req.body);
            newConversation &&
                res.status(200).json({
                    newConversation

                });
        } catch (err) {
            next(err);
        }
    }

    //@desc     Get conversation
    //route     Get /api/chat/conversations
    //@access   Private
    async getConversation(req: Req, res: Res, next: Next) {
        try {
            // console.log('req in getConversation: ', req.query.userId);
            const userId = req.query.userId as string;
            const newConversation = await this.chatUsecase.getConversation(userId);
            newConversation &&
                res.status(200).json({
                    newConversation

                });
        } catch (err) {
            next(err);
        }
    }

    //@desc     Create message
    //route     Post /api/chat/message
    //@access   Private
    async createMessage(req: Req, res: Res, next: Next) {
        try {
            console.log('req.body in createMessage: ', req.body);
            const newConversation = await this.chatUsecase.createMessage(req.body);
            newConversation &&
                res.status(200).json({
                    newConversation,
                });
        } catch (err) {
            next(err);
        }
    }



    //@desc     For get messages
    //route     Post /api/chat/getMessage
    //@access   Private
    async getMessage(req: Req, res: Res, next: Next) {
        try {
            // console.log('req in getMessage: ', req.query.conversationId);
            const conversationId = req.query.conversationId as string;
            const message = await this.chatUsecase.getMessage(conversationId);
            // console.log('res in getMessage: ', message);
            message &&
                res.status(200).json({
                    message
                });
        } catch (err) {
            next(err);
        }
    }

    //@desc     Updated view message
    //route     Post /api/chat/viewMessage
    //@access   Private
    async viewMessages(req: Req, res: Res, next: Next) {
        try {
            console.log('req.body in chat adapter: ', req.body);

            const message = await this.chatUsecase.viewMessages(req.body);
            message &&
                res.status(200).json({
                    message,
                });
        } catch (err) {
            next(err);
        }
    }


    //@desc     Create c
    //route     Post /api/chat/conversation
    //@access   Private
    async getUnReadMessages(req: Req, res: Res, next: Next) {
        try {
            const id = req.query.id as string;
            console.log('id in getUnReadMessages chatAdapter: ', id);

            const message = await this.chatUsecase.getUnReadMessages(id);
            console.log("messages from getUnReadMessages: ", message);

            message &&
                res.status(200).json({
                    message
                });
        } catch (err) {
            next(err);
        }
    }

    //@desc     Upload file To Cloudinary
    //route     Post /api/chat/uploadFile
    //@access   Private
    async uploadFile(req: Req, res: Res, next: Next) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            const fileUrl = await uploadFileToCloudinary(req.file);
            res.status(200).json({ fileUrl });
        } catch (err) {
            next(err);
        }
    }

    // //@desc     Upload file To S3
    // //route     Post /api/chat/uploadFile
    // //@access   Private
    // async uploadFile(req: Req, res: Res, next: Next) {
    //     try {
    //         console.log('req.file: ', req.file)
    //         console.log('req.body: ', req.body)
    //         console.log('req.buffer: ', req.file?.buffer)

    //         if (!req.file) {
    //             return res.status(400).json({ message: 'No file uploaded' });
    //         }
    //         const fileName = await uploadFileToS3(req.file);
    //         res.status(200).json({ fileName });
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    // //@desc     Get file url
    // //route     Post /api/chat/getFileUrl
    // //@access   Private
    // async getFileUrl(req: Req, res: Res, next: Next) {
    //     try {
    //         // console.log('key inside getFileUrl: ', req.params.fileName)
    //         const { fileName } = req.params;
    //         const url = await getPresignedUrl(fileName);
    //         url &&
    //             res.status(200).json({
    //                 url
    //             });
    //     } catch (err) {
    //         next(err);
    //     }
    // }

}
