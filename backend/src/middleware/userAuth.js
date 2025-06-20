import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
};

const userAuth = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      return res.status(401).json({
        error: "Access denied. No token provided.",
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        error: "Invalid token.",
      });
    }

    const user = await User.findById(decoded.userId).select("-passwordHash");
    if (!user || !user.isActive) {
      return res.status(401).json({
        error: "User not found or inactive.",
      });
    }

    // Attach user  for identity isolation
    req.user = user;
    req.uniqueIdentity = user.uniqueIdentity;
    req.sessionId = decoded.sessionId || `session_${Date.now()}`;

    next();
  } catch (error) {
    res.status(500).json({
      error: "Authentication failed.",
      code: "AUTH_ERROR",
    });
  }
};

export { generateToken, verifyToken, userAuth };
