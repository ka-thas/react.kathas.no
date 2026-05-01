import "../styles/global.css";
import "../styles/projects.css";
import { useState } from "react";
import Footer from "../components/footer.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import { projectImages } from "../assets/projectImages";

const projectsData = [
  {
    id: "lawnmower",
    title: "Wild Lawnmower",
    imgSrc: projectImages.wildLawnmower,
    imgAlt: "Menu screen of wild lawnmower game",
    description:
      "IFI Game Jam 2026. A cute little game inspired by snake",
    links: [
      { href: "https://github.com/mathias1601/Snakeler", text: "GitHub", type: "repo" },
    ],
  },
  {
    id: "chameleon",
    title: "Chameleon",
    imgSrc: projectImages.chameleon,
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
    imgSrc: projectImages.boids,
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
    imgSrc: projectImages.PSO,
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
    imgSrc: projectImages.plant,
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
    imgSrc: projectImages.flashcardsV2,
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
    imgSrc: projectImages.nursery,
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
    imgSrc: projectImages.lifeCalendar,
    imgAlt: "preview of life calendar",
    description:
      "Based on Kurzgesagt's Calendar of Life. Every week in your life is a dot, so it looks like a progress bar.",
    links: [
      { href: "https://projects.kathas.no/calendar-of-life", text: "Try it", type: "demo" },
    ],
  },
  {
    id: "ecoSim",
    title: "Eco system simulation",
    imgSrc: projectImages.ecoSim,
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
    imgSrc: projectImages.scooter,
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
    imgSrc: projectImages.snake,
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
    imgSrc: projectImages.flashcards,
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
