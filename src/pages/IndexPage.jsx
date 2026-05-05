import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/index.css";
import Footer from "../components/footer";
import KaCaptcha from "../components/KaCaptcha";
import kaThasTitle from "../assets/images/ka-thas-title.png";

function IndexPage() {
         fetch("https://api.github.com/repos/ka-thas/react.kathas.no/commits/main")
                .then((response) => response.json())
                .then((data) => {
                    const commitDate = new Date(data.commit.author.date);
                    const formattedDate = `${commitDate.getDate().toString().padStart(2, '0')}-${(commitDate.getMonth() + 1).toString().padStart(2, '0')}-${commitDate.getFullYear()}`;
                    document.getElementById("commit-hash").textContent =
                        data.sha.substring(0, 7);
                    document.getElementById("commit-date").textContent = formattedDate;
                })
                .catch((error) =>
                    console.error("Error fetching commit:", error)
                );
    return (
        <>
            <main className="max-w-2xl w-full mx-auto flex flex-col items-start justify-center min-h-screen p-8 gap-5">
                <img src={kaThasTitle} alt="Ka Thas" className="w-full max-w-md mx-auto object-contain md:object-cover" />
                <p>
                    Hey, and welcome to my personal nook of the internet! Here you can find info about my projects, interests, and
                    how to contact me. I am currently doing my master's at UiO in robotics and machine learning.
                </p>

                <p className="text-white/60">
                    This website was updated <span id="commit-date"></span>: <a href="https://github.com/ka-thas/react.kathas.no" target="_blank">
                    <span id="commit-hash">Loading...</span> </a>    
                </p>
                {/* 
                <KaCaptcha /> 🚧 Going to replace pictures in the captcha 🚧*/}
            </main>
            <Footer />
        </>
    );
}

export default IndexPage;
