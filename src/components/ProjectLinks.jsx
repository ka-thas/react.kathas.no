const githubIcon = (
    <svg className="w-[1em] h-[1em] fill-current shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .3a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.82 2.82 1.3 3.51.99.11-.77.42-1.3.76-1.6-2.66-.3-5.46-1.34-5.46-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.52 11.52 0 016 0c2.28-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.9 1.24 3.22 0 4.62-2.8 5.64-5.47 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0012 .3" />
    </svg>
);

const externalLinkIcon = (
    <svg className="w-[1em] h-[1em] fill-current shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const linkVariants = {
    demo: "bg-accent-green/15 text-accent-green border border-accent-green/35",
    repo: "bg-ink/6 text-ink border border-ink/20",
};

// "Try it" / "GitHub" buttons for a project (from its note's demo/repo properties).
function ProjectLinks({ links }) {
    if (!links?.length) return null;
    return (
        <div className="flex gap-3 flex-wrap">
            {links.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-[0.45rem] py-[0.45rem] px-4 rounded-lg font-semibold text-[0.95rem] no-underline transition-opacity duration-150 hover:opacity-[0.82] ${linkVariants[link.type] ?? ""}`}
                >
                    {link.type === "repo" ? githubIcon : externalLinkIcon}
                    {link.text}
                </a>
            ))}
        </div>
    );
}

export default ProjectLinks;
