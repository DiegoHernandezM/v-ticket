import prisma from '../../database/prisma';
import { CreateCompanyDTO, UpdateCompanyDTO } from './company.types';

export class CompanyRepository {
  async create(data: CreateCompanyDTO) {
    return prisma.company.create({
      data,
    });
  }

  async findAll() {
    return prisma.company.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.company.findUnique({
      where: { id },
    });
  }

  async findByRfc(rfc: string) {
    return prisma.company.findUnique({
      where: { rfc },
    });
  }

  async update(id: number, data: UpdateCompanyDTO) {
    return prisma.company.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.company.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}