import express from "express";
import productManager from "./src/02_fs/productManager.js";
import userManager from "./src/02_fs/userManager.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";

import { engine } from "express-handlebars";

//socket io
import { createServer } from "http";
import { Server } from "socket.io";

const server = express();
const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);
// server.listen(PORT, ready);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
// Estas tres lineas van siempre al final
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

socketServer.on("connection", (socket) => {
  console.log(socket.id);
  // console.log(socket)
//   socket.emit("Welcome", "Welcome to my Cinema!");

socket.emit("movies", productManager.read()) 


  socket.on("newProduct", async (data) => {
    try {
        console.log(data);
        await productManager.create(data)
        socket.emit("movies", productManager.read())
    } catch (error) {
        console.log(error)
    }
  
  });
});

//endpoints

// server.post("/api/products", async (req, res) => {
//   try {
//     const data = req.body;
//     const response = await productManager.create(data);
//     return res.json({
//       statusCode: 201,
//       message: "created",
//       response,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       success: false,
//       message: "not found!",
//     });
//   }
// });

// server.get("/api/products", async (req, res) => {
// try {
//   const all = await productManager.read();
//   return res.json({
//     success: true,
//     response: all,
//   });
// } catch (error) {
//   return res.status(404).json({
//     success: false,
//     message: "not found!",
//   });
// }

// });

// const rutaconParams1 = "/api/products/:pid";
// const cbParams1 = (req, res) => {
//   try {
//     const { pid } = req.params;
//     const one = productManager.readOne(pid);
//     return res.json({
//       success: true,
//       response: one,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       success: false,
//       message: "not found!",
//     });
//   }
// };
// server.get(rutaconParams1, cbParams1);

// server.get("/api/users", async (req, res) => {
//   try {
//     const all = await userManager.read();
//     return res.json({
//       success: true,
//       response: all,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       success: false,
//       message: "not found!",
//     });
//   }
// });

// const rutaconParams2 = "/api/users/:uid";
// const cbParams2 = (req, res) => {
//   try {
//     const { uid } = req.params;
//     const one = userManager.readOne(uid);
//     return res.json({
//       success: true,
//       response: one,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       success: false,
//       message: "not found!",
//     });
//   }
// };
// server.get(rutaconParams2, cbParams2);
