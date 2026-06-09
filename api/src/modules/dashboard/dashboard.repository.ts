import prisma from '../../database/prisma';

export class DashboardRepository {
  async getSuperAdminSummary() {
    const [
      totalCompanies,
      activeCompanies,
      inactiveCompanies,
      trialCompanies,
      totalUsers,
      totalClients,
      totalTickets,
      ticketsByCompany,
    ] = await Promise.all([
      prisma.company.count(),
      prisma.company.count({ where: { isActive: true } }),
      prisma.company.count({ where: { isActive: false } }),
      prisma.company.count({ where: { subscriptionStatus: 'trial' } }),
      prisma.user.count(),
      prisma.client.count(),
      prisma.ticket.count(),
      prisma.company.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              tickets: true,
              clients: true,
              companyUsers: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      }),
    ]);

    return {
      totalCompanies,
      activeCompanies,
      inactiveCompanies,
      trialCompanies,
      totalUsers,
      totalClients,
      totalTickets,
      ticketsByCompany,
    };
  }

  async getCompanySummary(companyId: number) {
    const [
      totalTickets,
      openTickets,
      closedTickets,
      ticketsByStatus,
      ticketsByPriority,
      ticketsByEngineer,
      ticketsByHelpDeskTeam,
    ] = await Promise.all([
      prisma.ticket.count({
        where: { companyId },
      }),

      prisma.ticket.count({
        where: {
          companyId,
          status: {
            slug: {
              not: 'closed',
            },
          },
        },
      }),

      prisma.ticket.count({
        where: {
          companyId,
          status: {
            slug: 'closed',
          },
        },
      }),

      prisma.ticketStatus.findMany({
        where: { companyId },
        select: {
          id: true,
          name: true,
          slug: true,
          color: true,
          _count: {
            select: {
              tickets: true,
            },
          },
        },
      }),

      prisma.ticketPriority.findMany({
        where: { companyId },
        select: {
          id: true,
          name: true,
          slug: true,
          color: true,
          level: true,
          _count: {
            select: {
              tickets: true,
            },
          },
        },
        orderBy: {
          level: 'asc',
        },
      }),

      prisma.user.findMany({
        where: {
          companyUsers: {
            some: {
              companyId,
              role: {
                slug: 'engineer',
              },
              isActive: true,
            },
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          assignedTickets: {
            where: {
              companyId,
              status: {
                slug: {
                  not: 'closed',
                },
              },
            },
            select: {
              id: true,
            },
          },
        },
      }),

      prisma.helpDeskTeam.findMany({
        where: {
          companyId,
        },
        select: {
          id: true,
          name: true,
          isActive: true,
          _count: {
            select: {
              tickets: true,
              members: true,
            },
          },
        },
      }),
    ]);

    return {
      totalTickets,
      openTickets,
      closedTickets,
      ticketsByStatus,
      ticketsByPriority,
      ticketsByEngineer: ticketsByEngineer.map(engineer => ({
        id: engineer.id,
        name: engineer.name,
        email: engineer.email,
        openTickets: engineer.assignedTickets.length,
      })),
      ticketsByHelpDeskTeam,
    };
  }
}