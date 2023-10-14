import University from "../models/University";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  prot: 587,
  host: "smtp.gmail.com",
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const getList = async (req, res) => {
  try {
    const university = await University.find({}).sort({ createdAt: -1 });
    return res.json({ university });
  } catch (error) {
    console.log(error);
    return res.json({ ok: "false" });
  }
};
