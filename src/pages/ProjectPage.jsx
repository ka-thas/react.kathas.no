import { useParams, Link } from "react-router-dom";
import "../styles/global.css";
import Footer from "../components/Footer.jsx";
import ProjectLinks from "../components/ProjectLinks.jsx";
import { md } from "../components/mdComponents.jsx";
import { projectsBySlug } from "../lib/projects";

// One project's page, /projects/<slug>, from its note in src/posts/projects/.
function ProjectPage() {
  const { slug } = useParams();
  const project = projectsBySlug[slug];

  if (!project) {
    return (
      <>
        <main className="max-w-[680px] mx-auto px-4 py-24 text-center">
          <p className="text-5xl mb-4 opacity-30">404</p>
          <p className="opacity-60 mb-6">Project not found.</p>
          <Link to="/projects" className="text-accent-green px-5 py-2.5 rounded-lg bg-accent-green/10 border border-accent-green/30 no-underline font-medium hover:bg-accent-green/18 transition-colors duration-150">
            ← Back to projects
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const { title, links, Content } = project;

  return (
    <>
      <main className="max-w-[780px] mx-auto px-4 w-full gap-4 pb-16">
        {/* main is a flex column (global.css), so gap-4 adds to margins like on BlogPage. */}
        <header className="mb-4 flex flex-col gap-4">
          {/* Same title size and spacing as BlogPage's intro. */}
          <h1 className="font-bold text-5xl mt-5 mb-4">{title}</h1>
          <ProjectLinks links={links} />
        </header>

        <article>
          <Content components={md} />
        </article>
      </main>
      <Footer />
    </>
  );
}

export default ProjectPage;
