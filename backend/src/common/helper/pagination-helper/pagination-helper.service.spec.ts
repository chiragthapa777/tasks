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

  test('When getOffset is called it should return offset', () => {
    expect(service.getOffset(1, 10)).toBe(0);
    expect(service.getOffset(2, 10)).toBe(10);
  });

  test('When getPagination is called it should result pagination meta', () => {
    expect(service.getPaginationMeta(100, 10)).toStrictEqual({
      totalItem: 100,
      totalPage: 10,
    });

    expect(service.getPaginationMeta(55, 10)).toStrictEqual({
      totalItem: 55,
      totalPage: 6,
    });
  });
});
