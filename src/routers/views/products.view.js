import { Router } from "express";
// import products from "../../02_fs/productManager.js";

import { products } from "../../mongo/manager.mongo.js"

const productsRouter = Router();

// //aca se generan las rutas

productsRouter.get("/real", async (req, res, next) => {
 

  try {
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }

    const options = {
      lean: true,
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { title: 1 },
    };

    const all = await products.read({ filter, options });

    const token = req.cookies.token;
    return res.render("products", { 
      Productos: all.docs,
    token: token, });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/products/form", (req, res, next) => {
  try {
    const token = req.cookies.token;
    return res.render("real",{
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
