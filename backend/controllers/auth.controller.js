import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    if(password.length<6){
      return res.status(401).json({error:"Password must be a length of atleast 6 characters"})
    }
    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ error: "Invalid credentials" });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};
