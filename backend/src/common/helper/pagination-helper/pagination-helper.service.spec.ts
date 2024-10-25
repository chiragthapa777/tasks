import { Test, TestingModule } from '@nestjs/testing';
import { PaginationHelperService } from './pagination-helper.service';

describe('PaginationHelperService', () => {
  let service: PaginationHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationHelperService],
    }).compile();

    service = module.get<PaginationHelperService>(PaginationHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
