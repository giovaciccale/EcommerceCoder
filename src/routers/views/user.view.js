import { Router } from "express";
// import users from "./../../02_fs/userManager.js";
import { users } from "../../mongo/manager.mongo.js"

const userRouter = Router();

userRouter.get("/register", async (req, res, next) => {
  try {
   
   return res.render("register")
  } catch (error) {
    next(error);
  }
});

userRouter.get("/chat", async (req, res, next) => {
  try {
   return res.render("chat",{})
  } catch (error) {
    next(error);
  }
});



export default userRouter;
