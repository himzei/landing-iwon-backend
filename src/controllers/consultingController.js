import Consulting from "../models/Consulting";

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
  const { name, email, tel, category, message } = req.body;
  console.log(name, email, tel, category, message);

  if (name === "" || email === "" || tel === "") {
    res.json({ ok: "false", error: "필수 입력사항을 작성하셔야 합니다. " });
  }

  try {
    await Consulting.create({
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
