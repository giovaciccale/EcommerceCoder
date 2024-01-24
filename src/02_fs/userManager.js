// const fs = require("fs");
import fs from "fs";
// const crypto = require("crypto");
import crypto from "crypto";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserManager {
  constructor() {
    this.ruta = path.join(__dirname, "data", "userManager.json");
    this.usuarios = [];
  }

  async create(data) {
    const usuario = {
      // Asigna un ID autoincrementable
      id: crypto.randomBytes(12).toString("hex"),
      name: data.name,
      photo: data.photo,
      email: data.email,
    };
    this.usuarios.push(usuario);
    const jsonData = JSON.stringify(this.usuarios, null, 2);
    await fs.promises.writeFile(this.ruta, jsonData);
    console.log("User creado con éxito");
  }

  async read() {
    try {
      const resultado = await fs.promises.readFile(this.ruta, "utf-8");
      this.usuarios = JSON.parse(resultado);
      console.log(this.usuarios);
      return this.usuarios;
    } catch (error) {
      console.log("Error al leer el archivo");
    }
  }

  readOne(id) {
    try {
      const resultado = fs.readFileSync(this.ruta, "utf-8");
      this.usuarios = JSON.parse(resultado);
      const usuario = this.usuarios.find((each) => each.id === String(id));

      if (!usuario) {
        throw new Error("Don't exist user with ID " + id);
      } else;
      return usuario;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const resultado = fs.readFileSync(this.ruta, "utf-8");
      this.usuarios = JSON.parse(resultado);
      let one = this.usuarios.find((each) => each.id === String(id));
      if (!one) {
        throw new Error("There isn't any event with id n° " + id);
      } else {
        this.usuarios = this.usuarios.filter((each) => each.id !== String(id));
        const jsonData = JSON.stringify(this.usuarios, null, 2);
        await fs.promises.writeFile(this.ruta, jsonData);
        return console.log("User " + id + " deleted successfully");
      }
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }

  async update(id, newData) {
    try {
      const resultado = await fs.promises.readFile(this.ruta, "utf-8");
      this.usuarios = JSON.parse(resultado);

      // Buscar el producto por ID
      const userIndex = this.usuarios.findIndex(
        (each) => each.id === String(id)
      );

      if (userIndex === -1) {
        throw new Error("No existe un user con el ID " + id);
      }

      // Actualizar los campos del producto
      this.usuarios[userIndex] = {
        ...this.usuarios[userIndex],
        ...newData,
      };

      // Escribir los cambios de vuelta al archivo
      const jsonData = JSON.stringify(this.usuarios, null, 2);
      await fs.promises.writeFile(this.ruta, jsonData);

      console.log("User actualizado con éxito");
      console.log(this.usuarios[userIndex]);

      return this.usuarios[userIndex];
    } catch (error) {
      console.log("Error:", error.message);
      return error.message;
    }
  }
  
}

const userManager = new UserManager("./server/02_fs/data/productManager.json");
export default userManager;

// userManager.create(usuarios[0]);
// userManager.create(usuarios[1]);
// userManager.create(usuarios[2]);
// userManager.read();
// userManager.readOne(3);

// userManager.destroy("f2558a9aaf1a66d6c9bf9364");
