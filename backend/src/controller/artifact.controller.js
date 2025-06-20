import Artifact from "../models/Artifact.model.js";

export const createArtifact = async (req, res) => {
  try {
    const { title, description, metadata } = req.body;

    const artifact = new Artifact({
      title,
      description,
      metadata,
      ownerId: req.user._id,
      uniqueId: req.uniqueIdentity.toString(),
      mutationHistory: [
        {
          action: "CREATE",
          sessionId: req.sessionId,
          changes: { title, description, metadata },
        },
      ],
    });

    await artifact.save();
    res.status(201).json({ artifact });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create artifact", details: err.message });
  }
};

export const getUserArtifacts = async (req, res) => {
  try {
    const artifacts = await Artifact.find({
      uniqueId: req.uniqueIdentity.toString(),
    }).sort({ createdAt: -1 });

    res.json({ artifacts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch artifacts" });
  }
};

export const updateArtifact = async (req, res) => {
  try {
    const { id } = req.params;
    const artifact = await Artifact.findOne({
      _id: id,
      uniqueId: req.uniqueIdentity.toString(),
    });

    if (!artifact)
      return res
        .status(404)
        .json({ error: "Artifact not found or access denied" });

    const { title, description, metadata } = req.body;

    const changes = {};
    if (title) changes.title = title;
    if (description) changes.description = description;
    if (metadata) changes.metadata = metadata;

    Object.assign(artifact, changes);
    artifact.version += 1;
    artifact.mutationHistory.push({
      action: "UPDATE",
      sessionId: req.sessionId,
      timestamp: new Date(),
      changes,
    });

    await artifact.save();
    res.json({ artifact });
  } catch (err) {
    res.status(500).json({ error: "Failed to update artifact" });
  }
};

export const deleteArtifact = async (req, res) => {
  try {
    const { id } = req.params;

    const artifact = await Artifact.findOne({
      _id: id,
      uniqueId: req.uniqueIdentity.toString(),
    });

    if (!artifact)
      return res
        .status(404)
        .json({ error: "Artifact not found or access denied" });

    artifact.isActive = false;
    artifact.mutationHistory.push({
      action: "DELETE",
      sessionId: req.sessionId,
      timestamp: new Date(),
    });

    await artifact.save();
    res.json({ message: "Artifact marked as deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete artifact" });
  }
};
