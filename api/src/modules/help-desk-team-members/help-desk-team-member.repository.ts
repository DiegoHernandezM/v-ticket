import prisma from '../../database/prisma';
import {
  CreateHelpDeskTeamMemberDTO,
  UpdateHelpDeskTeamMemberDTO,
} from './help-desk-team-member.types';

export class HelpDeskTeamMemberRepository {
  create(data: CreateHelpDeskTeamMemberDTO) {
    return prisma.helpDeskTeamMember.create({
      data,
      include: {
        team: true,
        user: true,
      },
    });
  }

  findAll() {
    return prisma.helpDeskTeamMember.findMany({
      include: {
        team: true,
        user: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  findAllByCompany(companyId: number) {
    return prisma.helpDeskTeamMember.findMany({
      where: {
        team: {
          companyId,
        },
      },
      include: {
        team: true,
        user: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  findById(id: number) {
    return prisma.helpDeskTeamMember.findUnique({
      where: { id },
      include: {
        team: true,
        user: true,
      },
    });
  }

  findByIdAndCompany(id: number, companyId: number) {
    return prisma.helpDeskTeamMember.findFirst({
      where: {
        id,
        team: {
          companyId,
        },
      },
      include: {
        team: true,
        user: true,
      },
    });
  }

  findByTeamAndUser(teamId: number, userId: number) {
    return prisma.helpDeskTeamMember.findFirst({
      where: {
        teamId,
        userId,
      },
    });
  }

  findByTeamId(teamId: number) {
    return prisma.helpDeskTeamMember.findMany({
      where: {
        teamId,
      },
      include: {
        user: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  update(id: number, data: UpdateHelpDeskTeamMemberDTO) {
    return prisma.helpDeskTeamMember.update({
      where: { id },
      data,
      include: {
        team: true,
        user: true,
      },
    });
  }

  delete(id: number) {
    return prisma.helpDeskTeamMember.update({
      where: { id },
      data: {
        isActive: false,
      },
      include: {
        team: true,
        user: true,
      },
    });
  }
}