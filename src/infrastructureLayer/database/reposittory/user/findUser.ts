// backend\src\infrastructureLayer\database\reposittory\user\findUser.ts

import UserModel from "../../model/userModel";

export const findUser = async (
    email: string,
    userModel: typeof UserModel
) => {
    try {
        console.log('email in findUserByEmail in userRepository --->>>> ', email)
        const existingUser = await userModel.findOne({ email });
        console.log(existingUser);
        return existingUser;
    } catch (error) {
        throw error
    }
};