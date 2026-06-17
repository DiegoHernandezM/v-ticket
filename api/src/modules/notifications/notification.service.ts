import { AppError } from '../../utils/app-error';
import { AuthUser } from '../../types/auth-user.type';
import { NotificationRepository } from './notification.repository';
import { CreateNotificationDTO } from './notification.types';

export class NotificationService {
  private notificationRepository = new NotificationRepository();

  async create(data: CreateNotificationDTO) {
    return this.notificationRepository.create(data);
  }

  async findMyNotifications(authUser: AuthUser) {
    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.notificationRepository.findAllByUser(
      authUser.companyId,
      authUser.id
    );
  }

  async countMyUnreadNotifications(authUser: AuthUser) {
    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    const total = await this.notificationRepository.findUnreadByUser(
      authUser.companyId,
      authUser.id
    );

    return { total };
  }

  async markAsRead(id: number, authUser: AuthUser) {
    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    const notification = await this.notificationRepository.findByIdAndUser(
      id,
      authUser.companyId,
      authUser.id
    );

    if (!notification) {
      throw new AppError('Notificación no encontrada', 404);
    }

    return this.notificationRepository.update(id, {
      isRead: true,
    });
  }

  async markAllAsRead(authUser: AuthUser) {
    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.notificationRepository.markAllAsRead(
      authUser.companyId,
      authUser.id
    );
  }
}