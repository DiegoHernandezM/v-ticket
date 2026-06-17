import { Request, Response } from 'express';
import { NotificationService } from './notification.service';

export class NotificationController {
  private notificationService = new NotificationService();

  findMyNotifications = async (req: Request, res: Response) => {
    const notifications = await this.notificationService.findMyNotifications(
      req.user!
    );

    return res.json({
      success: true,
      data: notifications,
    });
  };

  countUnread = async (req: Request, res: Response) => {
    const total = await this.notificationService.countMyUnreadNotifications(
      req.user!
    );

    return res.json({
      success: true,
      data: total,
    });
  };

  markAsRead = async (req: Request, res: Response) => {
    const notification = await this.notificationService.markAsRead(
      Number(req.params.id),
      req.user!
    );

    return res.json({
      success: true,
      message: 'Notificación marcada como leída',
      data: notification,
    });
  };

  markAllAsRead = async (req: Request, res: Response) => {
    const result = await this.notificationService.markAllAsRead(req.user!);

    return res.json({
      success: true,
      message: 'Notificaciones marcadas como leídas',
      data: result,
    });
  };
}