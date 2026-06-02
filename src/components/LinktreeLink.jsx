import React from "react";

function LinktreeLink({ href, icon, text, className = "" }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-start w-[80vw] max-w-[400px] text-[larger] h-fit bg-[rgba(72,113,93,0.485)] text-white rounded-lg cursor-pointer mb-[15px] p-[15px] transition-colors duration-100 hover:bg-[rgb(27,111,61)] shadow-[0px_1.2px_2.2px_rgba(0,0,0,0.028),0px_3px_5.3px_rgba(0,0,0,0.035),0px_5.6px_10px_rgba(0,0,0,0.038),0px_10.1px_17.9px_rgba(0,0,0,0.041),0px_18.8px_33.4px_rgba(0,0,0,0.047),0px_45px_80px_rgba(0,0,0,0.07)] ${className}`}
        >
            {icon}
            <span className="grow text-center"> {text} </span>
        </a>
    );
}

export default LinktreeLink;
