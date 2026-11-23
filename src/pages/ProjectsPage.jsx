import "../styles/global.css";
import { useState } from "react";
import Footer from "../components/Footer.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
// Each project is a note in the Obsidian vault (src/posts/projects/), see lib/projects.js.
import { projects as projectsData } from "../lib/projects";

function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      {/* Same width and intro spacing as BlogPage. */}
      <main className="max-w-[780px] mx-auto px-4 w-full gap-4">
        <h1 className="font-bold text-5xl mt-5 mb-4">Projects</h1>
        <p>
          Here is a curated collection of my projects. Check out the source
          code on my <a href="https://github.com/ka-thas">GitHub</a>.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 w-full mt-10 mb-8">
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
