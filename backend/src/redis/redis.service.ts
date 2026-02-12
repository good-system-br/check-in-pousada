import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.client = createClient({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
      password: this.configService.get('REDIS_PASSWORD') || undefined,
    });

    this.client.on('error', (err) => console.error('Redis Error:', err));
    await this.client.connect();
    console.log('✅ Redis conectado');
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.setEx(key, ttl, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  // Cache helper para tenant configs
  async cacheTenant(slug: string, data: any, ttl = 3600): Promise<void> {
    await this.set(`tenant:${slug}`, JSON.stringify(data), ttl);
  }

  async getCachedTenant(slug: string): Promise<any | null> {
    const cached = await this.get(`tenant:${slug}`);
    return cached ? JSON.parse(cached) : null;
  }

  async invalidateTenant(slug: string): Promise<void> {
    await this.del(`tenant:${slug}`);
  }
}
