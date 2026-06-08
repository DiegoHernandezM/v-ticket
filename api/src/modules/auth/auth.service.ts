import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../database/prisma';
import { LoginDTO } from './auth.types';
import { env } from '../../config/env';


export class AuthService {
  async login(data: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        companyUsers: {
          include: {
            company: true,
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const passwordIsValid = await bcrypt.compare(data.password, user.password);

    if (!passwordIsValid) {
      throw new Error('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new Error('Usuario inactivo');
    }

    const companyUser = user.companyUsers[0];

    const superAdminRelation = user.companyUsers.find(
      (companyUser) => companyUser.role.name === "super_admin"
    );

    if (!companyUser && !superAdminRelation) {
      throw new Error("El usuario no pertenece a ninguna empresa");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: superAdminRelation ? "super_admin" : companyUser?.role.slug,
        companyId: companyUser?.companyId ?? null,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN,
      },
    );

    const { password, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  }

  async me(userId: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        companyUsers: {
          include: {
            company: true,
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}