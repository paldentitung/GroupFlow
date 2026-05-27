import Project from "../models/Project.js";

export const getAllMembersController = async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId).populate(
    "members.user",
    "firstName lastName avatar",
  );

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Members retrieved successfully",
    members: project.members,
  });
};

export const getMemberDetailsController = async (req, res) => {
  const { projectId, memberId } = req.params;

  const project = await Project.findById(projectId).populate(
    "members.user",
    "firstName lastName avatar email",
  );

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  const member = project.members.find((m) => m._id.equals(memberId));

  if (!member) {
    return res.status(404).json({
      success: false,
      message: "Member not found in this project",
    });
  }

  res.status(200).json({
    success: true,
    message: "Member details retrieved successfully",
    member,
  });
};
