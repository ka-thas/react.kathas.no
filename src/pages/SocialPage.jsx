// Link hub for all my social media links and more

import React from "react";
import "../styles/global.css";
// import bannerImg from "/assets/images/banner.jpeg";
import Footer from "../components/Footer.jsx";
import LinktreeLink from "../components/LinktreeLink";
import KaThasTitle from "../components/KaThasTitle.jsx";
import Marquee from "../components/Marquee.jsx";
import Portrait from "../components/Portrait.jsx";
import {
  snapchatIcon,
  instagramIcon,
  facebookIcon,
  discordIcon,
  linkedinIcon,
  lineIcon,
  whatsappIcon,
  githubIcon,
  steamIcon,
  spotifyIcon
} from "../assets/socialIcons.jsx";

function SocialPage() {
  return (
    <>
      <Marquee
        text="Hello · வணக்கம் · Hei · 안녕하세요 · Hola · こんにちは · Bonjour · Zdravo · Ciao ·"
        speed={50}
        gap=".3rem"
        className="py-2 opacity-60 text-sm"
      />
      {/* <img src={bannerImg} alt="banner image" className="banner" /> */}
      <main className="flex flex-col justify-flex-start items-center p-8 gap-2 z-10">
        <Portrait
          className="w-32 h-32 rounded-full border-2 border-white shadow-[rgba(6,10,17,0.2)_0px_8px_24px] z-[1]"
          to="/blog/photos"
        />
        <KaThasTitle className="mb-5" />
        <p className="text-center max-w-[500px] mb-6 ">
          Hi, I'm Ka from Oslo 🇳🇴 <br />
          I like Sketching ✏️ Plants 🪴 and Coffee ☕ <br />
          Always happy to chat ~
        </p>
        <div className="flex flex-col items-center">
          <LinktreeLink
            href="https://www.instagram.com/ka.thas"
            icon={instagramIcon}
            text="Instagram"
          />
          <LinktreeLink
            href="https://www.snapchat.com/add/ka.thas"
            icon={snapchatIcon}
            text="Snapchat"
          />
          <LinktreeLink
            href="https://line.me/ti/p/FdS7gcPgSS"
            icon={lineIcon}
            text="LINE"
          />
          <LinktreeLink
            href="https://wa.me/4746663530"
            icon={whatsappIcon}
            text="WhatsApp"
          />
          <LinktreeLink
            href="https://discordapp.com/users/286421509059248128"
            icon={discordIcon}
            text="Discord"
          />
          <LinktreeLink
            href="https://www.facebook.com/kaaathas"
            icon={facebookIcon}
            text="Facebook"
          />
          <LinktreeLink
            href="https://www.linkedin.com/in/ka-thas"
            icon={linkedinIcon}
            text="LinkedIn"
          />
          <LinktreeLink
            href="https://github.com/ka-thas"
            icon={githubIcon}
            text="GitHub"
          />
          <LinktreeLink
            href="https://steamcommunity.com/id/pinesprout"
            icon={steamIcon}
            text="Steam"
          />
          <LinktreeLink
            href="https://open.spotify.com/user/kavinthas"
            icon={spotifyIcon}
            text="Spotify"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SocialPage;
