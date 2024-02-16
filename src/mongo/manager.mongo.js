import Product from "./models/product.model.js";
import User from "./models/user.model.js";
import notFoundOne from "../utils/notFoundOne.util.js";
import Order from "./models/order.model.js";
import {Types} from "mongoose"



class MongoManager {
  constructor(model) {
    this.model = model; // Asumiendo que `Product` es tu modelo de Mongoose
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }

  async read({ filter, options }) {
    try {
      options = { ...options, lean: true };
      const all = await this.model.paginate(filter, options);
      if (all.totalDocs === 0) {
        const error = new Error("There aren't any document");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async stats(obj) {
    try {
      let { filter } = obj;
      let stats = await this.model.find(filter).explain("executionStats");
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }
//carrito
async report(uid) {
  try {
    const report = await this.model.aggregate([
      //$match productos de un usuario en el carrito (las órdenes de un usuario)
      { $match: { user_id: new Types.ObjectId(uid) } },
      //$lookup para popular los eventos
      {
        $lookup: {
          from: "products",
          foreignField: "_id",        // Campo en la colección "products"
          localField: "product_id",   // Campo en la colección de órdenes de usuario
          as: "product_id",
        },
      },
      //$replaceRoot para mergear el objeto con el objeto cero del array populado
      // {
      //   $replaceRoot: {
      //     newRoot: {
      //       $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
      //     },
      //   },
      // },
      //$set para agregar la propiedad subtotal = price*quantity
      // { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
      //$group para agrupar por user_id y sumar los subtotales
      // { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
      //$project para limpiar el objeto (dejar sólo user_id, total y date)
      // {
      //   $project: {
      //     _id: false,
      //     user_id: "$_id",
      //     total: "$total",
      //     date: new Date(),
      //     currency: "USD",
      //   },
      // },
      //{ $merge: { into: "bills" }}
    ]);
    return report;
  } catch (error) {
    throw error;
  }
}
}

const products = new MongoManager(Product);
const users = new MongoManager(User);
const orders = new MongoManager(Order);

export { products, users, orders };
