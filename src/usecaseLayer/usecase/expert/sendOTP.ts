// // backend\src\usecaseLayer\usecase\expert\sendOTP.ts

// import ErrorResponse from "../../handler/errorResponse";
// import { IExpertRepository } from "../../interface/repository/IExpertRepository";
// import { IRequestValidator } from "../../interface/repository/IValidateRepository";
// import INodemailer from "../../interface/services/INodemailer";
// import { IResponse } from "../../interface/services/IResponse";


// export const sendOTP = async (
//     requestValidator: IRequestValidator,
//     expertRepository: IExpertRepository,
//     nodemailer: INodemailer,
//     email: string,
//     name: string
// ): Promise<IResponse> => {
//     try {
//         const validation = requestValidator.validateRequiredFields(
//             { email, name },
//             ["email", "name"]
//         );

//         if (!validation.success) {
//             throw ErrorResponse.badRequest(validation.message as string);
//         }

//         const expert = await expertRepository.findExpert(email);
//         if (expert) {
//             throw ErrorResponse.badRequest("Expert already exist");
//         }

//         const verify = await nodemailer.sendEmailVerification(email, name);

//         return {
//             status: 200,
//             success: true,
//             message: verify,
//         };
//     } catch (err) {
//         throw err;
//     }
// };
