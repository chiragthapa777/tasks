import { Injectable } from '@nestjs/common';
import { IPaginationMeta } from 'src/common/interface/pagination-meta.interface';

@Injectable()
export class PaginationHelperService {
  getOffset(page: number, limit: number): number {
    return limit * (page - 1);
  }

  getPaginationMeta(total: number, limit: number): IPaginationMeta {
    return {
      totalItem: total,
      totalPage: Math.ceil(total / limit),
    };
  }
}
