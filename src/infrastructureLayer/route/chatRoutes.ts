// backend\src\infrastructureLayer\route\chatRoutes.ts

import express, { NextFunction, Request, Response } from "express";
import { chatController } from "./injections/chatInjection";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();

// route for create conversation
router.post(
    "/conversation",
    (req: Request, res: Response, next: NextFunction) =>
        chatController.createConversation(req, res, next)
);

// route for getting conversation
router.get(
    "/conversation",
    (req: Request, res: Response, next: NextFunction) =>
        chatController.getConversation(req, res, next)
);

// route for create message
router.post(
    "/message",
    (req: Request, res: Response, next: NextFunction) =>
        chatController.createMessage(req, res, next)
);

// route for get all message
router.get(
    "/message",
    (req: Request, res: Response, next: NextFunction) =>
        chatController.getMessage(req, res, next)
);

router.patch(
    "/viewMessages",
    (req: Request, res: Response, next: NextFunction) =>
        chatController.viewMessages(req, res, next)
);

router.get(
    "/getUnReadMessages",
    (req: Request, res: Response, next: NextFunction) =>
        chatController.getUnReadMessages(req, res, next)
);

router.post(
    "/uploadFile",
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) =>
        chatController.uploadFile(req, res, next)
)

// router.get(
//     "/getFileUrl/:fileName",
//     (req: Request, res: Response, next: NextFunction) =>
//         chatController.getFileUrl(req, res, next)
// )


export default router;
