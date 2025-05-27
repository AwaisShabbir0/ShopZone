import bcrypt from "bcryptjs";
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect"; // or utils if that's your folder
// import { sendVerificationEmail } from "../../../util/sendEmail";  
import { sendVerificationEmail } from "../../../util/sendEmail";
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      isVerified: false,
    });
console.log("BODY:", req.body);

    await sendVerificationEmail(email, newUser._id);

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
