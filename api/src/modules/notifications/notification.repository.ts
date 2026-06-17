import prisma from '../../database/prisma';
import {
  CreateNotificationDTO,
  UpdateNotificationDTO,
} from './notification.types';

export class NotificationRepository {
  create(data: CreateNotificationDTO) {
    return prisma.notification.create({
      data,
      include: this.defaultInclude(),
    });
  }

  findAllByUser(companyId: number, userId: number) {
    return prisma.notification.findMany({
      where: {
        companyId,
        userId,
      },
      include: this.defaultInclude(),
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findUnreadByUser(companyId: number, userId: number) {
    return prisma.notification.count({
      where: {
        companyId,
        userId,
        isRead: false,
      },
    });
  }

  findByIdAndUser(id: number, companyId: number, userId: number) {
    return prisma.notification.findFirst({
      where: {
        id,
        companyId,
        userId,
      },
      include: this.defaultInclude(),
    });
  }

  update(id: number, data: UpdateNotificationDTO) {
    return prisma.notification.update({
      where: { id },
      data,
      include: this.defaultInclude(),
    });
  }

  markAllAsRead(companyId: number, userId: number) {
    return prisma.notification.updateMany({
      where: {
        companyId,
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }

  private defaultInclude() {
    return {
      ticket: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      company: {
        select: {
          id: true,
          name: true,
        },
      },
    };
  }
}