import { useEffect } from "react";
import { Link } from "react-router-dom";
import { md } from "./mdComponents.jsx";
import ProjectLinks from "./ProjectLinks.jsx";

// In the pop-up the note's images are sized to fit (the first one is the preview).
const modalMd = {
    ...md,
    p: (p) => <p className="mb-3 leading-[1.65] opacity-[0.92]" {...p} />,
    img: (p) => <img className="w-full h-auto max-h-[280px] object-contain rounded-lg mb-4 bg-ink/5" {...p} />,
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

    return (
        <div
            className="fixed inset-0 bg-black/72 flex items-center justify-center z-[100] p-4 backdrop-blur-[4px]"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
        >
            <div
                className="bg-paper border border-ink/10 rounded-[14px] max-w-[620px] w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-[0.9rem] right-[0.9rem] bg-ink/6 border-none text-ink text-[1.4rem] cursor-pointer leading-none py-[0.2rem] px-[0.55rem] rounded-md transition-[background] duration-150 hover:bg-ink/12"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <h2 className="text-[1.6rem] font-bold mt-0 mb-4 p-0 border-b border-ink/10 pb-[0.6rem]">
                    {project.title}
                </h2>
                <div className="mb-6">
                    <project.Content components={modalMd} />
                </div>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <ProjectLinks links={project.links} />
                    <Link
                        to={`/projects/${project.id}`}
                        className="text-sm text-ink/55 no-underline hover:text-accent-green transition-colors duration-150"
                    >
                        Open page →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;
