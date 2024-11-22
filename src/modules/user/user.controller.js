import userModel from "../../../DB/model/user.model.js";

export const getUsers = async (req, res) => {
  const users = await userModel
    .find({})
    .select("-password -sendCode -confirmEmail");
  return res.json({ message: "success", users });
};

export const getUserData = async (req, res) => {
  const user = await userModel.findById(req.user._id);
  return res.json({ message: "success", user });
};
export const createAdmin = async (req, res) => {
  const { userId } = req.params;
  const user = await userModel.findById(userId);
  if (!user) {
    return res.json({ message: "user not found" });
  }
  user.role = "Admin";
  await user.save();
  return res.json({ message: "success" });
};
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const user = await userModel.findByIdAndDelete(userId);
  if (!user) {
    return res.json({ message: "user not found" });
  }
  return res.json({ message: "success" });
}
export const updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    const { userName, email, address, phone } = req.body;
   
  
    if (
      await userModel.findOne({
        email: req.body.email,
        _id: { $ne: userId },
      })
    ) {
      return next(new AppError(`email ${req.body.email} already exists`, 409));
    }
    const User = await userModel.updateOne(
      { _id: userId },
      { $set: { userName, email, address, phone } }
    );
    return res.json({ message: "success" });
  };