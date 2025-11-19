import { Router } from "express";
import alunosController from "../controllers/alunosController.js";

const router = Router();

router.get("/", alunosController.list);
router.get("/create", alunosController.createForm);
router.post("/create", alunosController.create);
router.get("/:id/edit", alunosController.editForm);
router.put("/:id", alunosController.edit); 
router.delete("/:id", alunosController.delete);

export default router;
