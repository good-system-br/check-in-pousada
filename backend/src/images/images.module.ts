import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { S3Service } from './s3.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, S3Service],
  exports: [S3Service],
})
export class ImagesModule {}
