import { Router } from "express";

import { orders, users } from "../../mongo/manager.mongo.js";

import passCallBack from "../../middlewares/passCallBack.mid.js";

const ordersRouter = Router();

ordersRouter.get("/orders", passCallBack("jwt"), async (req, res, next) => {
  try {
   

    const options = {
      lean: true,
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { title: 1 },
    };
    // console.log(req.user.email);
    const user = await users.readByEmail(req.user.email);  
    const filter = {
      user_id: user._id,
    };
    const all = await orders.read({ filter, options });
    // console.log(all.docs[0].product_id);
    const token = req.cookies.token;
    return res.render("orders", { 
      orders: all.docs,
    token: token, });
  } catch (error) {
    next(error);
  }
});


export default ordersRouter;