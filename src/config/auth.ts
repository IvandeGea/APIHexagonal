import { Request, Response, NextFunction } from "express";

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).send("Unauthorized");
  }

  const encodedCredentials = authHeader.split(" ")[1];
  const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = decodedCredentials.split(":");

  if (username !== "Ivan" || password !== "1234") {
    return res.status(401).send("Unauthorized");
  }

  next();
};
