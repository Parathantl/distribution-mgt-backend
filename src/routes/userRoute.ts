import { Router } from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController";
import { auth } from "../utils/auth";

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/', auth, getUsers);

export default router;