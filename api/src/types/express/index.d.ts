declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
        companyId?: number;
      };
    }
  }
}

export {};
