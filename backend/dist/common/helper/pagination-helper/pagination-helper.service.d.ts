import { IPaginationMeta } from 'src/common/interface/pagination-meta.interface';
export declare class PaginationHelperService {
    getOffset(page: number, limit: number): number;
    getPaginationMeta(total: number, limit: number): IPaginationMeta;
}
