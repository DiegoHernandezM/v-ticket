import prisma from '../../database/prisma';
import {
  CreateCompanySubscriptionDTO,
  UpdateCompanySubscriptionDTO,
} from './company-subscription.types';

export class CompanySubscriptionRepository {
  create(data: CreateCompanySubscriptionDTO) {
    return prisma.companySubscription.create({
      data,
      include: {
        company: true,
        plan: true,
      },
    });
  }

  findAll() {
    return prisma.companySubscription.findMany({
      include: {
        company: true,
        plan: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  findById(id: number) {
    return prisma.companySubscription.findUnique({
      where: { id },
      include: {
        company: true,
        plan: true,
      },
    });
  }

  findByCompanyId(companyId: number) {
    return prisma.companySubscription.findMany({
      where: {
        companyId,
      },
      include: {
        plan: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  findCurrentByCompanyId(companyId: number) {
    return prisma.companySubscription.findFirst({
      where: {
        companyId,
        status: {
          in: ['trial', 'active'],
        },
      },
      include: {
        plan: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  update(id: number, data: UpdateCompanySubscriptionDTO) {
    return prisma.companySubscription.update({
      where: { id },
      data,
      include: {
        company: true,
        plan: true,
      },
    });
  }

  cancel(id: number) {
    return prisma.companySubscription.update({
      where: { id },
      data: {
        status: 'cancelled',
        endsAt: new Date(),
      },
      include: {
        company: true,
        plan: true,
      },
    });
  }
}