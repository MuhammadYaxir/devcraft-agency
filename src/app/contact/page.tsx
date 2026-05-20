import ContactFormSection from "@/sections/contact/ContactFormSection";
import Footer from "@/components/footer/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <ContactFormSection />
      <Footer />
    </main>
  );
}