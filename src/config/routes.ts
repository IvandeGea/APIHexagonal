import express from "express";
import {
  addTask,
  deleteTask,
  completeTask,
  findAll,
  findById,
} from "../application/controllers/taskController";


const router = express.Router();

router.post("/new", addTask);
router.delete("/delete/:_id", deleteTask);
router.put("/complete/:_id", completeTask);
router.get("/", findAll);
router.get("/:_id", findById);

export default router;
