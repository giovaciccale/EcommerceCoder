import "dotenv/config.js"



import express from "express";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import socketUtils from "./src/utils/socket.utils.js";
import dbConnection from "./src/utils/db.js"

import { engine } from "express-handlebars";

//socket io
import { createServer } from "http";
import { Server } from "socket.io";

const server = express();
const PORT = 8080;
const ready = () => {
    console.log("server ready on port " + PORT);
    // Levanto la BBDD
    dbConnection();


}




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

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");



//Sockect
socketServer.on("connection", socketUtils);



export {socketServer} 