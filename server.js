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

import expressSession from "express-session";
import cookieParser from "cookie-parser";

import sessionFileStore from "session-file-store";
// import MongoStore from "connect-mongo";


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


const FileStore = sessionFileStore(expressSession);
//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use(cookieParser(process.env.SECRET_KEY));
server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
   
  })
);
 
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