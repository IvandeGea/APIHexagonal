import { createServer } from "../infraestructure/database/index";
import app from "../config/app";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server | undefined;

describe("infrastructure/database/connection/index", () => {
  beforeAll(async () => {
    server = await createServer();
  });

  afterAll(async () => {
    await server?.close();

    jest.restoreAllMocks();

    await mongoose.disconnect();
  });

  test("connects to MongoDB and Server when creating server", async () => {
    const mongooseConnectSpy = jest.spyOn(mongoose, "connect");
    const appListenSpy = jest.spyOn(app, "listen");

    const server = await createServer();

    expect(mongooseConnectSpy).toHaveBeenCalled();
    expect(appListenSpy).toHaveBeenCalled();

    await server?.close();
  });

  test("show message if error with database connection", async () => {
    const mockConnect = jest
      .spyOn(mongoose, "connect")
      .mockRejectedValue(new Error("Error connecting to MongoDB"));

    await createServer();

    expect(mockConnect).toHaveBeenCalled();
  });

  test("show mesage if error with server connection", async () => {
    const mockListen = jest.spyOn(app, "listen").mockImplementation(() => {
      throw new Error("Error starting the server");
    });

    await createServer();

    expect(mockListen).toHaveBeenCalled();
  });
});
