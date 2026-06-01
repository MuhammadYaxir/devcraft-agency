import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CraftoDev",
  description:
    "Learn how CraftoDev collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-4xl font-black text-[#05070D]">
          Privacy Policy
        </h1>

        <p className="mb-6 text-gray-600">
          Last Updated: June 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Introduction
            </h2>
            <p>
              At CraftoDev, we respect your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, and safeguard information when you visit our
              website or contact us regarding our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Information We Collect
            </h2>
            <p>
              We may collect information including:
            </p>

            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Project requirements</li>
              <li>Company information</li>
              <li>Website usage analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              How We Use Your Information
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to inquiries</li>
              <li>Provide project estimates</li>
              <li>Deliver development services</li>
              <li>Improve website performance</li>
              <li>Communicate project updates</li>
              <li>Maintain business records</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Cookies & Analytics
            </h2>

            <p>
              We may use cookies and analytics tools to improve user experience,
              understand website traffic, and optimize website performance.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Data Security
            </h2>

            <p>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, disclosure, or
              misuse.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Third-Party Services
            </h2>

            <p>
              We may use trusted third-party services such as Vercel, Google
              Analytics, Resend, MongoDB, and other business tools necessary to
              operate our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Your Rights
            </h2>

            <p>
              You may request access, correction, or deletion of your personal
              information by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Contact Us
            </h2>

            <p>
              If you have questions regarding this Privacy Policy, please
              contact us:
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 p-5">
              <p>
                <strong>CraftoDev</strong>
              </p>
              <p>Email: craftodevtech@gmail.com</p>
              <p>Phone: +92 309 9997547</p>
              <p>Location: Pakistan</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}