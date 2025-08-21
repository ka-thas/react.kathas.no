import React from "react";

function IconLink({href, icon, className = ""}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${className}`}
        >
            {icon}
        </a>
    );
}

export default IconLink;
