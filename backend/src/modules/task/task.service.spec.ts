import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { PaginationHelperService } from 'src/common/helper/pagination-helper/pagination-helper.service';
import { IFindOptions } from 'src/common/interface/find-option.interface';
import { IGetTotalOptions } from 'src/common/interface/get-total-option.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './entities/task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let taskModel: Model<TaskDocument>;
  let paginationHelperService: PaginationHelperService;

  const mockTask = {
    _id: new Types.ObjectId(),
    title: 'Test Task',
    body: 'Test Body',
    done: false,
    user: new Types.ObjectId(),
  } as TaskDocument;

  const taskArray = [mockTask];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        PaginationHelperService,
        {
          provide: getModelToken(Task.name),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockTask),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockTask),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(taskArray),
              skip: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              sort: jest.fn().mockReturnThis(),
            }),
            countDocuments: jest.fn().mockResolvedValue(taskArray.length),
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn().mockResolvedValue(mockTask),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskModel = module.get<Model<TaskDocument>>(getModelToken(Task.name));
    paginationHelperService = module.get<PaginationHelperService>(
      PaginationHelperService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneOrFail', () => {
    it('should return a task if found', async () => {
      const execSpy = jest.fn().mockResolvedValueOnce(mockTask as any);
      jest.spyOn(taskModel, 'findOne').mockReturnValueOnce({
        exec: execSpy,
      } as any);
      const result = await service.findOneOrFail({ _id: mockTask._id });
      expect(taskModel.findOne).toHaveBeenCalledWith({ _id: mockTask._id });
      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if no task is found', async () => {
      jest.spyOn(taskModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);
      await expect(
        service.findOneOrFail({ _id: mockTask._id }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneByIdOrFail', () => {
    it('should return a task if found by ID', async () => {
      jest.spyOn(service, 'findOneOrFail').mockResolvedValueOnce(mockTask);
      const result = await service.findOneByIdOrFail(mockTask._id);
      expect(service.findOneOrFail).toHaveBeenCalledWith({ _id: mockTask._id });
      expect(result).toEqual(mockTask);
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        body: 'Task body',
      };
      const taskDocs = { ...mockTask, ...createTaskDto } as TaskDocument;
      jest.spyOn(taskModel, 'create').mockResolvedValue(taskDocs as any);
      const result = await service.create(createTaskDto);
      expect(result).toEqual(taskDocs);
    });
  });

  describe('findAll', () => {
    it('should return a list of tasks', async () => {
      const options = { find: {} };
      const result = await service.findAll(options);
      expect(taskModel.find).toHaveBeenCalledWith(options.find);
      expect(result).toEqual(taskArray);
    });

    it('should apply pagination and sorting options', async () => {
      const options: IFindOptions<Task> = {
        find: {},
        limit: 5,
        page: 2,
        order: { title: 'asc' },
      };
      jest.spyOn(paginationHelperService, 'getOffset').mockReturnValue(5);

      await service.findAll(options);
      expect(taskModel.find().limit).toHaveBeenCalledWith(options.limit);
      expect(taskModel.find().skip).toHaveBeenCalledWith(5);
      expect(taskModel.find().sort).toHaveBeenCalledWith(options.order);
    });
  });

  describe('getTotal', () => {
    it('should return total number of documents', async () => {
      const options: IGetTotalOptions<Task> = { find: {}, limit: 10 };
      const result = await service.getTotal(options);
      expect(taskModel.countDocuments).toHaveBeenCalledWith(options.find);
      expect(result).toEqual(taskArray.length);
    });
  });

  describe('getPaginationMeta', () => {
    it('should return pagination metadata', async () => {
      const options = { find: {}, limit: 10 };
      const total = 20;
      jest.spyOn(service, 'getTotal').mockResolvedValue(total);
      jest.spyOn(paginationHelperService, 'getPaginationMeta').mockReturnValue({
        totalItem: total,
        totalPage: 2,
      });

      const result = await service.getPaginationMeta(options);
      expect(result).toEqual({ totalItem: total, totalPage: 2 });
    });
  });

  describe('update', () => {
    it('should update a task document', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      const result = await service.update(
        {
          ...mockTask,
          save: jest
            .fn()
            .mockResolvedValue({ ...mockTask, title: updateTaskDto.title }),
        } as any,
        updateTaskDto,
      );
      expect(result).toEqual({ ...mockTask, title: updateTaskDto.title });
    });
  });

  describe('remove', () => {
    it('should delete a task by ID', async () => {
      const result = await service.remove(mockTask._id);
      expect(taskModel.findByIdAndDelete).toHaveBeenCalledWith({
        _id: mockTask._id,
      });
      expect(result).toEqual(mockTask);
    });
  });
});
