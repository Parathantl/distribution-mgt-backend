import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY } from '../database';

export interface CustomRequest extends Request {
  token: {
    _id: string;
  };
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const token = req.cookies.auth_token;
  if (!token) {
    res.status(401).send('Not authenticated');
    return;
  }

   const decoded = jwt.verify(token, SECRET_KEY) as { _id: string; name: string; iat: number; exp: number; };
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};

export function generateToken(user: any): string {
    const token = jwt.sign({ _id: user.user_id?.toString(), name: user.username }, SECRET_KEY, {
        expiresIn: '2 days',
      });
  
        return token;
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

  try {
      const token = req.cookies.auth_token;
      if (!token) {
        res.status(401).send('Not authenticated');
        return;
      }
      const decoded = jwt.verify(token, SECRET_KEY);

      if (decoded) {
          res.status(200).send('Authenticated');
          return;
      }else {
          res.status(401).send('Invalid token');
          return;
      }

    } catch (err) {
        res.status(401).send('Please authenticate');
        return;
    }
}