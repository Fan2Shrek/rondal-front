import { merge } from 'lodash';

import { Product } from "./Ressource/Product";

export class ApiClient {
    private path = '/api';

    public product: Product;
    
    constructor(private baseUrl: string,) {
        this.product = new Product(this);
    }

    async get<R = Response>(url: string, options?: RequestInit, returnPromise = false): Promise<R> {
        return this.authenticate<R>(() => fetch(
          this.baseUrl + this.path + url,
          this._buildOptions('GET', null, options)
        ) as Promise<R>, 2, returnPromise);
    }

    async authenticate<T>(request: () => Promise<T>, retries = 2, returnPromise = false): Promise<T> {
        const awaited: Awaited<Promise<any>> = await request();

        return awaited?.status === 204 || returnPromise ? awaited : awaited?.json();
      }

    _buildOptions(method: string, body?: any, options?: RequestInit): RequestInit {
        let _options = {
          method: method,
          headers: {
            Accept: 'application/ld+json',
            "Content-Type": "application/json"
          },
          ...(body && {body: JSON.stringify(body)})
        };
    
        return merge(_options, options);
    }
}
