import express from "express";

// Controllers
import { createNoteController, getAllNoteController ,getAllNoteByIdController, updateNoteByIdController, deleteNoteByIdController} from "../controllers/index.js";

const router = express.Router();

router.post("/createNote", createNoteController);
router.get("/getAllNote", getAllNoteController);
router.get("/getAllNoteById/:id", getAllNoteByIdController);
router.patch("/updateNoteById/:id", updateNoteByIdController);
router.post("/deleteNoteById", deleteNoteByIdController);


router.get("/", (req, res) => {
    res.status(200).json({
        "message": "Welcome",
    });
});

export default router;