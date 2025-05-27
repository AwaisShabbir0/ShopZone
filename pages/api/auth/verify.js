import dbConnect from "../../../util/dbConnect";
import Token from "../../../models/token";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id, token } = req.query;

  if (!id || !token) {
    return res.status(400).json({ message: "Missing ID or Token" });
  }

  try {
    await dbConnect();

    const verificationToken = await Token.findOne({ userId: id, token });
    if (!verificationToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await User.findByIdAndUpdate(id, { isVerified: true });
    await Token.findByIdAndDelete(verificationToken._id);

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
