// const fs = require("fs");
import fs from "fs";
// const crypto = require("crypto");
import crypto from "crypto";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {

  init() {
    try {
      const exists = fs.existsSync(this.ruta);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.ruta, data);
      } else {
        this.productos = JSON.parse(fs.readFileSync(this.ruta, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }


  constructor() {
    this.ruta = path.join(__dirname, "data", "productManager.json");
    this.productos = [];
    this.init();
    
  }

  async create(data) {
    const producto = {
      // Asigna un ID autoincrementable
      id: crypto.randomBytes(12).toString("hex"),
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock
    };

    this.productos.push(producto);
    const jsonData = JSON.stringify(this.productos, null, 2);
    await fs.promises.writeFile(this.ruta, jsonData);
    console.log("Producto creado con éxito");
  
  }





  read() {
    try {
      if (this.productos.length === 0) {
        const error = new Error("there aren't products!");
        error.statusCode = 404;
        throw error;
      } else {
        return this.productos;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const resultado = fs.readFileSync(this.ruta, "utf-8");
      this.productos = JSON.parse(resultado);
      const producto = this.productos.find((each) => each.id === String(id));

      if (!producto) {
        throw new Error("Don't exist product with ID " + id);
      } else console.log(producto);
      return producto;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const resultado = fs.readFileSync(this.ruta, "utf-8");
      this.productos = JSON.parse(resultado);
      let one = this.productos.find((each) => each.id === String(id));
      if (!one) {
        throw new Error("There isn't any event with id n° " + id);
      } else {
        this.productos = this.productos.filter(
          (each) => each.id !== String(id)
        );
        const jsonData = JSON.stringify(this.productos, null, 2);
        await fs.promises.writeFile(this.ruta, jsonData);
        return console.log("Product " + id + " deleted successfully");
      }
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }

  async update(id, newData) {
    try {
      const resultado = await fs.promises.readFile(this.ruta, "utf-8");
      this.productos = JSON.parse(resultado);
  
      // Buscar el producto por ID
      const productoIndex = this.productos.findIndex((each) => each.id === String(id));
  
      if (productoIndex === -1) {
        throw new Error("No existe un producto con el ID " + id);
      }
  
      // Actualizar los campos del producto
      this.productos[productoIndex] = {
        ...this.productos[productoIndex],
        ...newData
      };
  
      // Escribir los cambios de vuelta al archivo
      const jsonData = JSON.stringify(this.productos, null, 2);
      await fs.promises.writeFile(this.ruta, jsonData);
  
      console.log("Producto actualizado con éxito");
      console.log(this.productos[productoIndex]);
  
      return this.productos[productoIndex];
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }
  






}

// Uso de la clase ProductManager

const productManager = new ProductManager(
  "./server/02_fs/data/productManager.json"
);
export default productManager;

// productManager.create(productos[0]);
// productManager.create(productos[1]);
// productManager.create(productos[2]);
// productManager.read();

// // productManager.destroy('0ebdc685849cd70de1427050');

// productManager.readOne("ec21eb78943d69f6515f6664");
// productManager.destroy("1543ffd836de7078c846ffbc");
