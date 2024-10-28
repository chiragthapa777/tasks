export const mongoModelMock = {
  findOne: jest.fn(),
  findByIdAndDelete: jest.fn(),
  find: jest.fn().mockReturnValue({
    exec: jest.fn(),
    skip: jest.fn(),
    limit: jest.fn(),
    sort: jest.fn(),
  }),
  countDocuments: jest.fn(),
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn(),
};
