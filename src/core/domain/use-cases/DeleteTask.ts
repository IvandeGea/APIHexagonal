import TaskRepository from "../../repositories/TaskRepositories";

export default class DeleteTask {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(_id: String) {
    await this.taskRepository.deleteTask(_id);
  }
}
