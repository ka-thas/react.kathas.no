import React from "react";
import "../styles/global.css";
import "../styles/social.css";

function SocialPage() {
    return (
        <div>
            <p id="notification" className="shadow">
                Copied!
            </p>
            <main>
                <img
                    src="./assets/images/pfp.png"
                    alt="profile picture"
                    width="200px"
                    height="200px"
                    style={{ borderRadius: "50%", maxHeight: "12em" }}
                />
                <h1>
                    <span className="gradient-text nerko-one-regular">Ka Thas</span>
                </h1>
                <p>
                    Hi 👋 I'm Ka from Oslo, Norway 🇳🇴 I like sketching ✏️ and taking
                    care of plants 🪴<br />
                    Let's connect 💚
                </p>

                <div id="link-container">
                    <a
                        href="https://www.instagram.com/kaaathas/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button shadow"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                            />
                        </svg>
                        <span className="link-text"> Instagram </span>
                    </a>
                    <a
                        href="https://www.facebook.com/kaaathas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button shadow"
                    >
                        <svg
                            enableBackground="new 0 0 56.693 56.693"
                            height="56.693px"
                            viewBox="0 0 56.693 56.693"
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M40.43,21.739h-7.645v-5.014c0-1.883,1.248-2.322,2.127-2.322c0.877,0,5.395,0,5.395,0V6.125l-7.43-0.029  c-8.248,0-10.125,6.174-10.125,10.125v5.518h-4.77v8.53h4.77c0,10.947,0,24.137,0,24.137h10.033c0,0,0-13.32,0-24.137h6.77  L40.43,21.739z"
                            />
                        </svg>
                        <span className="link-text"> Facebook </span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/ka-thas-6823a9293/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button shadow"
                    >
                        <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.09 20.47H3.56V9h3.53v11.47zM5.32 7.51c-1.14 0-2.06-.93-2.06-2.07 0-1.14.93-2.07 2.06-2.07s2.06.93 2.06 2.07c0 1.14-.93 2.07-2.06 2.07zM20.45 20.47h-3.53v-5.89c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.11v5.98H9.18V9h3.39v1.56h.05c.47-.89 1.61-1.83 3.31-1.83 3.54 0 4.19 2.33 4.19 5.36v6.38z"
                            />
                        </svg>
                        <span className="link-text"> LinkedIn </span>
                    </a>
                    <a
                        href="https://github.com/ka-thas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button shadow"
                    >
                        <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 .3a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.82 2.82 1.3 3.51.99.11-.77.42-1.3.76-1.6-2.66-.3-5.46-1.34-5.46-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.52 11.52 0 016 0c2.28-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.9 1.24 3.22 0 4.62-2.8 5.64-5.47 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0012 .3"
                            />
                        </svg>
                        <span className="link-text"> GitHub </span>
                    </a>
                </div>
                🌱
            </main>
        </div>
    );
}

export default SocialPage;