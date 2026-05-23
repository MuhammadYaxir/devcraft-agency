import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    category: { type: String, default: "Web Development" },
    featuredImage: { type: String, default: "" },
    techStack: { type: [String], default: [] },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project = models.Project || mongoose.model("Project", ProjectSchema);

export default Project;