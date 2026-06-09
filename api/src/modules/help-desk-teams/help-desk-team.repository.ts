import prisma from '../../database/prisma';
import {
  CreateHelpDeskTeamDTO,
  UpdateHelpDeskTeamDTO,
} from './help-desk-team.types';

export class HelpDeskTeamRepository {
  create(data: CreateHelpDeskTeamDTO & { companyId: number }) {
    return prisma.helpDeskTeam.create({
      data,
    });
  }

  findAll() {
    return prisma.helpDeskTeam.findMany({
      include: {
        company: true,
        members: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  findAllByCompany(companyId: number) {
    return prisma.helpDeskTeam.findMany({
      where: {
        companyId,
      },
      include: {
        company: true,
        members: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  findById(id: number) {
    return prisma.helpDeskTeam.findUnique({
      where: { id },
      include: {
        company: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  findByIdAndCompany(id: number, companyId: number) {
    return prisma.helpDeskTeam.findFirst({
      where: {
        id,
        companyId,
      },
      include: {
        company: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  findByCompanyAndName(companyId: number, name: string) {
    return prisma.helpDeskTeam.findFirst({
      where: {
        companyId,
        name,
      },
    });
  }

  update(id: number, data: UpdateHelpDeskTeamDTO) {
    return prisma.helpDeskTeam.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return prisma.helpDeskTeam.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}