import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/index.css";
import IconLink from "../components/IconLink";


function IndexPage() {
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
                        <Link to="/contact">&gt; Contact</Link>
                    </li>
                    <li>
                        <Link to="/social">&gt; Socials</Link>
                    </li>
                </ul>
                <p>
                    <IconLink 
                        href="https://github.com/ka-thas"
                        icon={
                            <svg
                            className="icon inline w-3 h-3 ml-2 mb-1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            >
                            <path d="M12 .3a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.82 2.82 1.3 3.51.99.11-.77.42-1.3.76-1.6-2.66-.3-5.46-1.34-5.46-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.52 11.52 0 016 0c2.28-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.9 1.24 3.22 0 4.62-2.8 5.64-5.47 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0012 .3" />
                        </svg>}
                    />
                    </p>

            </main>
        </>
    );
}

export default IndexPage;
