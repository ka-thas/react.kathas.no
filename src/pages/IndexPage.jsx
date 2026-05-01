import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/index.css";
import Footer from "../components/footer";

function IndexPage() {
    return (
        <>
            <main className="max-w-2xl w-full mx-auto flex flex-col items-start justify-center min-h-screen p-8 gap-5">
                <h1>
                    <span className="gradient-text font-bold">Ka Thas</span>
                </h1>

                <p>
                    Hey, and welcome to my personal nook of the internet! Here you can find info about my projects, interests, and
                    how to contact me. I am currently doing my master's at UiO in robotics and machine learning.
                </p>
                <ul>
                    <li>
                        <Link to="/Projects">&gt; Projects</Link>
                    </li>
                    <li>
                        <Link to="/social">&gt; Socials</Link>
                    </li>
                </ul>
            </main>
            <Footer />
        </>
    );
}

export default IndexPage;
