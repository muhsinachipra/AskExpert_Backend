// backend\src\infrastructureLayer\database\model\message.ts

import mongoose, { Document, Model, Schema } from "mongoose";
import { IMessage } from "../../../domainLayer/message";

const messageSchema: Schema = new Schema<IMessage & Document>(
  {
    conversationId: { type: String, },
    senderId: { type: String, },
    receiverId: { type: String, },
    text: { type: String, },
    imageName: { type: String, default: '' },
    videoName: { type: String, default: '' },
    audioName: { type: String, default: '' },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true
  }
);

const MessageModel: Model<IMessage & Document> = mongoose.model<IMessage & Document>(
  "Message",
  messageSchema
);

export default MessageModel;