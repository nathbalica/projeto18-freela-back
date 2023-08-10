import { Router } from "express"
import { validateAuth } from "../middlewares/users.middlewares.js"
import { getUserData } from "../controllers/users.controller.js"

const usersRouter = Router()

usersRouter.get("/users/me", validateAuth, getUserData)

export default usersRouter