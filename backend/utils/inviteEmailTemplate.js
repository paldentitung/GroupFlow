export const inviteEmailTemplate = ({
  projectName,
  inviterName,
  role,
  inviteLink,
}) => {
  return `
  <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:10px;">

      <h2 style="color:#333;">You're invited to join a project 🚀</h2>

      <p style="font-size:14px; color:#555;">
        Hello,
      </p>

      <p style="font-size:14px; color:#555;">
        <b>${inviterName}</b> has invited you to join the project
        <b>${projectName}</b> as a <b>${role}</b>.
      </p>

      <p style="font-size:14px; color:#555;">
        Click the button below to accept the invitation and get started:
      </p>

      <div style="text-align:center; margin:30px 0;">
        <a href="${inviteLink}"
           style="background:#4f46e5; color:#fff; padding:12px 20px;
           text-decoration:none; border-radius:6px; font-weight:bold;">
          Accept Invitation
        </a>
      </div>

      <p style="font-size:12px; color:#888;">
        If you did not expect this invitation, you can ignore this email.
      </p>

      <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />

      <p style="font-size:12px; color:#aaa; text-align:center;">
        Flux Project Management System
      </p>

    </div>
  </div>
  `;
};
