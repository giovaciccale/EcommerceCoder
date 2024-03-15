import { Router } from "express";
import ProductsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./session.router.js";

import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const apiRouter = Router();





// enrutadores de los recursos
apiRouter.use("/products",ProductsRouter)
apiRouter.use("/users",usersRouter)
apiRouter.use("/orders"/*,passCallBackMid("jwt")*/,ordersRouter)
apiRouter.use("/sessions",sessionsRouter)


export default apiRouter;
