import { jwt } from "zod";

export const generateInviteToken = ({ projectId, email, role }) => {
  const token = jwt.sign({ projectId, email, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};
