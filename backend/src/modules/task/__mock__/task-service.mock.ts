export const taskServiceMock = {
  findOneOrFail: jest.fn(),
  findOneByIdOrFail: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
  getTotal: jest.fn(),
  getPaginationMeta: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};
