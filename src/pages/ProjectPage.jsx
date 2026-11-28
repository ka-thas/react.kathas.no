import { useParams, Link } from "react-router-dom";
import "../styles/global.css";
import Footer from "../components/Footer.jsx";
import ProjectLinks from "../components/ProjectLinks.jsx";
import { md } from "../components/mdComponents.jsx";
import { projectsBySlug } from "../lib/projects";
import PageTitle from "../components/PageTitle.jsx";

// One project's page, /projects/<slug>, from its note in src/posts/projects/.
function ProjectPage() {
  const { slug } = useParams();
  const project = projectsBySlug[slug];

  if (!project) {
    return (
      <>
        <main className="max-w-[680px] mx-auto px-4 py-24 text-center">
          <PageTitle title="Project not found" />
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
      <main className="max-w-[680px] mx-auto px-4 pb-16">
        <PageTitle title={project.title} />
        <Link
          to="/projects"
          className="text-sm text-ink/55 no-underline mt-5 mb-8 hover:text-accent-green transition-colors duration-150"
        >
          ← Projects
        </Link>

        <header className="mb-8 pb-5 border-b border-ink/10">
          <h1 className="text-[clamp(1.8rem,5vw,2.5rem)] font-extrabold m-0 mb-4 leading-[1.15]">
            {title}
          </h1>
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
