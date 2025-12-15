// c:\BROCAMP\AskExpert\backend\src\infrastructureLayer\services\validateRepository.ts

import { IRequestValidator, ValidationResult } from "../../usecaseLayer/interface/repository/IValidateRepository";

export default class RequestValidator implements IRequestValidator {
    private validateEmail(email: string): ValidationResult {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                success: false,
                message: "Invalid email format"
            }
        }
        return { success: true }
    }

    validateRequiredFields(data: Record<string, any>, requiredFields: string[]): ValidationResult {
        // console.log('--> infrastructureLayer/services/validateRepository  data:',data, "requiredFields:",requiredFields)
        for (const field of requiredFields) {
            if (data[field] === undefined) {
                return {
                    success: false,
                    message: `Missing required field: ${field}`
                }
            }

            if (field === 'email') {
                const emailValidationResult = this.validateEmail(data[field])
                if (!emailValidationResult.success) {
                    return emailValidationResult
                }
            }
        }

        return { success: true }
    }
}
