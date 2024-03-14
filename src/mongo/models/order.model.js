import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let collection = "orders";

const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref:"users"},
    product_id: { type: Types.ObjectId, required: true, ref:"products"},
    quantity: {type: Number, default: 1},
    price: {type: Number, required: true},
    state: {type: String, enum:["reserved","paid","delivered"], default:"reserved"},
    data: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

schema.pre("find", function (){ this.populate("user_id", "-createdAt -updatedAt -__v")})

schema.pre("find", function (){ this.populate("product_id", "-createdAt -updatedAt -__v ")})

schema.plugin(mongoosePaginate);
const Order = model(collection, schema);
export default Order;
