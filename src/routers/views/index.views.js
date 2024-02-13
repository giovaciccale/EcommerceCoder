import { Router } from "express";
import productsRouter from "./products.view.js";
import userRouter from "./user.view.js";
// import productManager from "../../02_fs/productManager.js";
import { products } from "../../mongo/manager.mongo.js"

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { title: 1 },
    };
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }

    const all = await products.read({ filter, options });
    return res.render("index", { Productos: all });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/", productsRouter);
viewsRouter.use("/", userRouter);

export default viewsRouter;
