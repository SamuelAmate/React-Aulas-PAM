import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
    res.render("equipe/show", {
        title: "Equipe"
    });
});

export default router;