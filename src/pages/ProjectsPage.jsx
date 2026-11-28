import "../styles/global.css";
import { useState } from "react";
import Footer from "../components/Footer.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
// Each project is a note in the Obsidian vault (src/posts/projects/), see lib/projects.js.
import { projects as projectsData } from "../lib/projects";
import PageTitle from "../components/PageTitle.jsx";
import { pages } from "../lib/pages";

function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <main className="flex flex-col items-start w-full max-w-[1000px] mx-auto px-4 text-left gap-5 z-10">
        <PageTitle title={pages.projects.title} />
        <section className="py-[0.6em] w-full max-w-[600px]">
          <h1 className="font-bold text-5xl mt-5 mb-4">{pages.projects.title}</h1>
          <p>
            Here is a curated collection of my projects. Check out the source
            code on my <a href="https://github.com/ka-thas">GitHub</a>.
          </p>
        </section>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 w-full">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </main>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      <Footer />
    </>
  );
}

export default ProjectsPage;
