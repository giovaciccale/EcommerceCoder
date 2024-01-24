import { Router } from "express";
import productManager from "../../02_fs/productManager.js";

const productsRouter = Router();

// //aca se generan las rutas

productsRouter.get("/real",  (req, res, next) => {
  try {
    const all =  productManager.read();
    return res.render("products", { Productos: all });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/form", (req, res, next) => {
  try {
    return res.render("real");
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
