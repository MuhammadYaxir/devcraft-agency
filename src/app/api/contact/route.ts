import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with safety fallback check
const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

// Explicitly type the expected incoming request payload
interface ContactRequestPayload {
  name: string;
  email: string;
  budget: string;
  message: string;
}

export async function POST(request: Request) {
  // 1. Environmental Safeguard Check
  if (!resend) {
    console.error("Missing RESEND_API_KEY environmental variable.");
    return NextResponse.json(
      { error: "Email service misconfigured on server layer." },
      { status: 500 }
    );
  }

  try {
    // 2. Parse Incoming Stream Body safely
    const body: Partial<ContactRequestPayload> = await request.json();
    const { name, email, budget, message } = body;

    // 3. Validation Matrix
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "A valid name is required." }, { status: 400 });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!budget) {
      return NextResponse.json({ error: "A project budget bracket must be specified." }, { status: 400 });
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must contain a project description of at least 10 characters." },
        { status: 400 }
      );
    }

    // 4. Dispatch Email via Resend SDK Engine
    const emailResponse = await resend.emails.send({
      from: "DevCraft Agency <onboarding@resend.dev>", // Replace with your verified custom domain address once live (e.g., hello@devcraft.agency)
      to: ["yasirtech129@gmail.com"],                  // Where you want the client alerts delivered
      replyTo: email.trim(),                          // Allows you to click 'Reply' directly in your inbox to email the client
      subject: `✨ New Agency Inquiry from ${name.trim()}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Project Lead Inquiry</title>
          </head>
          <body style="font-family: system-ui, -apple-system, sans-serif; background-color: #050816; color: #ffffff; padding: 40px; margin: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #0c1026; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              
              <h2 style="color: #a855f7; font-size: 24px; font-weight: 700; margin-top: 0; letter-spacing: -0.025em; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px;">
                Incoming Project Inquiry
              </h2>
              
              <table style="width: 100%; margin-top: 24px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; width: 120px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Client Name</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 16px;">${name.trim()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                  <td style="padding: 8px 0; color: #a855f7; font-size: 16px;"><a href="mailto:${email.trim()}" style="color: #a855f7; text-decoration: none;">${email.trim()}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Est. Budget</td>
                  <td style="padding: 8px 0; color: #34d399; font-size: 16px; font-weight: 600;">${budget}</td>
                </tr>
              </table>
              
              <div style="margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); pt-24px;">
                <h3 style="color: #ffffff; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; margin-top: 24px;">Project Message / Brief</h3>
                <p style="color: #d1d5db; font-size: 15px; line-height: 1.6; background-color: rgba(255,255,255,0.02); padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); margin: 0; white-space: pre-wrap;">
                  ${message.trim()}
                </p>
              </div>
              
              <footer style="margin-top: 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px;">
                <p style="font-size: 11px; color: #6b7280; margin: 0; letter-spacing: 0.05em; text-transform: uppercase;">
                  Automated routing delivery via DevCraft Core Platform Engine
                </p>
              </footer>
            </div>
          </body>
        </html>
      `,
    });

    // 5. Check response status tracking payload from Resend service layer
    if (emailResponse.error) {
      console.error("Resend API Error details:", emailResponse.error);
      return NextResponse.json(
        { error: "The email transmission provider rejected the payload execution." },
        { status: 400 }
      );
    }

    // Success Outbox Pipeline Response
    return NextResponse.json(
      { message: "Lead submitted successfully. Our team will contact you shortly." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Global Catch Pipeline Failure:", error);
    return NextResponse.json(
      { error: "An unhandled server anomaly intercepted code processing." },
      { status: 500 }
    );
  }
}