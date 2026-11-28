import "../styles/global.css";
import Timeline from "../components/Timeline.jsx";
import { start, end, milestones } from "../data/thesisTimeline.js";
import PageTitle from "../components/PageTitle.jsx";

// Bare page with only the timeline, for embedding in Notion via "Embed link".
function ThesisTimelineEmbedPage() {
  return (
    <main className="w-full p-3">
      <PageTitle title="Thesis timeline" />
      <Timeline start={start} end={end} milestones={milestones} />
    </main>
  );
}

export default ThesisTimelineEmbedPage;
