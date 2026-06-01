import mongoose, { Schema, models } from "mongoose";

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    projectType: {
      type: String,
      default: "",
      trim: true,
    },

    budget: {
      type: String,
      default: "",
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Contact =
  models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;