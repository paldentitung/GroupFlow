import {
  getAllMembersService,
  getMemberDetailsService,
  removeMemberService,
  inviteMemberService,
  acceptInviteService,
} from "../services/members.service.js";

export const getAllMembersController = async (req, res) => {
  const { projectId } = req.params;

  const result = await getAllMembersService(projectId);
  res.status(200).json({
    success: true,
    message: "Members retrieved successfully",
    members: result,
  });
};

export const getMemberDetailsController = async (req, res) => {
  const { projectId, memberId } = req.params;

  const result = await getMemberDetailsService(projectId, memberId);

  res.status(200).json({
    success: true,
    message: "Member details retrieved successfully",
    data: result,
  });
};

export const removeMemberController = async (req, res) => {
  const { projectId, memberId } = req.params;

  await removeMemberService(projectId, memberId);

  res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
};

export const inviteMemberController = async (req, res) => {
  const { projectId } = req.params;
  const { email, role } = req.body;

  await inviteMemberService(projectId, email, role, req.user);
  res.status(200).json({
    success: true,
    message: "Invitation sent successfully",
  });
};

export const acceptInviteController = async (req, res) => {
  const { token } = req.body;

  await acceptInviteService(token, req.user._id);

  res.status(200).json({
    success: true,
    message: "Invitation accepted successfully",
  });
};
