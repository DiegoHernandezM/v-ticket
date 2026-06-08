import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export const companyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user) {
    throw new AppError("Usuario no autenticado", 401);
  }

  if (!user.companyId) {
    throw new AppError(
      "El usuario no pertenece a ninguna empresa",
      403
    );
  }

  next();
};