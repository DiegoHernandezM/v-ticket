import { AppError } from '../../utils/app-error';
import { CompanyRepository } from '../companies/company.repository';
import { SubscriptionPlanRepository } from '../subscription-plans/subscription-plan.repository';
import { CompanySubscriptionRepository } from './company-subscription.repository';
import {
  CreateCompanySubscriptionDTO,
  UpdateCompanySubscriptionDTO,
} from './company-subscription.types';

export class CompanySubscriptionService {
  private companySubscriptionRepository = new CompanySubscriptionRepository();
  private companyRepository = new CompanyRepository();
  private subscriptionPlanRepository = new SubscriptionPlanRepository();

  async create(data: CreateCompanySubscriptionDTO) {
    const company = await this.companyRepository.findById(data.companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    const plan = await this.subscriptionPlanRepository.findById(data.planId);

    if (!plan) {
      throw new AppError('Plan de suscripción no encontrado', 404);
    }

    const currentSubscription =
      await this.companySubscriptionRepository.findCurrentByCompanyId(
        data.companyId
      );

    if (currentSubscription) {
      await this.companySubscriptionRepository.cancel(currentSubscription.id);
    }

    return this.companySubscriptionRepository.create({
      ...data,
      status: data.status ?? 'active',
    });
  }

  async findAll() {
    return this.companySubscriptionRepository.findAll();
  }

  async findById(id: number) {
    const subscription = await this.companySubscriptionRepository.findById(id);

    if (!subscription) {
      throw new AppError('Suscripción de empresa no encontrada', 404);
    }

    return subscription;
  }

  async findByCompanyId(companyId: number) {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    return this.companySubscriptionRepository.findByCompanyId(companyId);
  }

  async findCurrentByCompanyId(companyId: number) {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    const subscription =
      await this.companySubscriptionRepository.findCurrentByCompanyId(
        companyId
      );

    if (!subscription) {
      throw new AppError('La empresa no tiene una suscripción activa', 404);
    }

    return subscription;
  }

  async update(id: number, data: UpdateCompanySubscriptionDTO) {
    await this.findById(id);

    if (data.planId) {
      const plan = await this.subscriptionPlanRepository.findById(data.planId);

      if (!plan) {
        throw new AppError('Plan de suscripción no encontrado', 404);
      }
    }

    return this.companySubscriptionRepository.update(id, data);
  }

  async cancel(id: number) {
    await this.findById(id);

    return this.companySubscriptionRepository.cancel(id);
  }
}