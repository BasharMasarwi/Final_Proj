import cartModel from "../../../DB/model/cart.model.js";

export const createCart = async (req, res) => {
  const { productId } = req.body;
  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart) {
    const newCart = await cartModel.create({
      userId: req.user._id,
      products: { productId },
    });
    return res.json({ message: "success", carts: newCart });
  }
  for (let i = 0; i < cart.products.length; i++) {
    if (cart.products[i].productId == productId) {
      return res.json({ message: "products already exists" });
    }
  }
  cart.products.push({ productId: productId });
  await cart.save();
  return res.json({ message: "success", cart });
};
export const removeItem = async (req, res) => {
  const { productId } = req.params;
  const cart = await cartModel.findOneAndUpdate(
    { userId: req.user._id },
    {
      $pull: {
        products: {
          productId: productId,
        },
      },
    },
    { new: true }
  );
  return res.json({ message: "success", cart });
};
export const clearCart = async (req, res) => {
  const cart = await cartModel.findOneAndUpdate(
    { userId: req.user._id },
    {
      products: [],
    },
    { new: true }
  );
  return res.json({ message: "success", cart });
};

export const updateQuantity = async (req, res) => {
  const { quantity, operator } = req.body;
  const inc = operator == "+" ? quantity : -quantity;

  const cart = await cartModel.findOneAndUpdate(
    {
      userId: req.user._id,
      "products.productId": req.params.productId,
    },
    {
      $inc: {
        "products.$.quantity": inc,
      },
    },
    { new: true }
  );
  return res.json({ message: "success", cart });
};
