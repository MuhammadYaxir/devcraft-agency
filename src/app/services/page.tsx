import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ServicesSection from "@/sections/services/ServicesSection";
export default function Page() {
  return (
    <>
      <Navbar />
    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
      <ServicesSection />
    </main>
    <Footer />
    </>
  );
}