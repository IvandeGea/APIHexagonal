import { Request, Response } from "express";

import AddTask from "../core/domain/use-cases/AddTask";
import DeleteTask from "../core/domain/use-cases/DeleteTask";
import CompleteTask from "../core/domain/use-cases/CompleteTask";

import {
  addTask,
  deleteTask,
  completeTask,
} from "../application/controllers/taskController";

jest.mock("../core/domain/use-cases/AddTask");
jest.mock("../core/domain/use-cases/DeleteTask");
jest.mock("../core/domain/use-cases/CompleteTask");

const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
} as unknown as Response;

describe("TaskController addTask", () => {
  test("should add a task", async () => {
    const executeMock = jest
      .fn()
      .mockResolvedValue({ id: 1, title: "Test Task" });

    (AddTask as jest.Mock).mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });
    const mockTitle = "Test Task";
    mockRequest.body = { title: mockTitle };

    await addTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      success: true,
      data: { id: 1, title: "Test Task" },
    });
  });

  test("should return an error if title is empty", async () => {
    const executeMock = jest
      .fn()
      .mockRejectedValue(new Error("Error creating a task"));

    (AddTask as jest.Mock).mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });
    const mockTitle = "";
    mockRequest.body = { title: mockTitle };

    await addTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith({
      success: false,
      error: "Please enter a title.",
    });
  });
});

describe("TaskController deleteTask", () => {
  test("should delete a task", async () => {
    const executeMock = jest.fn().mockResolvedValue(undefined);

    (DeleteTask as jest.Mock).mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    mockRequest.params = { id: "1" };

    await deleteTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      success: true,
      data: "Task deleted",
    });
  });

  test("should return an error if task not found", async () => {
    const executeMock = jest
      .fn()
      .mockRejectedValue(new Error("Error deleting a task"));

    (DeleteTask as jest.Mock).mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    mockRequest.params = { id: "1" };

    await deleteTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith({
      success: false,
      error: "Error deleting a task",
    });
  });
});

describe("TaskController completeTask", () => {
  test("should complete a task", async () => {
    const executeMock = jest.fn().mockResolvedValue(undefined);

    (CompleteTask as jest.Mock).mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    mockRequest.params = { id: "1" };

    await completeTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      success: true,
      data: "Task completed",
    });
  });

  test("should return an error if task not found", async () => {
    const executeMock = jest
      .fn()
      .mockRejectedValue(new Error("Error completing a task"));

    (CompleteTask as jest.Mock).mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    mockRequest.params = { id: "1" };

    await completeTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith({
      success: false,
      error: "Error completing a task",
    });
  });

  test("should return an error if task not found", async () => {
    const executeMock = jest
      .fn()
      .mockRejectedValue(new Error("Error completing a task"));

    (CompleteTask as jest.Mock).mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    mockRequest.params = { id: "1" };

    await completeTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith({
      success: false,
      error: "Error completing a task",
    });
  });
});
