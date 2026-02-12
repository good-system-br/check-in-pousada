import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateTenantDto, UpdateTenantDto } from './dto/tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const existing = await this.prisma.tenant.findUnique({
      where: { slug: createTenantDto.slug },
    });

    if (existing) {
      throw new ConflictException('Slug já está em uso');
    }

    const tenant = await this.prisma.tenant.create({
      data: createTenantDto,
    });

    return tenant;
  }

  async findAll() {
    return this.prisma.tenant.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    // Try cache first
    const cached = await this.redis.getCachedTenant(slug);
    if (cached) {
      return cached;
    }

    // Fetch from database
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!tenant) {
      throw new NotFoundException('Pousada não encontrada');
    }

    // Format response to match frontend
    const formatted = {
      id: tenant.id,
      slug: tenant.slug,
      name: tenant.name,
      location: tenant.location,
      address: tenant.address,
      phone: tenant.phone,
      email: tenant.email,
      whatsapp: tenant.whatsapp,
      wifi: {
        networkName: tenant.wifiNetwork || '',
        password: tenant.wifiPassword || '',
      },
      planType: tenant.planType,
      theme: {
        primaryColor: tenant.primaryColor,
        secondaryColor: tenant.secondaryColor,
        accentColor: tenant.accentColor,
        logoUrl: tenant.logoUrl,
      },
      features: {
        weather: tenant.hasWeather,
        directions: tenant.hasDirections,
        restaurants: tenant.hasRestaurants,
        customChat: tenant.hasCustomChat,
      },
      images: tenant.images.map((img) => img.url),
      welcomeMessage: tenant.welcomeMessage,
      testimonial: tenant.testimonial,
    };

    // Cache for 1 hour
    await this.redis.cacheTenant(slug, formatted, 3600);

    return formatted;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });

    if (!tenant) {
      throw new NotFoundException('Pousada não encontrada');
    }

    const updated = await this.prisma.tenant.update({
      where: { id },
      data: updateTenantDto,
    });

    // Invalidate cache
    await this.redis.invalidateTenant(tenant.slug);

    return updated;
  }

  async delete(id: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });

    if (!tenant) {
      throw new NotFoundException('Pousada não encontrada');
    }

    await this.prisma.tenant.delete({ where: { id } });

    // Invalidate cache
    await this.redis.invalidateTenant(tenant.slug);

    return { message: 'Pousada deletada com sucesso' };
  }

  // Analytics
  async trackEvent(slug: string, event: string, metadata?: any) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug } });

    if (!tenant) return;

    await this.prisma.analytics.create({
      data: {
        tenantId: tenant.id,
        event,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });
  }
}
