// backend\src\usecaseLayer\usecase\user\updateProfile.ts

import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import { IResponse } from "../../interface/services/IResponse";


export const updateProfile = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  _id: string,
  name: string,
  mobile: string,
  profilePic: string,
): Promise<IResponse> => {
  try {

    const validation = requestValidator.validateRequiredFields(
      { _id, name, mobile, profilePic },
      ["_id", "name", "mobile", "profilePic"]
    );

    if (!validation.success) {
      console.log('validation');

      throw ErrorResponse.badRequest(validation.message as string);
    }

    const data = {
      _id,
      name,
      mobile,
      profilePic
    }
    const updatedUser = await userRepository.updateProfile(data);

    return {
      status: 200,
      success: true,
      message: `Successfully Uploaded Profile `,
      data: updatedUser
    };

  } catch (err) {
    throw err;
  }
};
