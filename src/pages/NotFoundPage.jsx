import { Link } from "react-router-dom";
import "../styles/global.css";
import Footer from "../components/footer.jsx";

function NotFoundPage() {
  return (
    <>
      <main className="max-w-[680px] mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl opacity-30">404</h1>
        <p className="text-xl opacity-60 mt-4 mb-8">This page doesn't exist 🥀</p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-lg bg-[rgba(0,255,128,0.1)] border border-[rgba(0,255,128,0.3)] text-[#00ff80] no-underline font-medium hover:bg-[rgba(0,255,128,0.18)] transition-colors duration-150"
        >
          Back to safety
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default NotFoundPage;
