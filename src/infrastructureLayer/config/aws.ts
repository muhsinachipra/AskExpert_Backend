// backend\src\infrastructureLayer\config\aws.ts

import { S3Client } from "@aws-sdk/client-s3";

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID || ''
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || ''
const awsBucketRegion = process.env.AWS_BUCKET_REGION || ''

const s3 = new S3Client({
    credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
    },
    region: awsBucketRegion,
});

export default s3