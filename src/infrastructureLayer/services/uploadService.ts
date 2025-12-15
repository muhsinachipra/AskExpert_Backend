// backend\src\infrastructureLayer\services\uploadService.ts

import s3 from '../config/aws';
import cloudinary from '../config/cloudinary';
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto'
import sharp from 'sharp'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export const uploadFileToCloudinary = async (file: Express.Multer.File): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Determine if the file is an image or video based on its mimetype
        const isImage = file.mimetype.startsWith('image/');
        
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: 'uploads',
                // Apply different transformations for images and videos
                transformation: isImage
                    ? { width: 700, crop: "limit" } // Only resize images
                    : undefined, // No resizing for videos
            },
            (error, result) => {
                if (error) {
                    reject(new Error('Upload to Cloudinary failed'));
                } else {
                    resolve(result?.secure_url || '');
                }
            }
        );

        // Pass the file buffer to the upload stream
        if (file.buffer) {
            uploadStream.end(file.buffer);
        } else {
            reject(new Error('File buffer is missing'));
        }
    });
};






const bucketName = process.env.AWS_BUCKET_NAME;

export const uploadFileToS3 = async (file: Express.Multer.File): Promise<string> => {

    const randomFileName = (bytes = 16) => crypto.randomBytes(bytes).toString('hex')
    console.log('inside uploadFileToS3 file: ', file)
    const fileName = randomFileName();

    if (!bucketName) {
        throw new Error('AWS_BUCKET_NAME environment variable is not defined');
    }

    let buffer = file.buffer;

    // Only resize if the file is an image
    if (file.mimetype.startsWith('image/')) {
        buffer = await sharp(file.buffer).resize({ width: 700 }).toBuffer();
    }

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
    console.log('fileName in uploadFileToS3: ', fileName)
    return fileName;
};

// Generate presigned URL for viewing the file
export const getPresignedUrl = async (fileName: string): Promise<string> => {

    if (!bucketName) {
        throw new Error('AWS_BUCKET_NAME environment variable is not defined');
    }

    const params = {
        Bucket: bucketName,
        Key: fileName,
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
};