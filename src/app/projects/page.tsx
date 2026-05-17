import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ProjectsSection from "@/sections/projects/ProjectsSection";
export default function Page() {
  return (
    <>
      <Navbar />

    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
      <ProjectsSection />
    </main>
    <Footer />
    </>
  );
}