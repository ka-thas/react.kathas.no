import React from "react";

function LinktreeLink({href, icon,text, className = ""}) {
    return (
        <a
            href={href}
            target="_blank"
            className={`icon-button shadow ${className}`}
        >
            {icon}
                
            <span class="link-text"> {text} </span>
        </a>
    );
}

export default LinktreeLink;
