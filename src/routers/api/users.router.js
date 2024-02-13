import { Router } from "express";
// import userManager from "../../02_fs/userManager.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";
import isAdmindMid from "../../middlewares/isAdmind.mid.js";

import { users } from "../../mongo/manager.mongo.js";

const usersRouter = Router();

// Definir los endpoints (POST GET PUT DELETE)

usersRouter.post("/", isAdmindMid, propsUsers, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
    return res.json({
      statusCode: 201,
      message: "created",
      response,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/", async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { email: 1 },
    };
    const filter = {};
    if (req.query.email) {
      filter.email = new RegExp(req.query.email.trim(), "i");
    }
    if (req.query.sort === "desc") {
      options.sort.email = "desc";
    }
    const all = await users.read({ filter, options });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});


usersRouter.get("/:uemail", async (req, res, next) => {
  try {
    const { uemail } = req.params;
    const one = await users.readByEmail(uemail);
    return res.json({
      success: true,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", propsUsers, async (req, res, next) => {
  try {
    const { uid } = req.params;
    const newData = req.body;
    const updateUser = await users.update(uid, newData);
    return res.json({
      success: true,
      message: "User updated successfully",
      response: updateUser,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const updatedOrder = await users.destroy(uid);
    return res.json({
      success: true,
      message: "User delete successfully",
      response: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
