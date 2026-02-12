import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Tenant 1: Villa Monte Verde (Premium)
  const tenant1 = await prisma.tenant.upsert({
    where: { slug: 'villa-monte-verde' },
    update: {},
    create: {
      slug: 'villa-monte-verde',
      name: 'Villa Monte Verde',
      location: 'Monte Verde, MG',
      address: 'Rua das Montanhas, 123',
      phone: '(35) 3438-1234',
      email: 'contato@villamonteverde.com',
      whatsapp: '5535991234567',
      wifiNetwork: 'Villa_Guest',
      wifiPassword: 'villa2024',
      planType: 'PREMIUM',
      primaryColor: '#8B7355',
      secondaryColor: '#A0826D',
      accentColor: '#C19A6B',
      hasWeather: true,
      hasDirections: true,
      hasRestaurants: true,
      hasCustomChat: true,
      welcomeMessage: 'Bem-vindo à Villa Monte Verde! Um refúgio nas montanhas.',
      testimonial: 'Lugar incrível para relaxar e aproveitar a natureza!',
    },
  });

  // Tenant 2: Pousada Jardim Secreto (Basic)
  const tenant2 = await prisma.tenant.upsert({
    where: { slug: 'pousada-jardim-secreto' },
    update: {},
    create: {
      slug: 'pousada-jardim-secreto',
      name: 'Pousada Jardim Secreto',
      location: 'Tiradentes, MG',
      address: 'Rua do Jardim, 456',
      phone: '(32) 3355-9876',
      email: 'contato@jardimsecreto.com',
      whatsapp: '5532998765432',
      wifiNetwork: 'Jardim_WiFi',
      wifiPassword: 'jardim123',
      planType: 'BASIC',
      primaryColor: '#2C5F2D',
      secondaryColor: '#97BC62',
      accentColor: '#8FBC8F',
      hasWeather: false,
      hasDirections: true,
      hasRestaurants: false,
      hasCustomChat: false,
      welcomeMessage: 'Aconchego e tranquilidade no coração de Tiradentes.',
    },
  });

  // Tenant 3: Refúgio da Serra (Enterprise)
  const tenant3 = await prisma.tenant.upsert({
    where: { slug: 'refugio-da-serra' },
    update: {},
    create: {
      slug: 'refugio-da-serra',
      name: 'Refúgio da Serra',
      location: 'Campos do Jordão, SP',
      address: 'Av. Macedo Soares, 789',
      phone: '(12) 3663-5555',
      email: 'contato@refugiodaserra.com',
      whatsapp: '5512997654321',
      wifiNetwork: 'Refugio_Premium',
      wifiPassword: 'serra2024vip',
      planType: 'ENTERPRISE',
      primaryColor: '#1E3A5F',
      secondaryColor: '#4A6FA5',
      accentColor: '#7B9EC6',
      hasWeather: true,
      hasDirections: true,
      hasRestaurants: true,
      hasCustomChat: true,
      welcomeMessage: 'Experiência premium na Serra da Mantiqueira.',
      testimonial: 'Luxo, conforto e vista deslumbrante. Recomendo!',
    },
  });

  // Criar admins
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.adminUser.upsert({
    where: { email: 'admin@villamonteverde.com' },
    update: {},
    create: {
      email: 'admin@villamonteverde.com',
      password: hashedPassword,
      name: 'Admin Villa',
      tenantId: tenant1.id,
    },
  });

  await prisma.adminUser.upsert({
    where: { email: 'admin@jardimsecreto.com' },
    update: {},
    create: {
      email: 'admin@jardimsecreto.com',
      password: hashedPassword,
      name: 'Admin Jardim',
      tenantId: tenant2.id,
    },
  });

  await prisma.adminUser.upsert({
    where: { email: 'admin@refugiodaserra.com' },
    update: {},
    create: {
      email: 'admin@refugiodaserra.com',
      password: hashedPassword,
      name: 'Admin Refúgio',
      tenantId: tenant3.id,
    },
  });

  console.log('✅ Seed completo!');
  console.log('');
  console.log('📧 Credenciais de acesso:');
  console.log('   Email: admin@villamonteverde.com');
  console.log('   Email: admin@jardimsecreto.com');
  console.log('   Email: admin@refugiodaserra.com');
  console.log('   Senha: admin123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
