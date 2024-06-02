// backend\src\infrastructureLayer\database\model\categoryModel.ts

import mongoose, { Document, Model, Schema } from "mongoose"
import { ICategory } from "../../../domainLayer/category"

const categorySchema: Schema = new Schema<ICategory & Document>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        isListed: { type: Boolean, default: true },
    },
    {
        timestamps: true
    }
)

const CategoryModel: Model<ICategory & Document> = mongoose.model<ICategory & Document>(
    "Category",
    categorySchema
)

export default CategoryModel