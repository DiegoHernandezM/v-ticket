import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import bcrypt from 'bcryptjs';

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'v_ticket',
});

const prisma = new PrismaClient({
  adapter,
});
async function main() {

  /*
  |--------------------------------------------------------------------------
  | Roles iniciales
  |--------------------------------------------------------------------------
  */

  const roles = [
    {
      name: 'Super Admin',
      slug: 'super_admin',
      description: 'Administrador global de la plataforma'
    },
    {
      name: 'Administrador',
      slug: 'admin',
      description: 'Administrador de empresa'
    },
    {
      name: 'Gestor de Tickets',
      slug: 'ticket_manager',
      description: 'Usuario encargado de gestionar tickets'
    },
    {
      name: 'Ingeniero',
      slug: 'engineer',
      description: 'Usuario encargado de atender tickets'
    }
  ];

  for (const role of roles) {

    await prisma.role.upsert({
      where: {
        slug: role.slug
      },
      update: {},
      create: role
    });

  }

  /*
  |--------------------------------------------------------------------------
  | Obtener rol super admin
  |--------------------------------------------------------------------------
  */

  const superAdminRole = await prisma.role.findUnique({
    where: {
      slug: 'super_admin'
    }
  });

  if (!superAdminRole) {
    throw new Error('No se encontró el rol super_admin');
  }

  /*
  |--------------------------------------------------------------------------
  | Crear usuario super admin
  |--------------------------------------------------------------------------
  */

  const hashedPassword = await bcrypt.hash('Admin123456', 10);

  const superAdmin = await prisma.user.upsert({
    where: {
      email: 'admin@vticket.com'
    },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@vticket.com',
      password: hashedPassword
    }
  });

  /*
  |--------------------------------------------------------------------------
  | Relacionar usuario con rol
  |--------------------------------------------------------------------------
  */

  await prisma.companyUser.createMany({
    data: [
      {
        companyId: null,
        userId: superAdmin.id,
        roleId: superAdminRole.id
      }
    ],
    skipDuplicates: true
  });

  console.log('Seed ejecutado correctamente');

}

main()
  .catch((error) => {

    console.error(error);
    process.exit(1);

  })
  .finally(async () => {

    await prisma.$disconnect();

  });
  