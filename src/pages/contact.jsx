import React, { useState } from "react";
import "../styles/global.css";
import "../styles/contact.css";
import pfp from "/assets/images/pfp.png";

function Contact() {
    const [notificationVisible, setNotificationVisible] = useState(false);

    const handleCopyEmail = () => {
        const email = "kavinthas@gmail.com";

        // Copy the email to the clipboard
        navigator.clipboard
            .writeText(email)
            .then(() => {
                console.log("Email copied to clipboard");
                setNotificationVisible(true);
                setTimeout(() => {
                    setNotificationVisible(false);
                }, 2000);
            })
            .catch((err) => {
                console.error("Failed to copy email: ", err); // Handle errors
            });
    };

    return (
        <>
            <p
                id="notification"
                style={{
                    opacity: notificationVisible ? 1 : 0,
                    transition: "opacity 0.5s ease",
                }}
            >
                Copied!
            </p>
            <main>
                <img
                    src={pfp}
                    alt="profile picture"
                    width="120px"
                    height="120px"
                    className="profile-picture"
                />
                <h1>
                    <span className="gradient-text">Ka Thas</span>
                </h1>

                <p>Robotics and Machine Learning student at UiO</p>
                <p>
                    kavinthas@gmail.com <br />
                    +47 46 66 35 30
                </p>

                <div id="buttons">
                    <button
                        id="copyEmailButton"
                        className="icon-button"
                        onClick={handleCopyEmail}
                    >
                        <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 6L12 11L4 6H20ZM4 18V8L12 13L20 8V18H4Z" />
                        </svg>
                    </button>
                    <a
                        href="https://github.com/ka-thas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                    >
                        <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 .3a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.82 2.82 1.3 3.51.99.11-.77.42-1.3.76-1.6-2.66-.3-5.46-1.34-5.46-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.52 11.52 0 016 0c2.28-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.9 1.24 3.22 0 4.62-2.8 5.64-5.47 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0012 .3" />
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/ka-thas-6823a9293/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                    >
                        <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.09 20.47H3.56V9h3.53v11.47zM5.32 7.51c-1.14 0-2.06-.93-2.06-2.07 0-1.14.93-2.07 2.06-2.07s2.06.93 2.06 2.07c0 1.14-.93 2.07-2.06 2.07zM20.45 20.47h-3.53v-5.89c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.11v5.98H9.18V9h3.39v1.56h.05c.47-.89 1.61-1.83 3.31-1.83 3.54 0 4.19 2.33 4.19 5.36v6.38z" />
                        </svg>
                    </a>
                </div>
            </main>
        </>
    );
}

export default Contact;