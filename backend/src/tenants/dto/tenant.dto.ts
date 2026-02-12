import { IsString, IsEmail, IsOptional, IsEnum, IsBoolean } from 'class-validator';

enum PlanType {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}

export class CreateTenantDto {
  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsEnum(PlanType)
  planType?: PlanType;
}

export class UpdateTenantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  wifiNetwork?: string;

  @IsOptional()
  @IsString()
  wifiPassword?: string;

  @IsOptional()
  @IsString()
  primaryColor?: string;

  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @IsOptional()
  @IsString()
  accentColor?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsBoolean()
  hasWeather?: boolean;

  @IsOptional()
  @IsBoolean()
  hasDirections?: boolean;

  @IsOptional()
  @IsBoolean()
  hasRestaurants?: boolean;

  @IsOptional()
  @IsBoolean()
  hasCustomChat?: boolean;

  @IsOptional()
  @IsString()
  welcomeMessage?: string;

  @IsOptional()
  @IsString()
  testimonial?: string;
}
