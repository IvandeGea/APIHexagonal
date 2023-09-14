import TaskModel from "../core/repositories/TaskModel";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("core/repositories/TaskModel", () => {
  test("should create a new task", async () => {
    const newTask = {
      title: "Test Task",
      completed: false,
    };

    const task = await TaskModel.create(newTask);

    expect(task).toMatchObject(newTask);
  });
});
