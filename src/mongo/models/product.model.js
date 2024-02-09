import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let collection = "products";

const schema = new Schema({
 

  title : { type: String, required: true, unique: true, index:true },
  photo: { type: String, default: "https://www.klipartz.com/es/sticker-png-fpoay" },
  price: { type: Number, default: 0, index: true },
  stock :  { type: Number, default: 0 },
  data: {type: Date, default: new Date()}
},{timestamps: true})

schema.plugin(mongoosePaginate);
const Product = model(collection, schema);
export default Product;
