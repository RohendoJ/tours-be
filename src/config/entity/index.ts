import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface Jwt extends JwtPayload {
  id: string;
}

export interface User extends Request {
  user: Jwt;
}
