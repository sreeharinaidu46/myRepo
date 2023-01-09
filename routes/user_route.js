import { signup, login, getAllUsers, getCurrentUser } from '../controllers/userController.js'
import express from 'express'
const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.get("/getCurrentUser/:id", getCurrentUser)
    // router.patch("/update/:id", updateProfile);

export default router;