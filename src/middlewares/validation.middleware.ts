/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { logger } from '../services/logger.service';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  whitelist = true,
  forbidNonWhitelisted = false,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req[value]), { whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(', ');
        logger.debug("validationMiddleware errors: " + message);
        res.status(403).send({ id: -1, error: message });
        return;
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
