// backend\src\usecaseLayer\interface\repository\IReviewRepository.ts

import { IReport } from "../../../domainLayer/report"
import { IReview } from "../../../domainLayer/review"

export interface IReviewRepository {
    review({ userId, expertId, rating, feedback, appointmentId }: IReview): Promise<void>
    expertGetReview(expertId: string, page: number, limit: number): Promise<{ data: IReview[], total: number }>
    report({ userId, expertId, reason }: IReport): Promise<void>
    reportByExpertId(expertId: string, page: number, limit: number): Promise<{ data: IReport[], total: number }>
    getReportStatistics(): Promise<Record<string, number>>
}