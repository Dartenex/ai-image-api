import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  public constructor(private config: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction): any {
    const headerName = 'APP-API-KEY';
    const apiKeyHeaderValue: undefined | string = req.header(headerName);
    if (!apiKeyHeaderValue) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: `Header '${headerName}' not set!`,
      });
    }
    const currentApiKeysString: string = this.config.get<string>('API_KEYS');
    const currentApiKeys: string[] = currentApiKeysString.split(',');
    if (!currentApiKeys.includes(apiKeyHeaderValue)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: `Header '${headerName}' is wrong!`,
      });
    }
    next();
  }
}
