import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const fetch = require("node-fetch");

const FRONT_URL = "https://sikkkkkw.github.io/YJ4-Project";

export const accessToken = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userData = await User.findOne({ _id: data.id });

    // console.log(userData.email);
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
    const id = req.body.id;
    // const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userData = await User.findOne({ _id: id });
    // console.log(userData);
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

  // console.log(username, email, password, password2);

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

export const kakaoAsyncRegister = async (req, res) => {
  const { code } = req.query;

  // console.log(code);

  try {
    const KAKAO_BASE_PATH = "https://kauth.kakao.com/oauth/token";
    const config = {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT,
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
    };

    const params = new URLSearchParams(config).toString();
    const finalUrl = `${KAKAO_BASE_PATH}?${params}`;

    const data = await fetch(finalUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const tokenRequest = await data.json();

    if ("access_token" in tokenRequest) {
      const { access_token } = tokenRequest;
      const userRequest = await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const userData = await userRequest.json();
      console.log(userData);

      const {
        kakao_account: {
          profile: { thumbnail_image_url },
          name,
          email,
          phone_number,
          birthyear,
          birthday,
          gender,
        },
      } = userData;
      const phone = phone_number.replace(/[^\d]/g, "");
      const modifiedNumber = "0" + phone.toString().substring(2);
      const existingUser = await User.findOne({ email });

      // 카톡채널 레지스터
      const CHANNEL_URL =
        "https://kapi.kakao.com/v1/talkchannel/create/target_user_file";
      const channelRequest = await fetch(CHANNEL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `KakaoAK ${process.env.KAKAO_CLIENT}`,
        },
        data: JSON.stringify({
          channel_public_id: "_gqqxbM",
          file_name: "vip고객리스트",
          schema: {
            생년월일: birthyear,
            성별: gender,
            age: 19,
          },
        }),
      });

      const resultChannel = await channelRequest.json();
      console.log(resultChannel);

      if (existingUser) {
        const user = existingUser;
        // console.log(req.session.user);

        res.status(200).redirect(`${FRONT_URL}/eventpage.html?id=${user._id}`);
      } else {
        const user = await User.create({
          username: email.split("@")[0],
          email,
          name,
          mobile: modifiedNumber,
          avatarUrl: thumbnail_image_url,
          missionCompleted: req.session.missionKakaoId,
        });

        // console.log(req.session.user);

        res.status(200).redirect(`${FRONT_URL}/eventpage.html?id=${user._id}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
