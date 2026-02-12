import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto, UpdateTenantDto } from './dto/tenant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

  // Public endpoint for frontend to fetch tenant config
  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.tenantsService.findBySlug(slug);
  }

  // Protected admin endpoints
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.tenantsService.findAll();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
    @Request() req,
  ) {
    // Verify user owns this tenant
    if (req.user.tenantId !== id) {
      throw new Error('Você não tem permissão para editar esta pousada');
    }
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Request() req) {
    // Only allow deleting own tenant
    if (req.user.tenantId !== id) {
      throw new Error('Você não tem permissão para deletar esta pousada');
    }
    return this.tenantsService.delete(id);
  }

  // Analytics tracking
  @Post('track/:slug')
  async trackEvent(
    @Param('slug') slug: string,
    @Body() body: { event: string; metadata?: any },
  ) {
    return this.tenantsService.trackEvent(slug, body.event, body.metadata);
  }
}
