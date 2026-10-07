import "../styles/global.css";
import Timeline from "../components/Timeline.jsx";
import { start, end, milestones } from "../data/thesisTimeline.js";

// Bare page with only the timeline, for embedding in Notion via "Embed link".
function ThesisTimelineEmbedPage() {
  return (
    <main className="w-full p-3">
      <Timeline start={start} end={end} milestones={milestones} />
    </main>
  );
}

export default ThesisTimelineEmbedPage;
