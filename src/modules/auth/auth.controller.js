import userModel from "../../../DB/model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utls/sendEmail.js";
import { customAlphabet , nanoid} from "nanoid";
export const register = async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "user already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    const createUser = await userModel.create({ userName, email, password: hashedPassword });

    const token =  jwt.sign({email},process.env.CONFIRMEMAILSECRET);

    await sendEmail(email, 'Welcome', userName, token);

    return res.status(201).json({ message: "success", user: createUser });
};
export const confirmEmail = async (req, res) => {
  const token = req.params.token;
  const decoded = jwt.verify(token,process.env.CONFIRMEMAILSECRET);
  await userModel.findOneAndUpdate({ email: decoded.email},{confirmEmail:true});
  return res.status(200).json({ message: "success"});
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (user.status == "NotActive") {
    return res.status(401).json({ message: "Your account is blocked" });
  }
  if (!isPasswordValid) {
    return res.status(401).json({ message: "invalid password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.LOGINSIG,
    { expiresIn: "1h" }
  );

  return res.status(200).json({ message: "login successfully", token });
};
export const sendCode = async (req, res) => {
  const { email } = req.body;
  
  const code = customAlphabet("0123456789abcdef ", 6)();
  const user = await userModel.findOneAndUpdate({ email }, { sendCode:code }, { new: true });
  if (!user) {
    return res.status(404).json({ message: "email not found" });
  }
  await sendEmail(email, "Reset Password", `<h2>Code is  ${code}</h2>`);
  return res.status(200).json({ message: "code sent successfully", code });
}
export const forgotPassword = async (req, res) => {
  const { email,password ,code } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "email not found" });
  }
  if (user.sendCode != code) {
    return res.status(401).json({ message: "invalid code" });

  }
user.password= await bcrypt.hash(password,parseInt(process.env.SALTROUND))
user.sendCode = null
await user.save()
}