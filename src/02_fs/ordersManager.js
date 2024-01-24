// const fs = require("fs");
import fs from "fs";
// const crypto = require("crypto");
import crypto from "crypto";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class OrdersManager {

  init() {
    try {
      const exists = fs.existsSync(this.ruta);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.ruta, data);
      } else {
        this.ordenes = JSON.parse(fs.readFileSync(this.ruta, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }


  constructor() {
    this.ruta = path.join(__dirname, "data", "orderManager.json");
    this.ordenes = [];
    this.init();
    
  }

  async create(data) {
    const orden = {
      // Asigna un ID autoincrementable
      oid: crypto.randomBytes(12).toString("hex"),
      pid: data.pid,
      uid: data.uid,
      quantity: data.quantity,
      state: data.state
    };

    this.ordenes.push(orden);
    const jsonData = JSON.stringify(this.ordenes, null, 2);
    await fs.promises.writeFile(this.ruta, jsonData);
    console.log("Orden creada con éxito");
    console.log(this.ordenes);
  }

  async read() {
    try {
      const resultado = await fs.promises.readFile(this.ruta, "utf-8");
      this.ordenes = JSON.parse(resultado);
      console.log(this.ordenes);
      return this.ordenes;
    } catch (error) {
      console.log("Error al leer el archivo");
    }
  }

  readByUser(uid) {
    try {
      const resultado = fs.readFileSync(this.ruta, "utf-8");
      this.ordenes = JSON.parse(resultado);
      const orden = this.ordenes.filter((each) => each.uid === String(uid));

      if (!orden) {
        throw new Error("Don't exist Order with User " + uid);
      } else console.log(orden);
      return orden;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }



  async update(oid, newData) {
    try {
      const resultado = await fs.promises.readFile(this.ruta, "utf-8");
      this.ordenes = JSON.parse(resultado);
  
      // Buscar el producto por ID
      const orderIndex = this.ordenes.findIndex((each) => each.oid === String(oid));
  
      if (orderIndex === -1) {
        throw new Error("No existe un Orden con el ID " + oid);
      }
  
      // Actualizar los campos del producto
      this.ordenes[orderIndex] = {
        ...this.ordenes[orderIndex],
        ...newData
      };
  
      // Escribir los cambios de vuelta al archivo
      const jsonData = JSON.stringify(this.ordenes, null, 2);
      await fs.promises.writeFile(this.ruta, jsonData);
  
      console.log("Orden actualizada con éxito");
      console.log(this.ordenes[orderIndex]);
  
      return this.ordenes[orderIndex];
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }

  async destroy(oid) {
    try {
      const resultado = fs.readFileSync(this.ruta, "utf-8");
      this.ordenes = JSON.parse(resultado);
      let one = this.ordenes.find((each) => each.oid === String(oid));
      if (!one) {
        throw new Error("There isn't any event with id n° " + oid);
      } else {
        this.ordenes = this.ordenes.filter(
          (each) => each.oid !== String(oid)
        );
        const jsonData = JSON.stringify(this.ordenes, null, 2);
        await fs.promises.writeFile(this.ruta, jsonData);
        return console.log("Order " + oid + " deleted successfully");
      }
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }


  






}

// Uso de la clase ProductManager

const ordersManager = new OrdersManager(
  "./server/02_fs/data/orderManager.json"
);
export default ordersManager;

// productManager.create(productos[0]);
// productManager.create(productos[1]);
// productManager.create(productos[2]);
// productManager.read();

// // productManager.destroy('0ebdc685849cd70de1427050');

// productManager.readOne("ec21eb78943d69f6515f6664");
// productManager.destroy("1543ffd836de7078c846ffbc");
