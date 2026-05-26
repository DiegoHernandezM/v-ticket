import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);

      return res.json({
        message: 'Login correcto',
        data: result,
      });
    } catch (error) {
      return res.status(401).json({
        message: error instanceof Error ? error.message : 'Error al iniciar sesión',
      });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const userId = Number(req.user?.id);

      const user = await authService.me(userId);

      return res.json({
        data: user,
      });
    } catch (error) {
      return res.status(401).json({
        message: error instanceof Error ? error.message : 'Error al obtener usuario',
      });
    }
  }
}