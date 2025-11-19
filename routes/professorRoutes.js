import { Router } from "express";
import professorController from "../controllers/professorController.js";

const router = Router();

router.get("/", professorController.list);
router.get("/create", professorController.createForm);
router.post("/create", professorController.create);
router.get("/:id/edit", professorController.editForm);
router.put("/:id", professorController.edit); 
router.delete("/:id", professorController.delete);

export default router;
