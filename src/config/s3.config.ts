// import { S3Client } from '@aws-sdk/client-s3';
// import { ConfigService } from '@nestjs/config';

// export const createS3Client = (configService: ConfigService): S3Client => {
//   return new S3Client({
//     region: configService.get('AWS_REGION'),
//     credentials: {
//       accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
//       secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
//     },
//   });
// };

import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import * as https from 'https'; 

export const createS3Client = (configService: ConfigService): S3Client => {
  console.log('🔧 createS3Client function started');
  
  try {
    // Add HTTPS agent for SSL handling
    const httpsAgent = new https.Agent({
      rejectUnauthorized: process.env.NODE_ENV === 'production',
      keepAlive: true,
      timeout: 30000,
    });
    console.log('✅ HTTPS agent created');

    const s3Client = new S3Client({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
      requestHandler: {
        httpsAgent: httpsAgent,
        connectionTimeout: 5000,
        socketTimeout: 30000,
      },
      maxAttempts: 3,
    });
    
    console.log('✅ S3Client created successfully');
    return s3Client;
  } catch (error) {
    console.error('❌ createS3Client failed:', error);
    throw error;
  }
};