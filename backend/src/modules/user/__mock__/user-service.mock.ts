export const userServiceMock = {
  checkEmailExist: jest.fn(),
  findOneOrFail: jest.fn(),
  createUser: jest.fn(),
  getUserAccessToken: jest.fn(),
  register: jest.fn(),
  login: jest.fn(),
};
