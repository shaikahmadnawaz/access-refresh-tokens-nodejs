import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(400).json({ message: "User already existed" });
    }

    const user = await User.create({ email, password });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    return res
      .status(201)
      .json({ user: createdUser, message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { registerUser };
