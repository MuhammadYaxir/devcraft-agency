import { Resend } from "resend";
import dbConnect from "@/backend/config/dbConnect";
import Contact from "@/backend/models/Contact";
import { BackendContactInput } from "@/backend/validators/contactSchema";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function processContactInquiry(data: BackendContactInput) {
  const { name, email, company, projectType, budget, message } = data;

  // 1. Send email notification
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing");
  }

  if (resend) {
    try {
      const emailResult = await resend.emails.send({
        from: "CraftODev <onboarding@resend.dev>",

        // Use the email that is verified/allowed in Resend
        to: ["craftodevtech@gmail.com"],

        replyTo: email,
        subject: `🚀 New Project Inquiry from ${name}`,
        html: `
          <div style="font-family:sans-serif;background:#050816;color:#ffffff;padding:20px;border-radius:8px;">
            <h2 style="color:#2563eb;">New Project Lead</h2>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "Not Provided"}</p>
            <p><strong>Project Type:</strong> ${projectType || "Not Selected"}</p>
            <p><strong>Budget:</strong> ${budget || "Not Selected"}</p>

            <hr style="border-color:#1f2937;" />

            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        `,
      });

      console.log("✅ Resend email sent:", emailResult);
    } catch (error) {
      console.error("❌ Resend Error Full Details:", error);
    }
  }

  // 2. Save to MongoDB using Mongoose
  await dbConnect();

  const contact = await Contact.create({
    name,
    email,
    company: company || "",
    projectType: projectType || "",
    budget: budget || "",
    message,
    status: "new",
  });

  return contact;
}