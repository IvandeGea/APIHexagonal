import TaskModel from "../../core/repositories/TaskModel";
import TaskRepository from "../../core/repositories/TaskRepositories";
import Task from "../../core/domain/entities/Task";

export default class TaskRepositoryImp implements TaskRepository {
  async addTask(newTask: Task): Promise<void> {
    await TaskModel.create(newTask);
  }

  async findAll(): Promise<Task[]> {
    return await TaskModel.find();
  }
  async findById(_id: String): Promise<Task | null> {
    return await TaskModel.findById(_id);
  }

  async updateTask(task: Task): Promise<void> {
    await TaskModel.findByIdAndUpdate(task);
  }
  async completeTask(_id: String): Promise<void> {
    await TaskModel.findByIdAndUpdate(_id, { completed: true });
  }

  async deleteTask(_id: String): Promise<void> {
    await TaskModel.findByIdAndDelete(_id);
  }
}
