import { Router } from "express";
import productsRouter from "./products.view.js";
import userRouter from "./user.view.js";
import ordersRouter from "./orders.view.js";
// import productManager from "../../02_fs/productManager.js";
import { products } from "../../mongo/manager.mongo.js";


const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  
  
  try {
    let filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    const options = {
      lean: true,
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { title: 1 },
    };

    if (req.query.sort === "desc") {
      options.sort.title = "desc";
    }
    const all = await products.read({ filter, options });

        // Obtén el token de la cookie
    const token = req.cookies.token;

 
    return res.render("index", {
      products: all.docs,
      next: all.nextPage,
      prev: all.prevPage,
      title: "INDEX",
      filter: req.query.title,
      token: token, // Pasa el token al contexto
 
      
    });
    
    
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/", productsRouter);
viewsRouter.use("/", userRouter);
viewsRouter.use("/", ordersRouter);

export default viewsRouter;
