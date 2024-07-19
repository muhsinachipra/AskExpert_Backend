// backend\src\infrastructureLayer\database\repository\chat\findConversation.ts



import { IConversationData } from "../../../../usecaseLayer/interface/services/IResponse";
import ConversationModel from "../../model/conversation";
import UserModel from "../../model/userModel";
import ExpertModel from "../../model/expertModel";

export const findConversation = async (
    senderId: string,
    receiverId: string,
    conversationModel: typeof ConversationModel
) => {
    try {
        console.log('name in find conversation in conversationRepository --->>>> ', senderId, " ", receiverId)

        const existingConversation = await conversationModel.findOne({
            members: { $all: [senderId, receiverId] }
        });
        
        const user = await UserModel.findOne({ $or: [{ _id: senderId }, { _id: receiverId }] });
        const expert = await ExpertModel.findOne({ $or: [{ _id: senderId }, { _id: receiverId }] });
        
        const data: IConversationData | undefined = existingConversation ? {
            _id: existingConversation._id,
            members: existingConversation.members,
            user: user?.name || '',
            userEmail: user?.email || '',
            user_profile: expert?.profilePic || '',  // ------------------------------------------------------ffffff-----------------
            expert: expert?.name || '',
            expert_profile: expert?.profilePic || ''
        } : undefined;

        return data;
    } catch (error) {
        throw error
    }
}