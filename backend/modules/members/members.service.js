import Project from "../projects/Project.js";
import User from "../users/User.js";
import AppError from "../../utils/AppError.js";
import { inviteEmailTemplate } from "../../utils/inviteEmailTemplate.js";
import sendEmail from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import { createHistoryService } from "../history/history.service.js";
import { createNotificationService } from "../notifications/notification.service.js";
import mongoose from "mongoose";
export const getAllMembersService = async (projectId) => {
  const project = await Project.findById(projectId).populate(
    "members.user",
    "firstName lastName avatar bio phone",
  );

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project.members;
};

export const getMemberDetailsService = async (projectId, memberId) => {
  const project = await Project.findById(projectId).populate(
    "members.user",
    "firstName lastName avatar email avatar",
  );

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const member = project.members.find((m) => m._id.equals(memberId));

  if (!member) {
    throw new AppError("Member not found in this project", 404);
  }

  return member;
};

export const removeMemberService = async (projectId, memberId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const memberIndex = project.members.findIndex((m) => m._id.equals(memberId));

  if (memberIndex === -1) {
    throw new AppError("Member not found in this project", 404);
  }

  if (project.members[memberIndex].role === "Owner") {
    throw new AppError("Owner cannot be removed", 400);
  }

  project.members.splice(memberIndex, 1);
  await project.save();

  await createHistoryService({
    userId: removedMember.user,
    projectId,
    entity: "member",
    entityId: removedMember.user,
    action: "deleted",
    details: `Member was removed from the project`,
  });
  return;
};

export const inviteMemberService = async (projectId, email, role, inviter) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const existingMember = project.members.find((m) => m.user.equals(user._id));

  //   if (existingMember) {
  //     throw new AppError("User is already a member of this project", 400);
  //   }

  const normalizedRole = role || "Member";

  const token = jwt.sign(
    { projectId, userId: user._id, role: normalizedRole, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  console.log("Generated invite token:", token);

  await sendEmail({
    to: user.email,
    subject: `You're invited to join "${project.name}"`,
    html: inviteEmailTemplate({
      projectName: project.name,
      inviterName: inviter.firstName + " " + inviter.lastName,
      role: normalizedRole,
      inviteLink: `${process.env.CLIENT_URL}/accept-invite/${token}`,
    }),
  });

  await createHistoryService({
    userId: inviter._id,
    projectId,
    entity: "member",
    entityId: user._id,
    action: "created",
    details: `${inviter.firstName} ${inviter.lastName} invited ${user.email} as ${normalizedRole}`,
  });

  await createNotificationService({
    recipientId: user._id,
    senderId: inviter._id,
    projectId,
    type: "member_invited",
    message: `${inviter.firstName} ${inviter.lastName} invited you to join "${project.name}" as ${normalizedRole}`,
  });
  return;
};

export const acceptInviteService = async (token, currentUserId) => {
  console.log("Accepting invite with token:", token);
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError")
      throw new AppError("Invitation expired", 410);
    throw new AppError("Invalid token", 400);
  }

  if (!new mongoose.Types.ObjectId(currentUserId).equals(decoded.userId)) {
    throw new AppError("Invalid invitation", 403);
  }
  const { projectId, userId, role } = decoded;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const existingMember = project.members.find((m) =>
    m.user.equals(currentUserId),
  );

  if (existingMember) {
    throw new AppError("User already joined this project", 400);
  }

  project.members.push({
    user: currentUserId,
    role,
  });

  await project.save();

  await createHistoryService({
    userId: currentUserId,
    projectId,
    entity: "member",
    entityId: currentUserId,
    action: "created",
    details: `Member joined the project as ${role}`,
  });
  return;
};
