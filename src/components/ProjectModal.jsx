import { useEffect } from "react";

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
    demo: "bg-[rgba(0,255,128,0.15)] text-[#00ff80] border border-[rgba(0,255,128,0.35)]",
    repo: "bg-white/8 text-white border border-white/20",
};

function ProjectModal({ project, onClose }) {
    useEffect(() => {
        if (!project) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [project, onClose]);

    if (!project) return null;

    const paragraphs = project.description.split("\n\n");

    return (
        <div
            className="fixed inset-0 bg-black/72 flex items-center justify-center z-[100] p-4 backdrop-blur-[4px]"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
        >
            <div
                className="bg-[linear-gradient(160deg,#1e3d2b,#1a3020)] border border-white/10 rounded-[14px] max-w-[620px] w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-[0.9rem] right-[0.9rem] bg-white/8 border-none text-white text-[1.4rem] cursor-pointer leading-none py-[0.2rem] px-[0.55rem] rounded-md transition-[background] duration-150 hover:bg-white/18"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <h2 className="text-[1.6rem] font-bold mt-0 mb-4 p-0 border-b border-white/15 pb-[0.6rem]">
                    {project.title}
                </h2>
                {project.imgSrc && (
                    <img
                        src={project.imgSrc}
                        alt={project.imgAlt}
                        className="w-full h-auto max-h-[280px] object-contain rounded-lg mb-4 bg-black/20"
                    />
                )}
                <div className="mb-6 leading-[1.65] opacity-[0.92] [&_p+p]:mt-3">
                    {paragraphs.map((p, i) => (
                        <p key={`${project.id}-p${i}`}>{p}</p>
                    ))}
                </div>
                {project.links && project.links.length > 0 && (
                    <div className="flex gap-3 flex-wrap">
                        {project.links.map((link) => (
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
                )}
            </div>
        </div>
    );
}

export default ProjectModal;
