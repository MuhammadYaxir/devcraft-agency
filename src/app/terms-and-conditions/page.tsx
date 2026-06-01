import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | CraftoDev",
  description:
    "Terms and Conditions governing the use of CraftoDev services and website.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-4xl font-black text-[#05070D]">
          Terms & Conditions
        </h1>

        <p className="mb-6 text-gray-600">
          Last Updated: June 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Agreement to Terms
            </h2>
            <p>
              By accessing this website and using CraftoDev services, you agree
              to be bound by these Terms & Conditions. If you do not agree with
              any part of these terms, please do not use our website or
              services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Services
            </h2>
            <p>
              CraftoDev provides professional web development, UI/UX design,
              website maintenance, custom software development, AI integration,
              and related digital services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Project Proposals & Estimates
            </h2>
            <p>
              Any quotation, proposal, or estimate provided by CraftoDev is
              based on the information supplied by the client. Changes to
              project scope may result in revised pricing and timelines.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Payments
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Project work may require an upfront deposit.</li>
              <li>Remaining balances are due according to agreed milestones.</li>
              <li>Late payments may delay project delivery.</li>
              <li>
                Final project files may be withheld until full payment is
                received.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Client Responsibilities
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate project requirements.</li>
              <li>Deliver content, assets, and feedback promptly.</li>
              <li>Review and approve deliverables within agreed timelines.</li>
              <li>
                Ensure ownership or licensing of supplied materials.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Intellectual Property
            </h2>

            <p>
              Upon full payment, ownership of the final deliverables is
              transferred to the client unless otherwise agreed in writing.
              CraftoDev retains the right to showcase completed work in its
              portfolio and marketing materials.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Revisions
            </h2>

            <p>
              Reasonable revisions are included as outlined in the project
              agreement. Additional revisions beyond the agreed scope may incur
              extra charges.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Limitation of Liability
            </h2>

            <p>
              CraftoDev shall not be liable for indirect, incidental, special,
              or consequential damages arising from the use of our website,
              services, or delivered products.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Third-Party Services
            </h2>

            <p>
              Projects may utilize third-party platforms, APIs, hosting
              providers, or software tools. CraftoDev is not responsible for
              outages, pricing changes, or policy changes made by those
              third-party providers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Termination
            </h2>

            <p>
              Either party may terminate a project by written notice. Fees for
              work completed up to the termination date remain payable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Changes to These Terms
            </h2>

            <p>
              CraftoDev reserves the right to update or modify these Terms &
              Conditions at any time. Updated versions will be published on this
              page.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#05070D]">
              Contact Information
            </h2>

            <div className="mt-4 rounded-xl border border-gray-200 p-5">
              <p>
                <strong>CraftoDev</strong>
              </p>
              <p>Email: craftodevtech@gmail.com</p>
              <p>Phone: +92 309 9997547</p>
              <p>Website: https://craftodev-agency.vercel.app</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}