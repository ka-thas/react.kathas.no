import "../styles/global.css";
import "../styles/projects.css";
import { useState } from "react";
import Breadcrumbs from "../components/breadcrumbs.jsx";
import Footer from "../components/footer.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";

const projectsData = [
  {
    id: "chameleon",
    title: "Chameleon",
    imgSrc: "/assets/images/preview-chameleon.png",
    imgAlt: "preview of the chameleon project",
    description:
      "The popular board game Chameleon, playable from one phone. One player is secretly assigned the role of the Chameleon, while the others work together to identify them.",
    links: [
      { href: "https://projects.kathas.no/chameleon", text: "Try it", type: "demo" },
    ],
  },
  {
    id: "boids",
    title: "Boids algorithm",
    imgSrc: "/assets/images/preview-boids.png",
    imgAlt: "preview of the boids algorithm",
    description:
      "An implementation of the boids algorithm. Each boid (bird-oid) follows three simple rules: separation, alignment and cohesion. The result is a mesmerizing simulation of a flock of birds or school of fish.\n\nThis is also an excellent example of emergent behavior in swarm intelligence; where complex group behavior arises from simple individual rules.",
    links: [
      { href: "https://projects.kathas.no/boids", text: "Try it", type: "demo" },
    ],
  },
  {
    id: "PSO",
    title: "Particle Swarm Optimization",
    imgSrc: "/assets/images/preview-PSO.png",
    imgAlt: "preview of the PSO algorithm",
    description:
      "An implementation of the Particle Swarm Optimization (PSO) algorithm. PSO is a computational method used for optimization problems, inspired by the social behavior of birds flocking or fish schooling.\n\nIn this simulation, particles move through the solution space to find the optimal solution by updating their positions based on their own experience and that of their neighbors. I also created a modified version where the particles mimic the movements of moths around a light source.",
    links: [
      { href: "https://projects.kathas.no/PSO", text: "Try it", type: "demo" },
    ],
  },
  {
    id: "plant",
    title: "Virtual Plant",
    imgSrc: "/assets/images/preview-plant.jpg",
    imgAlt: "Drawing of a potted plant",
    description:
      "This is a virtual plant that I made using JS, HTML and CSS. It's essentially a Tamagotchi but with only one need: water. The plant will grow while it has water or die if it doesn't get water for a long time.",
    links: [
      { href: "https://projects.kathas.no/plant", text: "Try it", type: "demo" },
      { href: "https://github.com/ka-thas/plant", text: "GitHub", type: "repo" },
    ],
  },
  {
    id: "flashcards-v2",
    title: "Flashcards v2",
    imgSrc: "/assets/images/preview-flashcards2.png",
    imgAlt: "preview of flashcards",
    description:
      "This one is a bit more extensive in some ways. The project itself is more modular, but it does not show the explanations for each card.",
    links: [
      { href: "https://projects.kathas.no/flashcards", text: "Try it", type: "demo" },
    ],
  },
  {
    id: "nursery",
    title: "Plant nursery website",
    imgSrc: "/assets/images/preview-nursery.png",
    imgAlt: "preview of nursery website",
    description:
      "Here's an entire website I made for a plant nursery; complete with a contact page, a gallery, a blog, and the Virtual Plant.",
    links: [
      { href: "https://projects.kathas.no/nursery-website", text: "Try it", type: "demo" },
    ],
  },
  {
    id: "calendar",
    title: "Life calendar",
    imgSrc: null,
    imgAlt: null,
    description:
      "Based on Kurzgesagt's Calendar of Life. Every week in your life is a dot, so it looks like a progress bar.",
    links: [
      { href: "https://projects.kathas.no/calendar-of-life", text: "Try it", type: "demo" },
    ],
  },
  {
    id: "ecoSim",
    title: "Eco system simulation",
    imgSrc: "/assets/images/rock_paper_scissors.png",
    imgAlt: "screenshot of Eco system simulation",
    description:
      "Rocks eat scissors, scissors eat paper, and paper eats rock. Each population size fluctuates like in nature, based on the number of predators and prey. Really mesmerizing to watch.\n\nThis project is made using pygame zero. Every entity on screen is of the class \"hand\" and is classified into rock, paper, or scissors depending on what list they're in.",
    links: [
      {
        href: "https://github.com/ka-thas/Projects/tree/main/steinSaksPapir%20smaaBilder",
        text: "GitHub",
        type: "repo",
      },
    ],
  },
  {
    id: "scooter",
    title: "Electric scooter map",
    imgSrc: "/assets/images/preview-scooter.png",
    imgAlt: "Map of nearby electric scooters",
    description: "It shows nearby electric scooters on a map and their battery level.",
    links: [
      {
        href: "https://projects.kathas.no/electric-scooter-map",
        text: "Try it",
        type: "demo",
      },
    ],
  },
  {
    id: "snake",
    title: "Snake",
    imgSrc: "/assets/images/preview-snake.png",
    imgAlt: "preview of snake",
    description:
      "A classic snake game made with JS, HTML and CSS. Use the arrow keys to move the snake.",
    links: [
      { href: "https://projects.kathas.no/snake-js", text: "Try it", type: "demo" },
    ],
  },
  {
    id: "flashcards",
    title: "Flashcards v1",
    imgSrc: "/assets/images/preview-flashcards.png",
    imgAlt: "preview of flashcards",
    description:
      "A super simple flashcards app that I made to help me study. All the cards are stored locally on the client's computer using localStorage.",
    links: [
      {
        href: "https://projects.kathas.no/flashcards/flashcards.html",
        text: "Try it",
        type: "demo",
      },
    ],
  },
];

function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <main className="projects-page text-left gap-5 z-10">
        <Breadcrumbs />
        <section className="projects-intro">
          <h1 className="font-bold">Projects</h1>
          <p>
            Here is a curated collection of my projects. Check out the source
            code on my <a href="https://github.com/ka-thas">GitHub</a>.
          </p>
        </section>
        <div className="projects-grid">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
        <Footer />
      </main>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

export default ProjectsPage;
