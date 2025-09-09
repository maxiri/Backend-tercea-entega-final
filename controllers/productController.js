
import Product from "../Models/Product.js";

// GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).lean();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const payload = {
      nombre: req.body.nombre,
      descripcionCorta: req.body.descripcionCorta,
      categoria: req.body.categoria,
      precio: Number(req.body.precio),

   
      descripcionLarga: req.body.descripcionLarga ?? "",
      subcategoria: req.body.subcategoria ?? "",
      stock: req.body.stock != null ? Number(req.body.stock) : 0,
      foto: req.body.foto ?? "",

      
      marca: req.body.marca ?? "",
      envioGratis: Boolean(req.body.envioGratis),
      edadDesde: req.body.edadDesde != null ? Number(req.body.edadDesde) : null,
      edadHasta: req.body.edadHasta != null ? Number(req.body.edadHasta) : null,
    };

    // Validación mínima adicional (por si no pasa el validator de la ruta)
    if (!payload.nombre || !payload.descripcionCorta || !payload.categoria || isNaN(payload.precio)) {
      return res.status(400).json({ message: "Faltan campos requeridos o precio inválido" });
    }

    const doc = await Product.create(payload);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.precio != null) updates.precio = Number(updates.precio);
    if (updates.stock != null) updates.stock = Number(updates.stock);
    if (updates.edadDesde != null) updates.edadDesde = Number(updates.edadDesde);
    if (updates.edadHasta != null) updates.edadHasta = Number(updates.edadHasta);

    const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    next(err);
  }
};
