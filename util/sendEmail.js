import nodemailer from "nodemailer";
import crypto from "crypto";
import Token from "../models/token";

export const sendVerificationEmail = async (email, userId) => {
  const token = crypto.randomBytes(32).toString("hex");

  await Token.create({
    userId,
    token,
    createdAt: Date.now(),
  });

  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?id=${userId}&token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // or your preferred provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `<p>Click the link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
  });
};
