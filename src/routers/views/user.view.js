import { Router } from "express";
// import users from "./../../02_fs/userManager.js";
import { users } from "../../mongo/manager.mongo.js"

const userRouter = Router();

userRouter.get("/auth/register", async (req, res, next) => {
  try {
   
   return res.render("register")
  } catch (error) {
    next(error);
  }
});

userRouter.get("/auth/login", async (req, res, next) => {
  try {
   
   return res.render("login")
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
