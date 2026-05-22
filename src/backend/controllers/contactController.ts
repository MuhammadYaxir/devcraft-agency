import { Resend } from "resend";
// FIX: Relative path hatai aur aapke project ka standard alias root '@/' use kiya
import dbConnect from "@/backend/config/dbConnect";
import { BackendContactInput } from "@/backend/validators/contactSchema";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function processContactInquiry(data: BackendContactInput) {
  const { name, email, budget, message } = data;

  // 1. Resend Outbound Notification
  if (resend) {
    try {
      await resend.emails.send({
        from: "DevCraft Agency <onboarding@resend.dev>",
        to: ["yasirtech129@gmail.com"],
        replyTo: email,
        subject: `✨ New Agency Inquiry from ${name}`,
        html: `
          <div style="font-family: sans-serif; background-color: #050816; color: #ffffff; padding: 20px; border-radius: 8px;">
            <h2 style="color: #a855f7;">New Project Lead</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Resend system warning:", emailErr);
    }
  }

  // 2. Insert into MongoDB
  const client = await dbConnect() ;
  const db = client.db("devcraft-agency");
  
  const writeResult = await db.collection("inquiries").insertOne({
    name,
    email,
    budget,
    message,
    createdAt: new Date(),
  });

  return writeResult;
}