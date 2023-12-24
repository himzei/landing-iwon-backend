import User from "../models/User.js";

export const checkInstaUrl = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const existing = await User.findById(id);
    return res.json({
      ok: true,
      user: existing,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postInstaRegister = async (req, res) => {
  const {
    body: { instaUrl, id },
  } = req;

  try {
    const existing = await User.findOne({
      _id: id,
      instaUrl: { $in: [instaUrl] },
    });
    if (existing) {
      return res.json({
        ok: false,
        message: "이미 미션 완료하였습니다.",
      });
    }
    const updateUser = await User.updateOne(
      { _id: id },
      {
        $set: { instaUrl },
      }
    );

    res.status(200).json({ ok: true, user: updateUser });
  } catch (error) {
    console.log(error);
  }
};
