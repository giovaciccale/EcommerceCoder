import { Router } from "express";
import orderManager from "../../02_fs/ordersManager.js";
import propsOrders from "../../middlewares/propsOrders.mid.js";

const ordersRouter = Router();

// Definir los endpoints (POST GET PUT DELETE)

ordersRouter.post("/", propsOrders, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await orderManager.create(data);
    return res.json({
      statusCode: 201,
      message: "created",
      response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const all = await orderManager.read();
    return res.json({
      statusCode: 201,
      message: "created",
      all,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:uid", (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = orderManager.readByUser(uid);
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
    const updatedOrder = await orderManager.update(oid, newData);
    return res.json({
      success: true,
      message: "Order updated successfully",
      response: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res) => {
  try {
    const { oid } = req.params;
    const updatedOrder = await orderManager.destroy(oid);
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
