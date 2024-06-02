import couponModel from "../../../DB/model/coupon.model.js";

export const createCopon = async (req, res) => {
  if (await couponModel.findOne({ name: req.body.name })) {
    return res.status(409).json({ message: "copon already exist" });
  }
  req.body.expireDate = new Date(req.body.expireDate);
  const coupon = await couponModel.create(req.body);
  return res.status(201).json({ message: "coupon created", coupon });
};
