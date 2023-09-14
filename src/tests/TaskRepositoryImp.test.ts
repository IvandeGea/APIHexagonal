import TaskRepositoryImp from "../infraestructure/repositories/TaskRepositoryImp";
import Task from "../core/domain/entities/Task";
import TaskModel from "../core/repositories/TaskModel";

jest.mock("../core/repositories/TaskModel", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("infrastructure/repositories/TaskRepositoryImp", () => {
  let taskRepository: TaskRepositoryImp;

  beforeEach(() => {
    taskRepository = new TaskRepositoryImp();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should add a new task", async () => {
    const newTask: Task = { _id: "1", title: "Test Task", completed: false };
    (TaskModel.create as jest.Mock).mockResolvedValue(newTask);

    await taskRepository.addTask(newTask);

    expect(TaskModel.create).toHaveBeenCalledWith(newTask);
  });

  it("should find all tasks", async () => {
    const mockTasks: Task[] = [
      { _id: "1", title: "Task 1", completed: false },
      { _id: "2", title: "Task 2", completed: true },
    ];
    (TaskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    const tasks = await taskRepository.findAll();

    expect(tasks).toEqual(mockTasks);
  });

  it("should find a task by id", async () => {
    const taskId = "1";
    const mockTask: Task = {
      _id: taskId,
      title: "Sample Task",
      completed: false,
    };
    (TaskModel.findById as jest.Mock).mockResolvedValue(mockTask);

    const task = await taskRepository.findById(taskId);

    expect(task).toEqual(mockTask);
  });

  it("should update a task", async () => {
    const updatedTask: Task = {
      _id: "1",
      title: "Updated Task",
      completed: true,
    };
    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await taskRepository.updateTask(updatedTask);

    expect(TaskModel.findByIdAndUpdate).toHaveBeenCalledWith(updatedTask);
  });

  it("should complete a task", async () => {
    const taskId = "1";
    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await taskRepository.completeTask(taskId);

    expect(TaskModel.findByIdAndUpdate).toHaveBeenCalledWith(taskId, {
      completed: true,
    });
  });

  it("should delete a task", async () => {
    const taskId = "1";
    (TaskModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await taskRepository.deleteTask(taskId);

    expect(TaskModel.findByIdAndDelete).toHaveBeenCalledWith(taskId);
  });
});
