import Project from "../models/Project.js";
import User from "../models/User.js";
import { inviteEmailTemplate } from "../utils/inviteEmailTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
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

export const removeMemberController = async (req, res) => {
  const { projectId, memberId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  const memberIndex = project.members.findIndex((m) => m._id.equals(memberId));

  if (memberIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Member not found in this project",
    });
  }

  project.members.splice(memberIndex, 1);
  await project.save();

  res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
};

export const inviteMemberController = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { email, role } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const existingMember = project.members.find((m) => m.user.equals(user._id));

    // if (existingMember) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User is already a member of this project",
    //   });
    // }

    // generate invite token
    const token = jwt.sign(
      {
        projectId,
        userId: user._id,
        role: role || "Member",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    await sendEmail({
      to: user.email,
      subject: `You're invited to join "${project.name}"`,
      html: inviteEmailTemplate({
        projectName: project.name,
        inviterName: user.firstName + " " + user.lastName,
        role: role || "Member",
        inviteLink: `${process.env.CLIENT_URL}/invite/accept/${token}`,
      }),
    });

    res.status(200).json({
      success: true,
      message: "Invitation sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
