import { Injectable } from '@nestjs/common';

import { AsyncLocalStorage } from 'async_hooks';

type RequestContextStore = {
  requestId: string;
  userId?: string;
};

@Injectable()
export class RequestContextService<
  T extends RequestContextStore = RequestContextStore,
> {
  private readonly als = new AsyncLocalStorage<T>();

  run(store: T, callback: () => void): void {
    this.als.run(store, callback);
  }

  getStore(): T {
    const store = this.als.getStore();

    if (!store) {
      throw new Error('RequestContext не инициализован');
    }

    return store;
  }

  get<K extends keyof T>(key: K): T[K] {
    const store = this.als.getStore();

    if (!store) {
      throw new Error('RequestContext не инициализован');
    }

    return store?.[key];
  }

  set<K extends keyof RequestContextStore>(key: K, value: T[K]): void {
    const store = this.als.getStore();

    if (!store) {
      throw new Error('RequestContext не инициализован');
    }

    store[key] = value;
  }
}
