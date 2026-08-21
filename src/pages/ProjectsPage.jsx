import "../styles/global.css";
import { useState } from "react";
import Footer from "../components/footer.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import { projectImages } from "../assets/projectImages";
import { projectsData } from "../lib/projects.js";


function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <main className="flex flex-col items-start w-full max-w-[1000px] mx-auto px-4 text-left gap-5 z-10">
        <section className="py-[0.6em] w-full max-w-[600px]">
          <h1 className="font-bold text-5xl mt-5 mb-4">Projects</h1>
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
