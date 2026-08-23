import React from "react";

function LinktreeLink({ href, icon, text, className = "" }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-start w-[80vw] max-w-[400px] text-[larger] h-fit bg-[rgba(150,200,150,0.1)] border border-black/10 text-black rounded-lg cursor-pointer mb-[15px] p-[15px] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:border-accent-green/40 ${className}`}
        >
            {icon}
            <span className="grow text-center"> {text} </span>
        </a>
    );
}

export default LinktreeLink;
