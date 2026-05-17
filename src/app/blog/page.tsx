import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <h1 className="text-5xl font-bold">
          Blog Page
        </h1>
      </main>
      <Footer />
    </>
  );
}