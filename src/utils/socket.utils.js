import { socketServer } from "../../server.js";
import productManager from "../02_fs/productManager.js";
import propsProductsUtils from "./propsProducts.utils.js";

const messages = [];
export default (socket) => {
  console.log(socket.id);

  socketServer.emit("products", productManager.read());
  socket.on("newProduct", async (data) => {
    try {
      propsProductsUtils(data);
      console.log(data);
      await productManager.create(data);
      socketServer.emit("products", productManager.read());
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("user", () => {
    socketServer.emit("all", messages);
  });
  socket.emit("messages", messages);
  socket.on("new chat", (data) => {
    messages.push(data);
    console.log(messages);
    socketServer.emit("all", messages);
  });
};
