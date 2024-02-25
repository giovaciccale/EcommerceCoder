import { Router } from "express";
import ProductsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./session.router.js";

const apiRouter = Router();

// enrutadores de los recursos
apiRouter.use("/products",ProductsRouter)
apiRouter.use("/users",usersRouter)
apiRouter.use("/orders",ordersRouter)
apiRouter.use("/sessions",sessionsRouter)


export default apiRouter;
