import React, { useEffect, useState } from "react";
import "../styles/global.css";
import "../styles/projects.css";
import Breadcrumbs from "../components/breadcrumbs.jsx";
import Footer from "../components/footer.jsx";

function ProjectsPage() {
    return <>
        {/* <Breadcrumbs /> */}
            <section>
                <h1>Projects</h1>
                <p>
                    Here is a currated collection of my projects. Check out the
                    source code is on my
                    <a href="https://github.com/ka-thas"> GitHub </a>
                </p>
            </section>
            <section id="content" class="shadow">
                <h2>Jump to</h2>
                <ul>
                    <li><a href="#plant"> Virtual Plant</a></li>
                    <li><a href="#nursery">Plant nursery website</a></li>
                    <li><a href="#ecoSim">Eco system simulation</a></li>
                    <li><a href="#scooter">Electric scooter map</a></li>
                    <li><a href="#snake">Snake</a></li>
                    <li><a href="#flashcards">Flashcards</a></li>
                    <li><a href="#boids">Boids algorithm</a></li>
                    <li><a href="#other">Other</a></li>
                </ul>
            </section>
            <section>
                <h2 id="plant">Virtual Plant</h2>
                <p>
                    This is a virtual plant that I made using JS, HTML and CSS.
                    It's essentially a Tamagotchi but with only one need: water.
                    The plant will grow while it has water or die if it doesn't
                    get water for a long time.
                </p>

                <img
                    src="nursery-website/galleriBilder/indexPic2.jpg"
                    alt="Drawing of a potted plant"
                    height="512px"
                    width="512px"
                    class="shadow"
                />
                <p>
                    <a href="./plant/" target="_blank">
                        Plant your own here 🪴
                    </a>
                </p>
            </section>

            <section>
                <h2 id="nursery">Plant nursery website</h2>
                <p>
                    Here's an entire website I made for a plant nursery;
                    complete with a contact page, a gallery, a blog, and the
                    <a href="#plant"> Virtual Plant</a>.
                </p>
                <img
                    src="../assets/images/nursery-preview.png"
                    alt="preview of nursery website"
                    height="849px"
                    width="1159px"
                    class="shadow"
                />
                <p>
                    <a href="./nursery-website/" target="_blank">Check it</a>
                </p>
            </section>
            <section>
                <h2 id="calendar">Life calendar</h2>
                <p>
                    Based on Kurzgesagt's Calendar of Life. Every week in your
                    life is a dot, so it looks like a progress bar.
                </p>
                <a href="calendar-of-life/" target="_blank">Calendar</a>
            </section>
            <section>
                <h2 id="ecoSim">Eco system simulation</h2>
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
                <img
                    src="../assets/images/rock_paper_scissors.png"
                    alt="screenshot of Eco system simulation"
                    class="shadow"
                />
                <br />
                <a
                    href="https://github.com/ka-thas/Projects/tree/main/steinSaksPapir%20smaaBilder"
                >
                    Source code on GitHub
                </a>
            </section>
            <section>
                <h2 id="scooter">Electric scooter map</h2>
                <p>
                    It shows nearby electric scooters on a map and their battery
                    level.
                </p>
                <img
                    src="../assets/images/scooter-preview.png"
                    alt="Map og nearby electric scooters"
                    height="878px"
                    width="1228px"
                    class="shadow"
                />
                <br />
                <a href="./electric-scooter-map/" target="_blank">
                    Try it here 🛴
                </a>
            </section>
            <section>
                <h2 id="snake">Snake</h2>
                <p>
                    A classic snake game made with JS, HTML and CSS. Use the
                    arrow keys to move the snake.
                </p>
                <img
                    src="../assets/images/snake-preview.png"
                    alt="preview of snake"
                    height="849px"
                    width="1159px"
                    class="shadow"
                />
                <br />
                <a href="./snake-js/" target="_blank"> Play snake here 🐍 </a>
            </section>
            <section>
                <h2 id="flashcards">Flashcards</h2>
                <p>
                    A super simple flashcards app that I made to help me study.
                    All the cards are stored locally on the clinents computer
                    using localstorage.
                </p>
                <img
                    src="../assets/images/preview-flashcards.png"
                    alt="preview of flashcards"
                    class="small-image shadow"
                />
                <br />
                <a href="./flashcards/flashcards.html" target="_blank">
                    Try it here 📚
                </a>
            </section>
            <section>
                <h2 id="flashcards-v2">Flashcards v2</h2>
                <p>
                    This one is a bit more extensive in some ways. The project
                    itself is more modular, but it does not show the
                    explainations for each card.
                </p>
                <a href="./flashcards/" target="_blank"> Try it here 📚 </a>
            </section>
            <section>
                <h2 id="boids">Boids algorithm</h2>
                <p>
                    A simulation of the boids algorithm. The boids are birds
                    that follow three simple rules: separation, alignment and
                    cohesion. The result is a mesmerizing simulation of a flock
                    of birds.
                </p>
                <img
                    src="../assets/images/boids-preview.png"
                    alt="preview of the boids algorithm"
                    class="small-image shadow"
                />
                <br />
                <a href="./boids/" target="_blank"> View and interact 🐥 </a>
            </section>
            <section>
                <h2 id="other">Other</h2>
                <p>
                    Smaller projects I've made for personal use or prototyping.
                </p>
            </section>
            <Footer />

</>
}

export default ProjectsPage;