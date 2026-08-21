import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import Footer from "../components/footer";
import KaCaptcha from "../components/KaCaptcha";
import KaThasTitle from "../components/KaThasTitle";
import StickerCluster from "../components/StickerCluster";
import Portrait from "../components/Portrait";
import CommitInfo from "../components/CommitInfo";
import VisitorButton from "../components/VisitorButton";
import PostCard from "../components/PostCard";
import ProjectModal from "../components/ProjectModal";
import { posts, isNew } from "../lib/posts";
import { projectsData } from "./ProjectsPage";

function IndexPage() {
  const recentPosts = posts.slice(0, 3);
  const latestProject = projectsData[0];
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <main className="max-w-2xl md:max-w-7xl w-full mx-auto flex flex-col items-center justify-center p-8 pt-15 mb-6 gap-15">
        <div className="w-full flex flex-col md:flex-row gap-x-12 gap-y-15 items-start">
          <div className="flex flex-col gap-15 w-full md:basis-1/2">
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

            <div className="md:hidden">
              <StickerCluster />
            </div>

            <div className="flex flex-col items-center md:items-start gap-2">
              <VisitorButton />
            </div>

            <p>
              Here's a quick read about{" "}
              <Link to="/blog/my-masters-thesis" className="text-[#00ff80]">
                my master's thesis
              </Link>
              . The essence is a VLM guided Evolutionary Algorithm. Also, I'll be
              writing from Japan 🇯🇵
            </p>
          </div>

          <div className="hidden md:flex flex-col gap-15 w-full md:basis-[55%]">
            <StickerCluster />

            {latestProject && (
              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between w-full">
                  <h2 className="m-0">Latest project</h2>
                  <Link
                    to="/projects"
                    className="text-[#00ff80] text-sm no-underline hover:underline"
                  >
                    see all projects →
                  </Link>
                </div>
                <button
                  onClick={() => setSelectedProject(latestProject)}
                  className="cursor-pointer flex flex-col sm:flex-row items-stretch gap-4 rounded-xl bg-[rgba(150,200,150,0.1)] border border-white/8 p-4 text-left text-inherit transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-[rgba(0,255,128,0.3)]"
                >
                  <div className="w-full sm:w-52 aspect-video shrink-0 overflow-hidden rounded-lg bg-black/25">
                    {latestProject.imgSrc && (
                      <img
                        src={latestProject.imgSrc}
                        alt={latestProject.imgAlt}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <h3 className="inline-flex items-center gap-2 text-[1.1rem] font-bold m-0 p-0 border-none text-white leading-snug">
                      {latestProject.title}
                      {isNew(latestProject.date) && (
                        <span className="text-[0.62rem] font-bold tracking-[0.04em] uppercase bg-[rgba(0,255,128,0.18)] text-[#00ff80] border border-[rgba(0,255,128,0.35)] rounded py-px px-[5px] leading-[1.4]">
                          new
                        </span>
                      )}
                    </h3>
                    <p className="text-[0.93rem] opacity-75 m-0 leading-snug">
                      {latestProject.description}
                    </p>
                  </div>
                </button>
              </div>
            )}

            {recentPosts.length > 0 && (
              <div className="flex flex-col gap-4 w-full">
                <h2 className="m-0">Recent Posts</h2>
                <div className="grid grid-cols-3 gap-4 w-full">
                  {recentPosts.map((post) => (
                    <PostCard key={post.slug} {...post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full md:hidden">
          {recentPosts.length > 0 && (
            <div className="flex flex-col items-center gap-4 w-full">
              <h2>Recent Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {recentPosts.map((post) => (
                  <PostCard key={post.slug} {...post} />
                ))}
              </div>
            </div>
          )}
        </div>

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
      <div className="flex flex-col items-center gap-0 bg-[#243] w-full">

            <Footer />
            <CommitInfo />
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

export default IndexPage;
