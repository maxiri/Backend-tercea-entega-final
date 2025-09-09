
import Cart from "../Models/Cart.js";

// POST /api/cart
export const saveCart = async (req, res, next) => {
  try {
    const { items = [], customer = {} } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío o el formato es inválido" });
    }

    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      return res.status(400).json({ message: "El email del cliente no es válido" });
    }

    const computed = items.map((i) => ({
      ...i,
      subtotal: Number(i.precio) * Number(i.quantity),
    }));

    const total = computed.reduce((acc, it) => acc + it.subtotal, 0);

    console.log("🛒 Carrito recibido:", { items: computed, total, customer });

    const cart = await Cart.create({ items: computed, total, customer, status: "CREATED" });
    res.status(201).json({ message: "Carrito guardado", cartId: cart._id, total });
  } catch (err) {
    next(err);
  }
};

// GET /api/cart/:id
export const getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id).lean();
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

// PUT /api/cart/:id/pay
export const payCart = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
    if (cart.status === "PAID") return res.status(400).json({ message: "El carrito ya fue pagado" });
    cart.status = "PAID";
    await cart.save();
    res.json({ message: "Carrito pagado correctamente", cartId: cart._id });
  } catch (err) {
    next(err);
  }
};

// PUT /api/cart/:id/cancel
export const cancelCart = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
    if (cart.status === "CANCELLED") return res.status(400).json({ message: "El carrito ya está cancelado" });
    cart.status = "CANCELLED";
    await cart.save();
    res.json({ message: "Carrito cancelado correctamente", cartId: cart._id });
  } catch (err) {
    next(err);
  }
};
