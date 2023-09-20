import { stringify } from 'querystring';

import { ApiClient } from '..';
import type { ProductType } from 'src/types/product';
import type { SearchResult } from 'src/components/types';

export class Product {
    public constructor (private client: ApiClient) {}

    async getAll(query): Promise<SearchResult<ProductType>> {
        const res = await this.client.get(`/products?${stringify(query, { encodeValuesOnly: true })}`);
    
        return {
            items: res?.['hydra:member'] ?? [],
            total:res?.['hydra:totalItems'] ?? 0
        }
    }
}
