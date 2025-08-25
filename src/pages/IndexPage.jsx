import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/index.css";
import Breadcrumbs from "../components/breadcrumbs.jsx";

function IndexPage() {
    const [commitHash, setCommitHash] = useState("Loading...");
    const [commitDate, setCommitDate] = useState("Loading...");

    useEffect(() => {
        fetch("https://api.github.com/repos/ka-thas/kathas.no/commits/main")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const commitDate = new Date(data.commit.author.date);
                const formattedDate = `${commitDate
                    .getDate()
                    .toString()
                    .padStart(2, "0")}-${(commitDate.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${commitDate.getFullYear()}`;
                setCommitHash(data.sha.substring(0, 7));
                setCommitDate(formattedDate);
            })
            .catch((error) => {
                console.error("Error fetching commit:", error);
                setCommitHash("N/A");
                setCommitDate("Unavailable");
            });
    }, []);

    return (
        <>
            <main className="max-w-2xl w-full mx-auto flex flex-col items-start justify-center min-h-screen p-8 gap-5">
                <h1>
                    <span className="gradient-text font-bold">Ka Thas</span>
                </h1>
                
                <p>
                    Hey, and welcome to my personal my nook of the internet! Here you can find info about my projects, interests, and
                    how to contact me. I am currently doing my master's at UiO in robotics and machine learning.
                </p>
                <ul>
                    <li>
                        <Link to="/Projects">&gt; Projects</Link>
                    </li>
                    <li>
                        <Link to="/Contact">&gt; Contact</Link>
                    </li>
                </ul>
                <p style={{ color: "#8a8" }}>
                    Latest commit <span>{commitDate}</span>:
                    <a
                        href="https://github.com/ka-thas/kathas.no"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>{commitHash}</span>
                    </a>
                </p>
            </main>
        </>
    );
}

export default IndexPage;
