import { AppError } from '../../utils/app-error';
import { AuthUser } from '../../types/auth-user.type';
import { DashboardRepository } from './dashboard.repository';

export class DashboardService {
  private dashboardRepository = new DashboardRepository();

  async getSuperAdminSummary(authUser: AuthUser) {
    if (authUser.role !== 'super_admin') {
      throw new AppError('No tienes permisos para ver este dashboard', 403);
    }

    return this.dashboardRepository.getSuperAdminSummary();
  }

  async getCompanySummary(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      throw new AppError(
        'El super admin debe consultar el dashboard general',
        400
      );
    }

    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.dashboardRepository.getCompanySummary(authUser.companyId);
  }
}