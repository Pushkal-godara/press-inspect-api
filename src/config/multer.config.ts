import { BadRequestException } from '@nestjs/common';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';

const validateCV = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new BadRequestException('CV must be a PDF file'), false);
  }
};

const validatePassport = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new BadRequestException('Passport attachment must be a PDF file'), false);
  }
};

const validatePhoto = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestException('Photo must be JPG, JPEG, or PNG format'), false);
  }
};

const validateTechSpec = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new BadRequestException('Technical specification must be a PDF file'), false);
  }
};

// S3 Upload Configuration - Use memory storage for S3
export const s3UploadConfig = {
  storage: memoryStorage(), // Store in memory for S3 upload
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'cv') {
      validateCV(req, file, cb);
    } else if (file.fieldname === 'passportAttachment') {
      validatePassport(req, file, cb);
    } else if (file.fieldname === 'photoOfEngineer') {
      validatePhoto(req, file, cb);
    } else if (file.fieldname === 'techSpecFile') {
      validateTechSpec(req, file, cb);
    } else {
      cb(new BadRequestException('Invalid file field'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
};