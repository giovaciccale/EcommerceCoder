import { Router } from "express";
// import products from "../../02_fs/productManager.js";
import propsProducts from "../../middlewares/propsProducts.mid.js"


import { products } from "../../mongo/manager.mongo.js"


const ProductsRouter = Router();

// Definir los endpoints (POST GET PUT DELETE)

ProductsRouter.post("/", propsProducts, async (req, res,next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
    return res.json({
      statusCode: 201,
      message: "created",
      response,
    });
  } catch (error) {
   return next(error)
  }
});

ProductsRouter.get("/", async (req, res,next) => {
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
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});


ProductsRouter.get("/:pid", async (req, res,next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.json({
      success: true,
      response: one,
    });
  } catch (error) {
    return next(error)
  }
});


ProductsRouter.put("/:pid", propsProducts, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const updatedProduct = await products.update(pid, newData);
    return res.json({
      success: true,
      message: "Product updated successfully",
      response: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
});




ProductsRouter.delete("/:pid", async (req, res,next) => {

  try {
    const { pid } = req.params;
    const updatedOrder = await products.destroy(pid);
    return res.json({
      success: true,
      message: "Products delete successfully",
      response: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }


});

export default ProductsRouter;
