/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import fileUpload from 'express-fileupload';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  accessToken: string;
  expiresAt: Date;
  mfatoken?: string;
}

export interface RequestWithUser extends Request {
  body: any;
  params: any;
  userId: number;
  organisationId: string;
  role?: string,
  files?: fileUpload.FileArray | null | undefined;
}
