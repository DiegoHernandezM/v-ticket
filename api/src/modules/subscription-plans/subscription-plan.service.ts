import { AppError } from '../../utils/app-error';
import { SubscriptionPlanRepository } from './subscription-plan.repository';
import {
  CreateSubscriptionPlanDTO,
  UpdateSubscriptionPlanDTO,
} from './subscription-plan.types';

export class SubscriptionPlanService {
  private subscriptionPlanRepository = new SubscriptionPlanRepository();

  async create(data: CreateSubscriptionPlanDTO) {
    const existingPlan = await this.subscriptionPlanRepository.findBySlug(
      data.slug
    );

    if (existingPlan) {
      throw new AppError('Ya existe un plan con ese slug', 400);
    }

    return this.subscriptionPlanRepository.create(data);
  }

  async findAll() {
    return this.subscriptionPlanRepository.findAll();
  }

  async findActive() {
    return this.subscriptionPlanRepository.findActive();
  }

  async findById(id: number) {
    const plan = await this.subscriptionPlanRepository.findById(id);

    if (!plan) {
      throw new AppError('Plan de suscripción no encontrado', 404);
    }

    return plan;
  }

  async update(id: number, data: UpdateSubscriptionPlanDTO) {
    await this.findById(id);

    if (data.slug) {
      const existingPlan = await this.subscriptionPlanRepository.findBySlug(
        data.slug
      );

      if (existingPlan && existingPlan.id !== id) {
        throw new AppError('Ya existe un plan con ese slug', 400);
      }
    }

    return this.subscriptionPlanRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.subscriptionPlanRepository.softDelete(id);
  }
}