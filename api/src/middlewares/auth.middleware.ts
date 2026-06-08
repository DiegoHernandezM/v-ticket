// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';


interface JwtPayload {
  id: number;
  email: string;
  role: string;
  companyId: number | null;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Token no proporcionado',
    });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Formato de token inválido',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      env.JWT_SECRET,
    ) as JwtPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email, 
      role: decoded.role,
      companyId: decoded.companyId,
    };

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
    });
  }
}