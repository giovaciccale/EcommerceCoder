import { Router } from "express";
import productsRouter from "./products.view.js";
import userRouter from "./user.view.js";
import productManager from "../../02_fs/productManager.js";


const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
   
    const date = new Date();
    const all =  productManager.read();
    return res.render("index", { Productos: all });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/", productsRouter);
viewsRouter.use("/", userRouter);

export default viewsRouter;
