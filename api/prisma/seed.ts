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

const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash('Admin123456', 10);

  const superAdminRole = await prisma.role.upsert({
    where: { slug: 'super_admin' },
    update: {},
    create: {
      name: 'Super Admin',
      slug: 'super_admin',
      description: 'Administrador global de la plataforma',
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { slug: 'admin' },
    update: {},
    create: {
      name: 'Administrador',
      slug: 'admin',
      description: 'Administrador de empresa',
    },
  });

  const managerRole = await prisma.role.upsert({
    where: { slug: 'ticket_manager' },
    update: {},
    create: {
      name: 'Gestor de Tickets',
      slug: 'ticket_manager',
      description: 'Usuario encargado de gestionar tickets',
    },
  });

  const engineerRole = await prisma.role.upsert({
    where: { slug: 'engineer' },
    update: {},
    create: {
      name: 'Ingeniero',
      slug: 'engineer',
      description: 'Usuario encargado de atender tickets',
    },
  });

  const acme = await prisma.company.upsert({
    where: { rfc: 'ACM260101AAA' },
    update: {},
    create: {
      name: 'Acme Corporation',
      businessName: 'Acme Corporation S.A. de C.V.',
      rfc: 'ACM260101AAA',
      email: 'contacto@acme.com',
      phone: '5551111111',
      address: 'Ciudad de México',
    },
  });

  const globex = await prisma.company.upsert({
    where: { rfc: 'GLO260101BBB' },
    update: {},
    create: {
      name: 'Globex Corporation',
      businessName: 'Globex Corporation S.A. de C.V.',
      rfc: 'GLO260101BBB',
      email: 'contacto@globex.com',
      phone: '5552222222',
      address: 'Monterrey, Nuevo León',
    },
  });

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@vticket.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@vticket.com',
      password,
    },
  });

  const adminAcme = await prisma.user.upsert({
    where: { email: 'admin.acme@vticket.com' },
    update: {},
    create: {
      name: 'Admin Acme',
      email: 'admin.acme@vticket.com',
      password,
    },
  });

  const managerAcme = await prisma.user.upsert({
    where: { email: 'manager.acme@vticket.com' },
    update: {},
    create: {
      name: 'Manager Acme',
      email: 'manager.acme@vticket.com',
      password,
    },
  });

  const engineerAcme = await prisma.user.upsert({
    where: { email: 'engineer.acme@vticket.com' },
    update: {},
    create: {
      name: 'Engineer Acme',
      email: 'engineer.acme@vticket.com',
      password,
    },
  });

  const adminGlobex = await prisma.user.upsert({
    where: { email: 'admin.globex@vticket.com' },
    update: {},
    create: {
      name: 'Admin Globex',
      email: 'admin.globex@vticket.com',
      password,
    },
  });

  const managerGlobex = await prisma.user.upsert({
    where: { email: 'manager.globex@vticket.com' },
    update: {},
    create: {
      name: 'Manager Globex',
      email: 'manager.globex@vticket.com',
      password,
    },
  });

  const engineerGlobex = await prisma.user.upsert({
    where: { email: 'engineer.globex@vticket.com' },
    update: {},
    create: {
      name: 'Engineer Globex',
      email: 'engineer.globex@vticket.com',
      password,
    },
  });

  await prisma.companyUser.createMany({
    data: [
      { companyId: null, userId: superAdmin.id, roleId: superAdminRole.id },
      { companyId: acme.id, userId: adminAcme.id, roleId: adminRole.id },
      { companyId: acme.id, userId: managerAcme.id, roleId: managerRole.id },
      { companyId: acme.id, userId: engineerAcme.id, roleId: engineerRole.id },
      { companyId: globex.id, userId: adminGlobex.id, roleId: adminRole.id },
      { companyId: globex.id, userId: managerGlobex.id, roleId: managerRole.id },
      { companyId: globex.id, userId: engineerGlobex.id, roleId: engineerRole.id },
    ],
    skipDuplicates: true,
  });

  const clientAcme = await prisma.client.create({
    data: {
      companyId: acme.id,
      name: 'Cliente Acme',
      rfc: 'CAC260101AAA',
      email: 'cliente@acme.com',
      phone: '5553333333',
      address: 'Av. Acme 123',
    },
  });

  const clientGlobex = await prisma.client.create({
    data: {
      companyId: globex.id,
      name: 'Cliente Globex',
      rfc: 'CGX260101BBB',
      email: 'cliente@globex.com',
      phone: '5554444444',
      address: 'Av. Globex 456',
    },
  });

  const contactAcme = await prisma.contact.create({
    data: {
      clientId: clientAcme.id,
      name: 'Contacto Acme',
      email: 'contacto@acme.com',
      phone: '5555555555',
      position: 'Coordinador TI',
      isPrimary: true,
    },
  });

  const contactGlobex = await prisma.contact.create({
    data: {
      clientId: clientGlobex.id,
      name: 'Contacto Globex',
      email: 'contacto@globex.com',
      phone: '5556666666',
      position: 'Gerente Sistemas',
      isPrimary: true,
    },
  });

  const statusAcme = await prisma.ticketStatus.create({
    data: {
      companyId: acme.id,
      name: 'Abierto',
      slug: 'abierto',
      color: '#22c55e',
      isDefault: true,
    },
  });

  const statusGlobex = await prisma.ticketStatus.create({
    data: {
      companyId: globex.id,
      name: 'Nuevo',
      slug: 'nuevo',
      color: '#3b82f6',
      isDefault: true,
    },
  });

  const categoryAcme = await prisma.ticketCategory.create({
    data: {
      companyId: acme.id,
      name: 'Infraestructura',
      slug: 'infraestructura',
    },
  });

  const categoryGlobex = await prisma.ticketCategory.create({
    data: {
      companyId: globex.id,
      name: 'ERP',
      slug: 'erp',
    },
  });

  const priorityAcme = await prisma.ticketPriority.create({
    data: {
      companyId: acme.id,
      name: 'Alta',
      slug: 'alta',
      level: 3,
      color: '#ef4444',
    },
  });

  const priorityGlobex = await prisma.ticketPriority.create({
    data: {
      companyId: globex.id,
      name: 'Crítica',
      slug: 'critica',
      level: 4,
      color: '#dc2626',
    },
  });

  const ticketAcme = await prisma.ticket.create({
    data: {
      companyId: acme.id,
      clientId: clientAcme.id,
      contactId: contactAcme.id,
      statusId: statusAcme.id,
      categoryId: categoryAcme.id,
      priorityId: priorityAcme.id,
      createdById: adminAcme.id,
      assignedToId: engineerAcme.id,
      title: 'Error en servidor web',
      description: 'El servidor web principal no responde.',
      code: 'VT-000001',
    },
  });

  const ticketGlobex = await prisma.ticket.create({
    data: {
      companyId: globex.id,
      clientId: clientGlobex.id,
      contactId: contactGlobex.id,
      statusId: statusGlobex.id,
      categoryId: categoryGlobex.id,
      priorityId: priorityGlobex.id,
      createdById: adminGlobex.id,
      assignedToId: engineerGlobex.id,
      title: 'Falla en ERP',
      description: 'El sistema ERP no permite iniciar sesión.',
      code: 'VT-000002',
    },
  });

  await prisma.ticketComment.createMany({
    data: [
      {
        ticketId: ticketAcme.id,
        userId: adminAcme.id,
        comment: 'Comentario inicial del ticket Acme.',
      },
      {
        ticketId: ticketGlobex.id,
        userId: adminGlobex.id,
        comment: 'Comentario inicial del ticket Globex.',
      },
    ],
  });

  await prisma.ticketAttachment.createMany({
    data: [
      {
        ticketId: ticketAcme.id,
        fileName: 'evidencia-acme.pdf',
        fileUrl: 'https://example.com/evidencia-acme.pdf',
        mimeType: 'application/pdf',
        size: 1024,
      },
      {
        ticketId: ticketGlobex.id,
        fileName: 'evidencia-globex.pdf',
        fileUrl: 'https://example.com/evidencia-globex.pdf',
        mimeType: 'application/pdf',
        size: 2048,
      },
    ],
  });

  await prisma.ticketHistory.createMany({
    data: [
      {
        ticketId: ticketAcme.id,
        userId: adminAcme.id,
        action: 'TICKET_CREATED',
        oldValue: null,
        newValue: 'Ticket Acme creado desde seed',
      },
      {
        ticketId: ticketGlobex.id,
        userId: adminGlobex.id,
        action: 'TICKET_CREATED',
        oldValue: null,
        newValue: 'Ticket Globex creado desde seed',
      },
    ],
  });

  console.log('Seed ejecutado correctamente con 2 empresas');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });