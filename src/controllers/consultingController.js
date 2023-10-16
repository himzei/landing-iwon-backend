import Consulting from "../models/Consulting";

// 알림톡 임포트
import { SolapiMessageService } from "solapi";
// 알림톡 끝
import nodemailer from "nodemailer";

const messageService = new SolapiMessageService(
  process.env.SOLAPI_API_KEY,
  process.env.SOLAPI_SECRET_KEY
);

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

export const postUniversity = async (req, res) => {
  const { name, email, tel, message, type } = req.body;

  console.log(name, email, tel, message, type);

  if (name === "" || email === "" || tel === "") {
    res.json({ result: 1, message: "이름/이메일/전화번호를 입력해 주세요" });
  }

  const mailOptions = {
    from: email,
    to: ["himzei@gmail.com", "abab002@naver.com"],
    subject: "[대구한의대]" + name + "님의 " + type + " 문의",
    html: `
  		<h1>${type}</h1>
			<H3>이메일 : ${name}</h3>
  		<H3>이메일 : ${email}</h3>
  		<h3>전화번호 : ${tel}</h3>
  		<h3>문의내용</h3>
  		<div>
  		${message}
  		</div>

  	`,
    text: message,
  };

  await transporter.sendMail(mailOptions);

  try {
    await Consulting.create({
      type,
      name,
      email,
      tel,
      message,
      createdAt: Date.now(),
    });
    res.json({ result: 0, message: "상담신청이 완료되었습니다." });
  } catch (error) {
    res.json({ result: 2, message: `에러가 발생했습니다. ${error.code}` });
  }
};

export const postWrite = async (req, res) => {
  const { name, email, tel, category, message, type } = req.body;

  if (name === "" || email === "" || tel === "") {
    res.json({ ok: "false", error: "필수 입력사항을 작성하셔야 합니다. " });
  }

  const mailOptions = {
    from: email,
    to: ["himzei@gmail.com", "iwonuhak@gmail.com"],
    subject: "[아이원유학]" + name + "님의 " + type + " 문의",
    html: `
  		<h1>${type}</h1>
			<H3>이메일 : ${email}</h3>
  		<h3>전화번호 : ${tel}</h3>
  		<h3>관심분야 : ${category}</h3>
  		<h3>전화번호 : ${tel}</h3>
			<h3>문의내용</h3>
			<div>
			${message}
			</div>

  	`,
    text: message,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(info);

  // 알림톡 시작
  messageService.send({
    to: tel,
    from: "01071860119",
    kakaoOptions: {
      pfId: "KA01PF230329052246587htCxbWQq2P1",
      templateId: "KA01TP230329070149638ka9toTFP1Hn",
      // 치환문구가 없을 때의 기본 형태
      variables: {
        "#{name}": name,
        "#{type}": type,
        "#{urlManila}": "iwon-philippines.netlify.app",
        "#{urlCebu}": "iwon-cebu.netlify.app",
        "#{urlCebuMonth}": "iwon-cebu-month.netlify.app",
        "#{urlDal}": "iwon-tarlac.netlify.app",
        "#{urlBagio}": "iwon-baguio.netlify.app/",
      },
      disableSms: true,
    },
  });

  // 알림톡 끝

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

export const postWriteIcan = async (req, res) => {
  const { name, email, tel, category, message, type } = req.body;

  if (name === "" || email === "" || tel === "") {
    res.json({ ok: "false", error: "필수 입력사항을 작성하셔야 합니다. " });
  }

  const mailOptions = {
    from: email,
    to: ["himzei@gmail.com"],
    subject: "[아이캔 행사지원]" + name + "님의 " + type + " 문의",
    html: `
  		<h1>${type}</h1>
			<H3>이메일 : ${email}</h3>
  		<h3>전화번호 : ${tel}</h3>
  		<h3>관심분야 : ${category}</h3>
  		<h3>전화번호 : ${tel}</h3>
			<h3>문의내용</h3>
			<div>
			${message}
			</div>

  	`,
    text: message,
  };

  await transporter.sendMail(mailOptions);

  // messageService.send({
  //   to: tel,
  //   from: "01071860119",
  //   kakaoOptions: {
  //     pfId: "KA01PF230329052246587htCxbWQq2P1",
  //     templateId: "KA01TP230329070149638ka9toTFP1Hn",
  //     // 치환문구가 없을 때의 기본 형태
  //     variables: {
  //       "#{name}": name,
  //       "#{type}": type,
  //       "#{urlManila}": "iwon-philippines.netlify.app",
  //       "#{urlCebu}": "iwon-cebu.netlify.app",
  //       "#{urlCebuMonth}": "iwon-cebu-month.netlify.app",
  //       "#{urlDal}": "iwon-tarlac.netlify.app",
  //       "#{urlBagio}": "iwon-baguio.netlify.app/",
  //     },
  //     disableSms: true,
  //   },
  // });

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
