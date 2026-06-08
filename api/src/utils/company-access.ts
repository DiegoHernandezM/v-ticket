import prisma from "../database/prisma.js";
import { AppError } from "./app-error.js";

export const validateCompanyAccess = async (
  resourceCompanyId: number,
  userCompanyId: number
) => {
  if (resourceCompanyId !== userCompanyId) {
    throw new AppError(
      "No tienes acceso a recursos de otra empresa",
      403
    );
  }
};