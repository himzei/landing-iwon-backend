import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const accessToken = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userData = await User.findOne({ _id: data.id });

    console.log(userData.email);
    res.status(200).json({ ok: true, email: userData.email });
  } catch (error) {
    res.status(500).json({ ok: false });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET);
    const userData = await User.findOne({ _id: data.id });

    // accessToken 새로발급
    const accessToken = jwt.sign(
      {
        id: userData._id,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "1m",
      }
    );

    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

export const loginSuccess = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userData = await User.findOne({ _id: data.id });

    res
      .status(200)
      .json({ ok: true, email: userData.email, username: userData.username });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("accessToken", "");
    res.status(200).json({ ok: true, message: "로그아웃 성공" });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ ok: "error", error: "이메일이 없습니다." });
  }
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.json({ ok: "error", error: "이메일/패스워드가 다릅니다." });
  }

  try {
    // accessToken 발급
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "1m",
      }
    );

    // refreshToekn 발급
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // token 전송
    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false });
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
    res.status(500).json({ ok: "false", error: `에러가 발생햇씁니다.` });
  }
};
