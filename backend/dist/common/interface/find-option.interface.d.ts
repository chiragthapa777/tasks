import { RootFilterQuery } from 'mongoose';
export interface IFindOptions<T = Document> {
    find?: RootFilterQuery<T>;
    page?: number;
    limit?: number;
    order?: Record<string, 'asc' | 'desc'>;
}
