import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let collection = "users";

const schema = new Schema(
  {
    role: { type: String, default: "admin" },
    name: { type: String, required: true },
    photo: {
      type: String,
      default: "https://www.klipartz.com/es/sticker-png-fpoay",
    },
    email: { type: String, index: true },
    data: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
const User = model(collection, schema);
export default User;
