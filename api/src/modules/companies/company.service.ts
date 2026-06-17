import { CompanyRepository } from './company.repository';
import { CreateCompanyDTO, UpdateCompanyDTO } from './company.types';
import { AppError } from '../../utils/app-error';
import { SubscriptionPlanRepository } from '../subscription-plans/subscription-plan.repository';
import { CompanySubscriptionRepository } from '../company-subscriptions/company-subscription.repository';



export class CompanyService {
  private companyRepository = new CompanyRepository();
  private subscriptionPlanRepository = new SubscriptionPlanRepository();
  private companySubscriptionRepository = new CompanySubscriptionRepository();

  async create(data: CreateCompanyDTO) {
    const companyWithSameRfc = data.rfc
      ? await this.companyRepository.findByRfc(data.rfc)
      : null;

    if (companyWithSameRfc) {
      throw new AppError('Ya existe una empresa registrada con ese RFC', 400);
    }

    const company = await this.companyRepository.create({
      ...data,
      subscriptionStatus: 'trial',
    });

    const trialPlan = await this.subscriptionPlanRepository.findBySlug('trial');

    if (!trialPlan) {
      throw new AppError('El plan Trial no existe', 404);
    }

    await this.companySubscriptionRepository.create({
      companyId: company.id,
      planId: trialPlan.id,
      status: 'trial',
      startsAt: new Date(),
      trialEndsAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    return company;
  }

  async findAll() {
    return this.companyRepository.findAll();
  }

  async findById(id: number) {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    return company;
  }

  async update(id: number, data: UpdateCompanyDTO) {
    await this.findById(id);

    if (data.rfc) {
      const companyWithSameRfc = await this.companyRepository.findByRfc(data.rfc);

      if (companyWithSameRfc && companyWithSameRfc.id !== id) {
        throw new AppError('Ya existe otra empresa registrada con ese RFC', 400);
      }
    }

    return this.companyRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.companyRepository.delete(id);
  }
}