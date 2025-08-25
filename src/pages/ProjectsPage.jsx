import React, { useEffect, useState } from "react";
import "../styles/global.css";
import "../styles/projects.css";
import Breadcrumbs from "../components/breadcrumbs.jsx";
import Footer from "../components/footer.jsx";
import Project from "../components/Project.jsx";
import IconLink from "../components/IconLink.jsx";

const githubIcon = (
    <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 .3a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.82 2.82 1.3 3.51.99.11-.77.42-1.3.76-1.6-2.66-.3-5.46-1.34-5.46-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.52 11.52 0 016 0c2.28-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.9 1.24 3.22 0 4.62-2.8 5.64-5.47 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0012 .3" />
                        </svg>);


function ProjectsPage() {
    return (
        <>
            <main className="projects-page justify-flex-start text-left max-w-2xl gap-5 z-10">
                <Breadcrumbs />
                <section>
                    <h1 className="font-bold">Projects</h1>
                    <p>
                        Here is a currated collection of my projects. Check out the
                        source code is on my
                        <a href="https://github.com/ka-thas"> GitHub </a>
                    </p>
                </section>
                <section id="content" className="shadow w-full">
                    <h2 className="text-3xl font-bold">Content</h2>
                    <ul>
                        <li><a href="#plant">Virtual Plant</a></li>
                        <li><a href="#nursery">Plant nursery website</a></li>
                        <li><a href="#ecoSim">Eco system simulation</a></li>
                        <li><a href="#scooter">Electric scooter map</a></li>
                        <li><a href="#snake">Snake</a></li>
                        <li><a href="#flashcards">Flashcards</a></li>
                        <li><a href="#boids">Boids algorithm</a></li>
                        <li><a href="#other">Other</a></li>
                    </ul>
                </section>
                <Project
                    id="boids"
                    title="Boids algorithm"
                    imgSrc="../assets/images/preview-boids.png"
                    imgAlt="preview of the boids algorithm"
                    imgProps={{ className: "small-image" }}
                    links={[{ href: "/projects/boids", text: "View and interact 🐥" }]}
                >
                    <p>
                        A simulation of the boids algorithm. The boids are birds
                        that follow three simple rules: separation, alignment and
                        cohesion. The result is a mesmerizing simulation of a flock
                        of birds.
                    </p>
                </Project>

                <Project
                    id="plant"
                    title="Virtual Plant"
                    imgSrc="/assets/images/preview-plant.jpg"
                    imgAlt="Drawing of a potted plant"
                    imgProps={{ height: "512px", width: "512px" }}
                    links={[{ href: "/projects/plant", text: "Plant your own here 🪴" }]}
                >
                    <p>
                        This is a virtual plant that I made using JS, HTML and CSS.
                        It's essentially a Tamagotchi but with only one need: water.
                        The plant will grow while it has water or die if it doesn't
                        get water for a long time.
                    </p>
                    <IconLink
                        href="https://github.com/ka-thas/plant"
                        icon={githubIcon}
                    />
                </Project>

                <Project
                    id="flashcards-v2"
                    title="Flashcards v2"
                    links={[{ href: "/projects/flashcards", text: "Try it here 📚" }]}
                    imgSrc="../assets/images/preview-flashcards2.png"
                    imgAlt="preview of flashcards"
                    imgProps={{ className: "small-image" }}
                >
                    <p>
                        This one is a bit more extensive in some ways. The project
                        itself is more modular, but it does not show the
                        explainations for each card.
                    </p>
                </Project>

                <Project
                    id="nursery"
                    title="Plant nursery website"
                    imgSrc="../assets/images/preview-nursery.png"
                    imgAlt="preview of nursery website"
                    imgProps={{ height: "849px", width: "1159px" }}
                    links={[{ href: "/projects/nursery-website", text: "Check it" }]}
                >
                    <p>
                        Here's an entire website I made for a plant nursery;
                        complete with a contact page, a gallery, a blog, and the
                        <a href="#plant"> Virtual Plant</a>.
                    </p>
                </Project>

                <Project
                    id="calendar"
                    title="Life calendar"
                    links={[{ href: "/projects/calendar-of-life", text: "Calendar" }]}
                >
                    <p>
                        Based on Kurzgesagt's Calendar of Life. Every week in your
                        life is a dot, so it looks like a progress bar.
                    </p>
                </Project>

                <Project
                    id="ecoSim"
                    title="Eco system simulation"
                    imgSrc="../assets/images/rock_paper_scissors.png"
                    imgAlt="screenshot of Eco system simulation"
                    links={[
                        {
                            href: "https://github.com/ka-thas/Projects/tree/main/steinSaksPapir%20smaaBilder",
                            text: "Source code on GitHub"
                        }
                    ]}
                >
                    <p>
                        Rocks eat scissors, scissors eat paper, and paper eats rock.
                        Each population size fluctuates like in nature, based on the
                        number of predators and prey. Really mesmerizing to watch.
                        You could root for a winner and see the result. It's as
                        deterministic as using a randint function, but a lot slower.
                        <br />
                        This project is made using pygame zero. Every entity on
                        screen is of the class "hand" and is classified into rock,
                        paper, or scissors depending on what list they're in.
                    </p>
                </Project>

                <Project
                    id="scooter"
                    title="Electric scooter map"
                    imgSrc="../assets/images/preview-scooter.png"
                    imgAlt="Map of nearby electric scooters"
                    imgProps={{ height: "878px", width: "1228px" }}
                    links={[{ href: "/projects/electric-scooter-map", text: "Try it here 🛴" }]}
                >
                    <p>
                        It shows nearby electric scooters on a map and their battery
                        level.
                    </p>
                </Project>

                <Project
                    id="snake"
                    title="Snake"
                    imgSrc="../assets/images/preview-snake.png"
                    imgAlt="preview of snake"
                    imgProps={{ height: "849px", width: "1159px" }}
                    links={[{ href: "/projects/snake-js", text: "Play snake here 🐍" }]}
                >
                    <p>
                        A classic snake game made with JS, HTML and CSS. Use the
                        arrow keys to move the snake.
                    </p>
                </Project>

                <Project
                    id="flashcards"
                    title="Flashcards v1"
                    imgSrc="../assets/images/preview-flashcards.png"
                    imgAlt="preview of flashcards"
                    imgProps={{ className: "small-image" }}
                    links={[{ href: "/projects/flashcards/flashcards.html", text: "Try it here 📚" }]}
                >
                    <p>
                        A super simple flashcards app that I made to help me study.
                        All the cards are stored locally on the clinents computer
                        using localstorage.
                    </p>
                </Project>

                <Footer />
            </main>
        </>
    );
}

export default ProjectsPage;