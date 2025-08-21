import React from "react";

function LinktreeLink({href, icon,text, className = ""}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`icon-button shadow ${className}`}
        >
            {icon}
                
            <span class="link-text">  </span>
        </a>
    );
}

export default LinktreeLink;
