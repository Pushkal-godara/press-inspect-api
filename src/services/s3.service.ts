import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createS3Client } from '../config/s3.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly logger = new Logger(S3Service.name);

  constructor(private configService: ConfigService) {
    console.log('🚀 S3Service constructor started');
    // this.s3Client = createS3Client(configService);
    // this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
    try {
      console.log('🔍 Environment variables:');
      console.log('  AWS_REGION:', this.configService.get('AWS_REGION'));
      console.log('  AWS_S3_BUCKET_NAME:', this.configService.get('AWS_S3_BUCKET_NAME'));
      console.log('  AWS_ACCESS_KEY_ID:', this.configService.get('AWS_ACCESS_KEY_ID')?.substring(0, 8) + '...');

      console.log('📡 Creating S3 client...');
      this.s3Client = createS3Client(configService);
      console.log('✅ S3 client created successfully');

      this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
      console.log('✅ S3Service constructor completed');
    } catch (error) {
      console.error('❌ S3Service constructor failed:', error);
      throw error;
    }
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
     console.log('🔍 uploadFile called');
  console.log('🔍 this.s3Client exists?', !!this.s3Client);


    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    });
    
    try {
      console.log('🔍 About to send command to S3...');
      await this.s3Client.send(command);
      const fileUrl = `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileName}`;

      this.logger.log(`File uploaded successfully: ${fileUrl}`);
      return fileUrl;
    } catch (error) {
      this.logger.error(`Error uploading file: ${error.message}`);
      throw new Error('Failed to upload file to S3');
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extract key from URL
      const key = fileUrl.split('.amazonaws.com/')[1];

      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      this.logger.log(`File deleted successfully: ${fileUrl}`);
    } catch (error) {
      this.logger.error(`Error deleting file: ${error.message}`);
      // Don't throw error for delete failures in cleanup
    }
  }

  async getSignedDownloadUrl(fileUrl: string, expiresIn: number = 3600): Promise<string> {
    try {
      const key = fileUrl.split('.amazonaws.com/')[1];

      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn });
      return signedUrl;
    } catch (error) {
      this.logger.error(`Error generating signed URL: ${error.message}`);
      throw new Error('Failed to generate download URL');
    }
  }
}