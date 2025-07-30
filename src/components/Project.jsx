import React from "react";

function Project({id, title, children, imgSrc, imgAlt, imgProps, links}) {
    return (
        <section id={id} className="project">
            <h2>{title}</h2>
            <p>{children}</p>
            {imgSrc && (
                <img
                    src={imgSrc}
                    alt={imgAlt}
                    {...imgProps}
                    className={`shadow ${imgProps?.className || ""}`}
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