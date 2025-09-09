
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    items: { type: [cartItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    customer: {
      nombre: { type: String, default: "" },
      email: { type: String, default: "" },
    },
    status: { type: String, default: "CREATED", enum: ["CREATED", "PAID", "CANCELLED"] },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
