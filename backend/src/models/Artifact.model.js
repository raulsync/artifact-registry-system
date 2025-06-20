import mongoose from "mongoose";
const artifactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    uniqueId: {
      type: String,
      required: true,
      index: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    mutationHistory: [
      {
        action: {
          type: String,
          enum: ["CREATE", "UPDATE", "DELETE"],
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        changes: mongoose.Schema.Types.Mixed,
        sessionId: String,
      },
    ],
  },
  {
    timestamps: true,
    collection: "artifacts",
  }
);

const Artifact = mongoose.model("Artifact", artifactSchema);

export default Artifact;
