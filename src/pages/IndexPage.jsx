import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/index.css";
import Footer from "../components/footer";
import KaCaptcha from "../components/KaCaptcha";
import KaThasTitle from "../components/KaThasTitle";

function IndexPage() {
  fetch("https://api.github.com/repos/ka-thas/react.kathas.no/commits/main")
    .then((response) => response.json())
    .then((data) => {
      const commitDate = new Date(data.commit.author.date);
      const formattedDate = `${commitDate.getDate().toString().padStart(2, "0")}-${(commitDate.getMonth() + 1).toString().padStart(2, "0")}-${commitDate.getFullYear()}`;
      document.getElementById("commit-hash").textContent = data.sha.substring(
        0,
        7,
      );
      document.getElementById("commit-date").textContent = formattedDate;
    })
    .catch((error) => console.error("Error fetching commit:", error));
  return (
    <>
      <main className="max-w-2xl w-full mx-auto flex flex-col items-start justify-center min-h-screen p-8 gap-5">
        <KaThasTitle />
        <p>
          Hey, and welcome to my personal nook of the internet! Here you can
          find info about my projects, interests, and how to contact me. I am
          currently doing my master's at UiO in robotics and machine learning.
        </p>
        <p className="text-white/60">
          This website was updated <span id="commit-date"></span>:{" "}
          <a href="https://github.com/ka-thas/react.kathas.no" target="_blank">
            <span id="commit-hash">Loading...</span>{" "}
          </a>
        </p>
        <div className="flex flex-col items-center w-full mt-9 hidden">
          <KaCaptcha />
          <div>
            This will unlock something
            <span className="text-[0.62rem] font-bold tracking-[0.04em] uppercase bg-[rgba(239,255,120,0.18)] text-[#efff78] border border-[rgba(239,255,120,0.35)] rounded py-px px-[5px] leading-[1.4] ml-2">
              soon
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default IndexPage;
