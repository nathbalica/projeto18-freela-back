import { Router } from "express"
import authRouter from "./auth.routes.js"
import usersRouter from "./users.routes.js"
import kittensRouter from "./kittens.routes.js"
import cartRouter from "./cart.routes.js"
import orderRouter from "./order.routes.js"

const router = Router()

router.use(authRouter)
router.use(usersRouter)
router.use(kittensRouter)
router.use(cartRouter)
router.use(orderRouter)

export default router