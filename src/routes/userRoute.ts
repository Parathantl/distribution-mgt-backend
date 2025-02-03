import { Router } from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController";
import { auth, checkAuth } from "../utils/auth";

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/check-auth', checkAuth);
router.get('/', auth, getUsers);

export default router;