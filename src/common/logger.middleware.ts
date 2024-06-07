import type { NestMiddleware } from '@nestjs/common';

import { Injectable, Logger } from '@nestjs/common';

import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(`${req.ip} ${req.method} ${res.statusCode} ${req.originalUrl}`);
    });

    next();
  }
}
