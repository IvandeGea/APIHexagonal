import TaskModel from "../../core/repositories/TaskModel";
import { Request, Response } from "express";
import AddTask from "../../core/domain/use-cases/AddTask";
import DeleteTask from "../../core/domain/use-cases/DeleteTask";
import CompleteTask from "../../core/domain/use-cases/CompleteTask";
import TaskRepositoryImp from "../../infraestructure/repositories/TaskRepositoryImp";

const taskRepository = new TaskRepositoryImp();

export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = new TaskModel();
    var params = req.body;

    task.title = params.title;

    const addTaskUseCase = new AddTask(taskRepository);
    const newTask = await addTaskUseCase.execute(params.title);

    res.status(200).send({
      success: true,
      data: newTask,
    });
  } catch (error) {
    if (params.title.trim() === "") {
      res.status(404).send({
        success: false,
        error: "Please enter a title.",
      });
    }
    res.status(500).send({
      success: false,
      error: "Error creating a task",
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleteTaskUseCase = new DeleteTask(taskRepository);
    await deleteTaskUseCase.execute(req.params.id);

    res.status(200).send({
      success: true,
      data: "Task deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "Error deleting a task",
    });
  }
};

export const completeTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const completeTaskUseCase = new CompleteTask(taskRepository);
    await completeTaskUseCase.execute(req.params.id);

    res.status(200).send({
      success: true,
      data: "Task completed",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "Error completing a task",
    });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const allTasks = await taskRepository.findAll();

    res.status(200).send({
      success: true,
      data: allTasks,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "Error showing all tasks",
    });
  }
};

export const findById = async (req: Request, res: Response) => {
  try {
    const taskId = req.params._id;
    var taskFinded = null;
    taskFinded = await taskRepository.findById(taskId);

    res.status(200).send({
      success: true,
      data: taskFinded,
    });
  } catch (error) {
    if (taskFinded === null) {
      res.status(404).send({
        success: false,
        error: "Task doesn't exist",
      });
    } else {
      res.status(500).send({
        success: false,
        error: "Error completing the task",
      });
    }
  }
};
