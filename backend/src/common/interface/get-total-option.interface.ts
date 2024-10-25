import { RootFilterQuery } from 'mongoose';

export interface IGetTotalOptions<T = Document> {
  find?: RootFilterQuery<T>;
  limit:number
}
