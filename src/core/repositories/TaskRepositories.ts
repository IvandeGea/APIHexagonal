import Task from "../domain/entities/Task";

export default interface TaskRepository {
  addTask(newTask: Task): Promise<void>;
  completeTask(_id: String): Promise<void>;
  deleteTask(_id: String): Promise<void>;
  findAll(): Promise<Task[]>;
  findById(_id: String): Promise<Task | null>;
}
