import { Router } from "express";
// import orders from "../../02_fs/ordersManager.js";

import { orders } from "../../mongo/manager.mongo.js"


const ordersRouter = Router();

// Definir los endpoints (POST GET PUT DELETE)

ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await orders.create(data);
    return res.json({
      statusCode: 201,
      message: "created",
      response,
    });
  } catch (error) {
    return next(error);
  }
});


ordersRouter.get("/total/:uid", async (req, res, next) => {
  try {
    const {uid} = req.params
    const report = await orders.report(uid)
    return res.json({
      statusCode: 200,
      response: report
    })
  } catch (error) {
    return next(error);
  }


})

ordersRouter.get("/", async (req, res, next) => {
  try {

    const filter = {};
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }
    
    const all = await orders.read({ filter });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await orders.readOne(uid);
    return res.json({
      success: true,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const newData = req.body;
    const updatedOrder = await orders.update(oid, newData);
    return res.json({
      statusCode: 201,
      message: "Order updated successfully",
      response: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const updatedOrder = await orders.destroy(oid);
    return res.json({
      success: true,
      message: "Order delete successfully",
      response: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;
