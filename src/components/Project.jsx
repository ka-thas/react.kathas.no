import React from "react";

function Project({id, title, children, imgSrc, imgAlt, imgProps, links}) {
    return (
        <section
            id={id}
            className="project max-w-2xl w-full p-4 shadow-lg rounded-lg"
            style={{background: "rgba(255, 255, 255, 0.1)"}}
        >
            <h2 className="font-bold text-3xl">{title}</h2>
            {children}
            {imgSrc && (
                <img
                    src={imgSrc}
                    alt={imgAlt}
                    {...imgProps}
                    className={`h-auto object-contain max-h-[300px] max-w-lg mx-auto ${imgProps?.className || ""}`}
                />
            )}
            {links && links.map((link, i) => (
                <p key={i}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.text}
                    </a>
                </p>
            ))}
        </section>
    );
}

export default Project;