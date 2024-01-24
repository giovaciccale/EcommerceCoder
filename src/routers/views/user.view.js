import { Router } from "express";
import userManager from "./../../02_fs/userManager.js";

const userRouter = Router();

userRouter.get("/register", async (req, res, next) => {
  try {
   const one = userManager.readOne("2334e8624873128c6d41e843")
   return res.render("register",{one})
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
