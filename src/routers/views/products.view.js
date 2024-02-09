import { Router } from "express";
// import products from "../../02_fs/productManager.js";

import { products } from "../../mongo/manager.mongo.js"

const productsRouter = Router();

// //aca se generan las rutas

productsRouter.get("/real", async (req, res, next) => {
 

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
