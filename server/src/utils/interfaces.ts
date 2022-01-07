export interface User {
  id?: string;
  username?: string;
  password?: string;
  role?: string;
}

// type definition for acessing req.session.passport...
declare module "express-session" {
  export interface SessionData {
    passport: any;
  }
}

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      role: string;
    }
  }
}
