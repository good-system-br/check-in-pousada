import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      region: this.configService.get('AWS_REGION'),
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
    this.bucket = this.configService.get('AWS_S3_BUCKET');
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ url: string; key: string }> {
    const key = `${folder}/${Date.now()}-${file.originalname}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    await this.s3.upload(params).promise();

    const url = `https://${this.bucket}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${key}`;

    return { url, key };
  }

  async deleteFile(key: string): Promise<void> {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: this.bucket,
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }

  async listFiles(prefix: string): Promise<AWS.S3.ObjectList> {
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: this.bucket,
      Prefix: prefix,
    };

    const result = await this.s3.listObjectsV2(params).promise();
    return result.Contents || [];
  }
}
