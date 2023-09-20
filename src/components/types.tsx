'use client';

export type SearchQuery = {
    sorts?: Array<SortQuery>,
    filters?: any,
    pagination?: boolean,
    page?: number,
    itemsPerPage?: number,
}

export type SortQuery = {
    field: string,
    direction: 'asc' | 'desc',
}
