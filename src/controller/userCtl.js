import User from "../model/User.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const registerUser = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const filter = { _id: [] };
      const newUser = {
        email: req.body.email,
        password: hash,
      };
      const options = { upsert: true };

      const conditions = { email: req.body.email };
      const IsUserExist = await User.findOne(conditions);

      if (!IsUserExist) {
        const userInfo = await User.updateOne(filter, newUser, options);

        const accountInfo = {
          status: "Register successfully",
          accountInfo: { email: req.body.email, password: req.body.password },
          response: userInfo,
        };
        return res.status(200).json(accountInfo);
      } else {
        res.status(500).json({ status: "Email is already used!" });
      }
    });
  } catch (err) {
    res.status(500).json({ status: "Failed to connect server" });
  }
};

export const login = async (req, res) => {
  try {
    const conditions = { email: req.body.email };
    const selectUser = await User.findOne(conditions);
    if (selectUser) {
      const result = await bcrypt.compare(
        req.body.password,
        selectUser.password
      );
      res.status(200).json({
        status: `${
          result === true ? "Login successful" : "Password incorrect"
        }`,
      });
    } else {
      res.status(500).json({ status: "Email not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "Failed to connect server" });
  }
};
