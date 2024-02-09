import { socketServer } from "../../server.js";
// import products from "../02_fs/productManager.js";
import { products } from "../mongo/manager.mongo.js"
import propsProductsUtils from "./propsProducts.utils.js";

const messages = [];
export default (socket) => {
  console.log(socket.id);

  // socketServer.emit("products", products.read());


  socket.on("newProduct", async (data) => {
    try {
      propsProductsUtils(data);
      console.log(data);
      await products.create(data);
      // socketServer.emit("products",  products.read());
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
