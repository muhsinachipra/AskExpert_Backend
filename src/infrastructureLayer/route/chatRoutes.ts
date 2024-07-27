// backend\src\infrastructureLayer\route\chatRoutes.ts

import express, { NextFunction, Request, Response } from "express";
import { chatAdapter } from "./injections/chatInjection";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();

// route for create conversation
router.post(
    "/conversation",
    (req: Request, res: Response, next: NextFunction) =>
        chatAdapter.createConversation(req, res, next)
);

// route for getting conversation
router.get(
    "/conversation",
    (req: Request, res: Response, next: NextFunction) =>
        chatAdapter.getConversation(req, res, next)
);

// route for create message
router.post(
    "/message",
    (req: Request, res: Response, next: NextFunction) =>
        chatAdapter.createMessage(req, res, next)
);

// route for get all message
router.get(
    "/message",
    (req: Request, res: Response, next: NextFunction) =>
        chatAdapter.getMessage(req, res, next)
);

router.patch(
    "/viewMessages",
    (req: Request, res: Response, next: NextFunction) =>
        chatAdapter.viewMessages(req, res, next)
);

router.get(
    "/getUnReadMessages",
    (req: Request, res: Response, next: NextFunction) =>
        chatAdapter.getUnReadMessages(req, res, next)
);

router.post(
    "/uploadFile",
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) =>
        chatAdapter.uploadFile(req, res, next)
)

router.get(
    "/getFileUrl/:fileName",
    (req: Request, res: Response, next: NextFunction) =>
        chatAdapter.getFileUrl(req, res, next)
)


export default router;
