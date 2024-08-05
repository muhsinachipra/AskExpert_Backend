// backend\src\usecaseLayer\interface\repository\IReviewRepository.ts

import { IReview } from "../../../domainLayer/review"

export interface IReviewRepository {
    review({ userId, expertId, rating, feedback, appointmentId }: IReview): Promise<void>
    expertGetReview(expertId: string, page: number, limit: number): Promise<{ data: IReview[], total: number }>
}