// backend\src\infrastructureLayer\database\repository\reviewRepository.ts

import ReviewModel from "../model/reviewModel";
import { IReview } from "../../../domainLayer/review";
import { IReviewRepository } from "../../../usecaseLayer/interface/repository/IReviewRepository";
import { ObjectId } from "mongoose";
import ExpertModel from "../model/expertModel";

export class ReviewRepository implements IReviewRepository {

    constructor(private readonly reviewModel: typeof ReviewModel) { }

    private async updateExpertAverageRating(expertId: string | ObjectId): Promise<void> {
        const reviews = await this.reviewModel.find({ expertId });
        const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        const roundedAverageRating = Math.round(averageRating * 10) / 10;
        console.log('roundedAverageRating in updateExpertAverageRating: ', roundedAverageRating)
        await ExpertModel.findByIdAndUpdate(expertId, { averageRating: roundedAverageRating });
    }

    async review({ userId, expertId, rating, feedback, appointmentId }: IReview): Promise<void> {
        try {
            const newReview = new this.reviewModel({ userId, expertId, rating, feedback, appointmentId });
            await newReview.save();

            await this.updateExpertAverageRating(expertId.toString());
        } catch (error) {
            console.error('Error submitting review: ', error);
            throw error;
        }
    }

    async expertGetReview(expertId: string, page: number, limit: number): Promise<{ data: IReview[], total: number }> {
        try {
            const skip = (page - 1) * limit;
            const reviews = await this.reviewModel.find({ expertId })
                .populate('userId', 'name')
                .populate('appointmentId', 'date')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            const total = await this.reviewModel.countDocuments({ expertId });
            return { data: reviews, total };
        } catch (error) {
            console.error('Error getting expert reviews: ', error);
            throw error;
        }
    }

}
