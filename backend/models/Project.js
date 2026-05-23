import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        role: {
          type: String,
          enum: [
            "Owner",
            "Team Lead",
            "Developer",
            "UI/UX",
            "DevOps",
            "Member",
          ],
          default: "Member",
        },
      },
    ],

    status: {
      type: String,
      enum: ["Active", "On Hold", "Completed"],
      default: "Active",
    },

    progress: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
    },

    dueDate: {
      type: Date,
    },

    techStack: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);
projectSchema.pre("save", function (next) {
  const alreadyMember = this.members.some((m) => m.user.equals(this.owner));
  if (!alreadyMember) {
    this.members.unshift({ user: this.owner, role: "Owner" });
  }
  next();
});
const Project = mongoose.model("Project", projectSchema);

export default Project;
