function ProjectCard({ project, onClick }) {
    return (
        <button
            className="cursor-pointer rounded-[10px] overflow-hidden bg-[rgba(150,200,150,0.2)] border border-white/8 text-inherit text-left flex flex-col w-full p-0 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:border-[rgba(0,255,128,0.3)]"
            onClick={onClick}
            aria-label={`View details for ${project.title}`}
        >
            <div className="w-full aspect-video overflow-hidden bg-black/25 shrink-0">
                {project.imgSrc ? (
                    <img
                        src={project.imgSrc}
                        alt={project.imgAlt}
                        className="w-full h-full object-cover block"
                    />
                ) : (
                    <div
                        className="w-full h-full bg-gradient-to-br from-[rgba(0,255,128,0.08)] to-[rgba(239,255,120,0.08)]"
                        aria-hidden="true"
                    />
                )}
            </div>
            <div className="py-[0.6rem] px-[0.9rem]">
                <h2 className="text-base font-semibold m-0 border-none p-0 leading-[1.3]">
                    {project.title}
                </h2>
            </div>
        </button>
    );
}

export default ProjectCard;
