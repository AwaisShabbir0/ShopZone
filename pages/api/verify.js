import Token from "../../models/token";
import User from "../../models/User";
import dbConnect from "../../util/dbConnect";
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { id, token } = req.query;

  await dbConnect();

  try {
    const verificationToken = await Token.findOne({ userId: id, token });
    if (!verificationToken) return res.status(400).json({ message: "Invalid or expired token" });

    await User.updateOne({ _id: id }, { isVerified: true });
    await verificationToken.deleteOne();

    res.status(200).json({ message: "Email verified successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}
