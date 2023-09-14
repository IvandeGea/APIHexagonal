import TaskRepository from "../../repositories/TaskRepositories";

export default class CompleteTask {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(_id: String) {
    await this.taskRepository.completeTask(_id);
  }
}
