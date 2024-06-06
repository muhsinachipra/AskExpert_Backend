// backend\src\usecaseLayer\usecase\expert\updateProfile.ts

import ErrorResponse from "../../handler/errorResponse";
import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import { IResponse } from "../../interface/services/IResponse";


export const updateProfile = async (
  requestValidator: IRequestValidator,
  expertRepository: IExpertRepository,
  _id: string,
  profilePic: string,
  name: string,
  rate: number,
  experience: number
): Promise<IResponse> => {
  try {

    const validation = requestValidator.validateRequiredFields(
      { _id, profilePic, name, rate, experience },
      ["_id", 'profilePic', "name", "rate", "experience"]
    );

    if (!validation.success) {
      console.log('validation');

      throw ErrorResponse.badRequest(validation.message as string);
    }

    const data = {
      _id,
      profilePic,
      name,
      rate,
      experience
    }
    const updatedExpert = await expertRepository.updateProfile(data);

    return {
      status: 200,
      success: true,
      message: `Successfully Uploaded Profile `,
      data: updatedExpert
    };

  } catch (err) {
    throw err;
  }
};
