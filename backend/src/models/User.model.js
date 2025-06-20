import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // for isolation
    uniqueIdentity: {
      type: mongoose.Schema.Types.ObjectId,
      default: function () {
        return this._id; // default userId
      },
    },

    // multi session managemant
    sessionTokens: [
      {
        token: String,
        createdAt: Date,
        expiresAt: Date,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

const validatePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const User = mongoose.model("User", userSchema);

export { hashPassword, validatePassword };
