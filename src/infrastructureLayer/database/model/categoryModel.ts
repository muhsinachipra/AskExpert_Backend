// backend\src\infrastructureLayer\database\model\categoryModel.ts

import mongoose, { Document, Model, Schema } from "mongoose"
import { ICategory } from "../../../domainLayer/category"

const categorySchema: Schema = new Schema<ICategory & Document>(
    {
        categoryImage: { type: String, required: true },
        categoryName: { type: String, required: true, unique: true },
        categoryDescription: { type: String, required: true },
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
