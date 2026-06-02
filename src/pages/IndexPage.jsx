import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/index.css";
import Footer from "../components/footer";
import KaCaptcha from "../components/KaCaptcha";
import KaThasTitle from "../components/KaThasTitle";
import StickerCluster from "../components/StickerCluster";
import Portrait from "../components/Portrait";
import CommitInfo from "../components/CommitInfo";

function IndexPage() {
  return (
    <>
      <main className="max-w-2xl w-full mx-auto flex flex-col items-center justify-center p-8 pt-15 gap-15">
          <KaThasTitle />

          <div className="flex flex-col sm:flex-row items-start gap-5 w-full">
            <Portrait to="/blog/photos" />
            <div className="flex flex-col gap-4">
              <p className="text-left">
                Welcome to my personal nook of the internet! Here you'll find my
                projects, interests, and some contact information. I am a
                master's student at UiO in robotics and machine learning.
              </p>
            </div>
          </div>
        <StickerCluster />

        <p>
          Here's a quick read about{" "}
          <Link to="/blog/my-masters-thesis" className="text-[#00ff80]">
            my masters thesis
          </Link>
          . The essence is an VLM guided Evolutionary Algorithm. Also, I'll be
          writing from japan 🇯🇵
        </p>

        {/*
        <div className="flex flex-col items-center w-full mt-9">
          <KaCaptcha />
          <div>
            This will unlock something
            <span className="text-[0.62rem] font-bold tracking-[0.04em] uppercase bg-[rgba(239,255,120,0.18)] text-[#efff78] border border-[rgba(239,255,120,0.35)] rounded py-px px-[5px] leading-[1.4] ml-2">
              soon
            </span>
          </div>
        </div>
 */}
      </main>
      <div className="flex flex-col items-center gap-0">

            <Footer />
            <CommitInfo />
      </div>
    </>
  );
}

export default IndexPage;
