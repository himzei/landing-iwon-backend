import Consulting from "../models/Consulting";
// import { SolapiMessageService } from "solapi";
// const messageService = new SolapiMessageService(
//   process.env.SOLAPI_API_KEY,
//   process.env.SOLAPI_SECRET_KEY
// );
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
    const consulting = await Consulting.find({}).sort({ createdAt: -1 });
    return res.json({ consulting });
  } catch (error) {
    console.log(error);
    return res.json({ ok: "false" });
  }
};

export const postWrite = async (req, res) => {
  const { name, email, tel, category, message, type } = req.body;

  if (name === "" || email === "" || tel === "") {
    res.json({ ok: "false", error: "필수 입력사항을 작성하셔야 합니다. " });
  }

  const mailOptions = {
    from: email,
    to: "himzei@gmail.com",
    subject: name + "님의 " + type,
    html: `
  		<h1>${type}</h1>
			<H2>이메일 : ${email}</h2>
  		<h2>전화번호 : ${tel}</h2>
  		<h2>관심분야 : ${category}</h2>
  		<h2>전화번호 : ${tel}</h2>

  	`,
    text: message,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(info);

  try {
    await Consulting.create({
      type,
      name,
      email,
      tel,
      category,
      message,
      createdAt: Date.now(),
    });
    res.json({ ok: "true" });
  } catch (error) {
    console.log(error);
    res.json({ ok: "false", error: `에러가 발생했습니다. ${error.code}` });
  }
};
