import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from './s3.service';

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async uploadImage(file: Express.Multer.File, tenantId: string) {
    // Upload to S3
    const { url, key } = await this.s3Service.uploadFile(file, `tenants/${tenantId}`);

    // Save to database
    const image = await this.prisma.image.create({
      data: {
        url,
        key,
        filename: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
        tenantId,
      },
    });

    return image;
  }

  async getTenantImages(tenantId: string) {
    return this.prisma.image.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteImage(id: string, tenantId: string) {
    const image = await this.prisma.image.findUnique({ where: { id } });

    if (!image) {
      throw new NotFoundException('Imagem não encontrada');
    }

    if (image.tenantId !== tenantId) {
      throw new ForbiddenException('Você não tem permissão para deletar esta imagem');
    }

    // Delete from S3
    await this.s3Service.deleteFile(image.key);

    // Delete from database
    await this.prisma.image.delete({ where: { id } });

    return { message: 'Imagem deletada com sucesso' };
  }
}
