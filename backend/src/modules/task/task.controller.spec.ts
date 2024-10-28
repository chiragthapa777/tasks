import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { HelperModule } from 'src/common/helper/helper.module';
import { IFindOptions } from 'src/common/interface/find-option.interface';
import { IPaginationMeta } from 'src/common/interface/pagination-meta.interface';
import { IUserPayload } from '../user/interface/user-payload.interface';
import { taskServiceMock } from './__mock__/task-service.mock';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDocument } from './entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockUser: IUserPayload = {
    _id: new Types.ObjectId().toString(),
    email: 'test@example.com',
    name: 'Test User',
  };

  const mockTask: TaskDocument = {
    _id: new Types.ObjectId(),
    title: 'Test Task',
    body: 'Task body',
    user: new Types.ObjectId(mockUser._id),
    __v: 1,
  } as TaskDocument;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: taskServiceMock }],
      imports: [HelperModule],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When create is called', () => {
    let createDto: CreateTaskDto = {
      title: 'title',
      body: 'body',
    };
    let result: TaskDocument;
    const createdTask = { ...createDto, user: mockUser._id };
    taskServiceMock.create.mockReturnValue(createdTask);

    beforeAll(async () => {
      result = await controller.create(createDto, mockUser);
    });

    it('Should return a new user', () => {
      expect(result).toStrictEqual(createdTask);
    });

    it('Should call create function from service', () => {
      expect(service.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...createDto,
          user: new Types.ObjectId(mockUser._id),
        }),
      );
    });
  });

  describe('findAll', () => {
    const tasks = [mockTask];
    const paginationMeta: IPaginationMeta = {
      totalItem: 10,
      totalPage: 1,
    };
    describe('When called with default pagination option', () => {
      taskServiceMock.findAll.mockResolvedValue(tasks);
      taskServiceMock.getPaginationMeta.mockResolvedValue(paginationMeta);
      let result;
      beforeEach(async () => {
        result = await controller.findAll({}, mockUser);
      });

      it('should call the findAll function with default search value', () => {
        expect(service.findAll).toHaveBeenCalledWith<[IFindOptions]>(
          expect.objectContaining({
            find: {
              user: new Types.ObjectId(mockUser._id),
            },
          }),
        );
      });

      it('should call the getPaginationMeta function with default search value', () => {
        expect(service.getPaginationMeta).toHaveBeenCalledWith<[IFindOptions]>(
          expect.objectContaining({
            find: {
              user: new Types.ObjectId(mockUser._id),
            },
            limit: undefined,
          }),
        );
      });

      it('should return the value with pagination data', () => {
        expect(result).toEqual({ data: tasks, paginationMeta });
      });
    });

    describe('When called with custom pagination option', () => {
      taskServiceMock.findAll.mockResolvedValue(tasks);
      taskServiceMock.getPaginationMeta.mockResolvedValue(paginationMeta);
      const query: PaginationQueryDto = {
        limit: 10,
        page: 2,
        search: 'test',
        sortBy: 'createdAt',
        sortDirection: 'desc',
      };
      let result;
      beforeEach(async () => {
        result = await controller.findAll(
          {
            ...query,
          },
          mockUser,
        );
      });

      it('should call the findAll function with param', () => {
        expect(service.findAll).toHaveBeenCalledWith<[IFindOptions]>(
          expect.objectContaining({
            limit: query.limit,
            page: query.page,
            find: {
              user: new Types.ObjectId(mockUser._id),
              title: {
                $regex: new RegExp(query.search),
                $options: 'i',
              },
            },
            order: {
              [query.sortBy]: query?.sortDirection,
            },
          }),
        );
      });

      it('should call the getPaginationMeta function with find option', () => {
        expect(service.getPaginationMeta).toHaveBeenCalledWith<[IFindOptions]>(
          expect.objectContaining({
            find: {
              user: new Types.ObjectId(mockUser._id),
              title: {
                $regex: new RegExp(query.search),
                $options: 'i',
              },
            },
            limit: query.limit,
          }),
        );
      });

      it('should return the value with pagination data', () => {
        expect(result).toEqual({ data: tasks, paginationMeta });
      });
    });
  });

  describe('findOne', () => {
    it('should return a specific task', async () => {
      taskServiceMock.findOneOrFail.mockResolvedValue(mockTask);

      const result = await controller.findOne(
        mockTask._id.toString(),
        mockUser,
      );

      expect(service.findOneOrFail).toHaveBeenCalledWith({
        user: new Types.ObjectId(mockUser._id),
        _id: mockTask._id?.toString(),
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        body: 'Updated body',
      };
      const updatedTask = { ...mockTask, ...updateTaskDto };
      taskServiceMock.findOneOrFail.mockResolvedValue(mockTask);
      taskServiceMock.update.mockResolvedValue(updatedTask);

      const result = await controller.update(
        mockTask._id.toString(),
        updateTaskDto,
        mockUser,
      );

      expect(service.findOneOrFail).toHaveBeenCalledWith({
        user: new Types.ObjectId(mockUser._id),
        _id: mockTask._id?.toString(),
      });
      expect(service.update).toHaveBeenCalledWith(
        expect.objectContaining(mockTask),
        expect.objectContaining(updateTaskDto),
      );
      expect(result).toEqual(updatedTask);
    });

    it('should throw a NotFoundException if the task is not found', async () => {
      taskServiceMock.findOneOrFail.mockRejectedValue(new NotFoundException());

      await expect(
        controller.update(mockTask._id.toString(), {}, mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      taskServiceMock.findOneOrFail.mockResolvedValue(mockTask);
      taskServiceMock.remove.mockResolvedValue(mockTask);

      const result = await controller.remove(mockTask._id.toString(), mockUser);

      expect(service.findOneOrFail).toHaveBeenCalledWith({
        user: new Types.ObjectId(mockUser._id),
        _id: mockTask._id?.toString(),
      });
      expect(service.remove).toHaveBeenCalledWith(mockTask._id.toString());
      expect(result).toEqual(mockTask);
    });

    it('should throw a NotFoundException if the task is not found', async () => {
      taskServiceMock.findOneOrFail.mockRejectedValue(new NotFoundException());

      await expect(
        controller.remove(mockTask._id.toString(), mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
