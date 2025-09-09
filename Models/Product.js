
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // requeridos por tu frontend / validación
    nombre: { type: String, required: true },
    descripcionCorta: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },

    // opcionales (pero soportados por el UI)
    descripcionLarga: { type: String },
    subcategoria: { type: String },
    stock: { type: Number, default: 0 },
    foto: { type: String },

    // extras de tu form
    marca: { type: String, default: "" },
    envioGratis: { type: Boolean, default: false },
    edadDesde: { type: Number, default: null },
    edadHasta: { type: Number, default: null },
  },
  { timestamps: true }
);


const Product = mongoose.model("Product", productSchema, "juguetes");
export default Product;
