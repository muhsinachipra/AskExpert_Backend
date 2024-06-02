// backend\src\domainLayer\category.ts

export interface ICategory {
    _id?: string
    name: string
    description: string;
    isListed: boolean;
}