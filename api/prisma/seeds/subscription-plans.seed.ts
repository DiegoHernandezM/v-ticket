// prisma/seeds/subscription-plans.seed.ts

import prisma  from '../../src/database/prisma';

async function main() {
  console.log('🌱 Seeding subscription plans...');

  await prisma.subscriptionPlan.createMany({
    data: [
      {
        name: 'Trial',
        slug: 'trial',
        description: 'Plan de prueba para nuevas empresas',
        price: 0,
        maxUsers: 2,
        maxTickets: 50,
      },
      {
        name: 'Basic',
        slug: 'basic',
        description: 'Plan básico para pequeñas empresas',
        price: 499,
        maxUsers: 5,
        maxTickets: 500,
      },
      {
        name: 'Professional',
        slug: 'professional',
        description: 'Plan profesional para equipos medianos',
        price: 999,
        maxUsers: 20,
        maxTickets: 5000,
      },
      {
        name: 'Enterprise',
        slug: 'enterprise',
        description: 'Plan empresarial sin límites',
        price: 2999,
        maxUsers: null,
        maxTickets: null,
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Subscription plans seeded successfully');
}

main()
  .catch((error) => {
    console.error('❌ Error seeding subscription plans:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });