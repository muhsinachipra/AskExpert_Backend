// backend\src\infrastructureLayer\services\uploadService.ts

import s3 from '../config/aws';
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto'
import sharp from 'sharp'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const bucketName = process.env.AWS_BUCKET_NAME;

export const uploadImageToS3 = async (file: Express.Multer.File): Promise<string> => {

    const buffer = await sharp(file.buffer).resize({ width: 800 }).toBuffer();

    const randomImageName = (bytes = 16) => crypto.randomBytes(bytes).toString('hex')
    console.log('inside uploadImageToS3 file: ', file)
    const imageName = randomImageName();

    if (!bucketName) {
        throw new Error('AWS_BUCKET_NAME environment variable is not defined');
    }

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
    return imageName;
};

// Generate presigned URL for viewing the image
export const getPresignedUrl = async (imageName: string): Promise<string> => {
    
    if (!bucketName) {
        throw new Error('AWS_BUCKET_NAME environment variable is not defined');
    }

    const params = {
        Bucket: bucketName,
        Key: imageName,
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
};