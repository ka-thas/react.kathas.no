function ProjectCard({ project, onClick }) {
    return (
        <button
            className="project-card"
            onClick={onClick}
            aria-label={`View details for ${project.title}`}
        >
            <div className="project-card-image-wrapper">
                {project.imgSrc ? (
                    <img
                        src={project.imgSrc}
                        alt={project.imgAlt}
                        className="project-card-image"
                    />
                ) : (
                    <div className="project-card-placeholder" aria-hidden="true" />
                )}
            </div>
            <div className="project-card-footer">
                <h2>{project.title}</h2>
            </div>
        </button>
    );
}

export default ProjectCard;
