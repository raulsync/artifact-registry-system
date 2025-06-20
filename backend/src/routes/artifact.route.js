import express from "express";
import { userAuth } from "../middleware/userAuth.js";

import {
  createArtifact,
  getUserArtifacts,
  updateArtifact,
  deleteArtifact,
} from "../controller/artifact.controller.js";

const router = express.Router();

router.use(userAuth);

router.post("/", createArtifact);
router.get("/", getUserArtifacts);
router.put("/:id", updateArtifact);
router.delete("/:id", deleteArtifact);

export default router;
