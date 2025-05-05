import React, { useEffect, useState } from "react";
import "../styles/global.css";
import "../styles/index.css";

function IndexPage() {
    const [commitHash, setCommitHash] = useState("Loading...");
    const [commitDate, setCommitDate] = useState("Loading...");

    useEffect(() => {
        // Fetch the latest commit details from GitHub
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
        <div>
            <main>
                <h1>
                    <span style={{ fontSize: "40px" }}> Hiiiiii! I'm</span>
                    <br />
                    <span className="gradient-text">Ka Thas</span>
                </h1>

                <p>
                    A robotics and machine learning student @ Institute of
                    Informatics at the University of Oslo. Please have a look
                    around my personal nook of the internet. <br />
                </p>
                <ul>
                    <li>
                        <Link href="./contact/">&gt; Contact</Link>
                    </li>
                    <li>
                        <Link href="./projects/">&gt; Projects</Link>
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
        </div>
    );
}

export default IndexPage;