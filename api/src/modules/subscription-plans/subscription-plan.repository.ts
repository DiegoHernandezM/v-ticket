import prisma from '../../database/prisma';
import {
  CreateSubscriptionPlanDTO,
  UpdateSubscriptionPlanDTO,
} from './subscription-plan.types';

export class SubscriptionPlanRepository {
  create(data: CreateSubscriptionPlanDTO) {
    return prisma.subscriptionPlan.create({
      data,
    });
  }

  findAll() {
    return prisma.subscriptionPlan.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  findActive() {
    return prisma.subscriptionPlan.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  findById(id: number) {
    return prisma.subscriptionPlan.findUnique({
      where: {
        id,
      },
    });
  }

  findBySlug(slug: string) {
    return prisma.subscriptionPlan.findUnique({
      where: {
        slug,
      },
    });
  }

  update(id: number, data: UpdateSubscriptionPlanDTO) {
    return prisma.subscriptionPlan.update({
      where: {
        id,
      },
      data,
    });
  }

  softDelete(id: number) {
    return prisma.subscriptionPlan.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}