import Task from "../core/domain/entities/Task";
import * as jest from "jest";

describe("Task", () => {
  test("should create a new task", () => {
    const task = new Task("title");
    expect(task.title).toBe("title");
    expect(task.completed).toBe(false);
  });

  test("should complete a task", () => {
    const task = new Task("title");

    task.completed = true;

    expect(task.completed).toBe(true);
  });
});
