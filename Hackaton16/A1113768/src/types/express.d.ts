declare namespace Express {
  interface Request {
    userId: import("mongoose").Types.ObjectId;
    role: string;
  }
}
