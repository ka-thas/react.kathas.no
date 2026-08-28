import "../styles/global.css";
import Footer from "../components/footer.jsx";
import Countdown from "../components/Countdown.jsx";
import PostCard from "../components/PostCard.jsx";

function MasterThesisPage() {
  return (
    <>
      <main className="max-w-[780px] mx-auto px-4 w-full">
        <h1 className="font-bold text-5xl mt-5 mb-4">Master's Thesis 🎓</h1>
        <p className="mb-8 opacity-70 max-w-[520px]">
          Dashboard for everything regarding my master's thesis.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
          <Countdown date="2026-09-08" label="leaving for Nagoya" />
          <Countdown date="2027-05-15" label="thesis delivery" />
          <PostCard slug="/my-masters-thesis" title="My Master's Thesis" date="2026-05-23" description="Writing my thesis in Japan, using LLMs to guide evolutionary search for novel artificial life in Lenia." />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MasterThesisPage;
