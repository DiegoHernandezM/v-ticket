import prisma from '../../database/prisma';
import {
  CreateCompanyUserDTO,
  UpdateCompanyUserDTO,
} from './company-user.types';

export class CompanyUserRepository {
  async create(data: CreateCompanyUserDTO) {
    return prisma.companyUser.create({
      data,
      include: {
        company: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
          },
        },
        role: true,
      },
    });
  }

  async findAll() {
    return prisma.companyUser.findMany({
      include: {
        company: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
          },
        },
        role: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.companyUser.findUnique({
      where: { id },
      include: {
        company: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
          },
        },
        role: true,
      },
    });
  }

  async findByCompanyUserRole(companyId: number | null, userId: number, roleId: number) {
    return prisma.companyUser.findFirst({
      where: {
        companyId,
        userId,
        roleId,
      },
    });
  }

  async update(id: number, data: UpdateCompanyUserDTO) {
    return prisma.companyUser.update({
      where: { id },
      data,
      include: {
        company: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
          },
        },
        role: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.companyUser.update({
      where: { id },
      data: {
        isActive: false,
      },
      include: {
        company: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
          },
        },
        role: true,
      },
    });
  }
}