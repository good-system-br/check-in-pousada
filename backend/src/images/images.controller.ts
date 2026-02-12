import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('images')
@UseGuards(JwtAuthGuard)
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const tenantId = req.user.tenantId;
    return this.imagesService.uploadImage(file, tenantId);
  }

  @Get('tenant/:tenantId')
  async getTenantImages(@Param('tenantId') tenantId: string) {
    return this.imagesService.getTenantImages(tenantId);
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: string, @Request() req) {
    const tenantId = req.user.tenantId;
    return this.imagesService.deleteImage(id, tenantId);
  }
}
