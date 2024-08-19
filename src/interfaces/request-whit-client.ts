import { Request } from 'express';

export interface RequestWhitClient extends Request {
  user: {
    sub: string,
    name: string,
    iat: number,
    exp: number
  };
}
