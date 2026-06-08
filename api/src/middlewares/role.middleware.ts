import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export const roleMiddleware = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new AppError("Usuario no autenticado", 401);
    }

    if (!user.role) {
      throw new AppError("El usuario no tiene un rol asignado", 403);
    }

    if (!allowedRoles.includes(user.role)) {
      throw new AppError("No tienes permisos para realizar esta acción", 403);
    }

    next();
  };
};
