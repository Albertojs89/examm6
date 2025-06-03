import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Header />
      <div className="flex justify-center items-center h-full text-white">
        <h2 className="text-4xl">Vista de About</h2>
      </div>
      <Footer />
    </div>
  );
}