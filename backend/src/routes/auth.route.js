import express from "express";
import { User, hashPassword, validatePassword } from "../models/User.model.js";
import { generateToken } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(user);
    res.status(201).json({ message: "User created", userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await validatePassword(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken({ userId: user._id });
  user.sessionTokens.push({
    token,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 3600000),
  });
  await user.save();

  res.json({ token });
});

export default router;
