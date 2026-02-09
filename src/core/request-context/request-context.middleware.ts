import { Injectable, NestMiddleware } from '@nestjs/common';

import { RequestContextService } from './request-context.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private requestContext: RequestContextService) {}

  use(req: any, res: any, next: (error?: any) => void) {
    const store = {
      requestId: crypto.randomUUID(),
    };

    this.requestContext.run(store, () => {
      next();
    });
  }
}
