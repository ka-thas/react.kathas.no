import "../styles/global.css";
import Footer from "../components/Footer.jsx";
import Countdown from "../components/Countdown.jsx";
import PostCard from "../components/PostCard.jsx";
import Timeline from "../components/Timeline.jsx";
import LinktreeLink from "../components/LinktreeLink.jsx";
import { externalLinkIcon } from "../assets/socialIcons.jsx";


const start = { date: "2026-08-10", label: "Started writing" };
const end = { date: "2027-06-10", label: "Thesis defense" };
const milestones = [
  { date: "2026-09-09", label: "Arriving in Nagoya" },
  { date: "2026-09-24", label: "ALife Symposium" },
  { date: "2026-10-01", label: "Extended project description" },
  { date: "2026-10-28", label: "AROB abstract" },
  { date: "2026-12-23", label: "AROB final paper" },
  { date: "2027-01-19", label: "AROB conference" },
  { date: "2027-05-15", label: "Thesis delivery" },
];

function MasterThesisPage() {
  return (
    <>
      <main className="max-w-[780px] mx-auto px-4 w-full">
        <h1 className="font-bold text-5xl mt-5 mb-4">Master's Thesis 🎓</h1>
        <p className="mb-8 opacity-70 max-w-[520px]">
          Dashboard for everything regarding my master's thesis.
        </p>
        <Timeline
          start={start}
          end={end}
          milestones={milestones}
          className="bg-[rgba(150,200,150,0.12)] border border-white/7 rounded-xl py-5 px-5 mb-4"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
          {/* {milestones.map((m) => (
            <Countdown key={m.date} date={m.date} label={m.label} />
          ))}*/}
          <PostCard slug="/my-masters-thesis" title="My Master's Thesis" date="2026-05-23" description="Writing my thesis in Japan, using LLMs to guide evolutionary search for novel artificial life in Lenia." />
          <LinktreeLink text="AROB 2027" href="https://isarob.org/symposium/" icon={externalLinkIcon} className="w-full! max-w-none! mb-0!" />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MasterThesisPage;
