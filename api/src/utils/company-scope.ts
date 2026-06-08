import { AppError } from "./app-error";
import { AuthUser } from "../types/auth-user.type";

export const getScopedCompanyId = (
  authUser: AuthUser,
  requestedCompanyId?: number | null
) => {
  if (authUser.role === "super_admin") {
    return requestedCompanyId ?? null;
  }

  if (!authUser.companyId) {
    throw new AppError("El usuario no pertenece a ninguna empresa", 403);
  }

  return authUser.companyId;
};