import clientPromise from "../../util/mongo";
import bcrypt from "bcryptjs";
import dbConnect from "../../util/dbConnect";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db(); // default DB from connection string or specify with .db("your-db-name")

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Remove sensitive info before sending response
    const { password: pwd, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
