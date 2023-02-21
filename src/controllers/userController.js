import User from "../models/User";

export const getJoin = (req, res) => res.send({ ok: true });

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ ok: "error", error: "이메일이 없습니다." });
    }
    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.json({ ok: "error", error: "이메일/패스워드가 다릅니다." });
    }
  } catch {
    console.log(error);
  }
};

export const postJoin = async (req, res) => {
  const { username, email, password, password2 } = req.body;

  console.log(username, email, password, password2);

  if (password !== password2) {
    res.json({ ok: "false", error: "입력하신 패스워드가 다릅니다." });
  }

  const exists = await User.exists({ $or: [{ username }, { email }] });

  if (exists) {
    res.json({ ok: "false", error: "username/email 이 존재하지 않습니다." });
  }

  try {
    await User.create({
      username,
      email,
      password,
      createdAt: Date.now(),
    });
    res.json({ ok: "true" });
  } catch (error) {
    console.log(error);
    res.json({ ok: "false", error: `에러가 발생햇씁니다. ${error.code}` });
  }
};
