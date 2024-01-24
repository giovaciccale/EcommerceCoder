import { Router } from "express";
import apiRouter from "./api/index.router.js";
import Viewsrouter from "./views/index.views.js";



const router = Router()

// implementar el router de API 
router.use("/api",apiRouter)
// implementar el router de vistas
router.use("/",Viewsrouter)



export default router