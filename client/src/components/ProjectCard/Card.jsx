import { Github, Link as LinkIcon, User } from "lucide-react";

const Card = ({ data }) => {
    const truncateText = (text, maxLength = 150) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <div
            className="card m-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
                width: '400px',
                minHeight: '350px',
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                color: 'white'
            }}
        >
            <div className="card-content">
                <h2 className="text-2xl font-bold mb-4">
                    {data.projectName}
                </h2>

                <div className="flex items-center mb-4 opacity-80">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                        {data.projectOwner?.name || "Anonymous"}
                    </span>
                </div>

                {data.projectMentors && data.projectMentors.length > 0 && (
                    <div className="mb-4">
                        <span className="opacity-80 font-semibold mr-2 text-sm">
                            Co-Authors:
                        </span>
                        <span className="opacity-70 text-sm">
                            {data.projectMentors.map(mentor => mentor.name).join(", ")}
                        </span>
                    </div>
                )}

                <p className="opacity-70 mb-6 text-sm leading-relaxed">
                    {truncateText(data.projectDescription)}
                </p>

                <div className="mb-4">
                    <span className="opacity-80 font-semibold mr-2 text-sm">
                        Type:
                    </span>
                    <span className="opacity-70 text-sm">
                        {data.projectTypes}
                    </span>
                </div>

                {data.projectLink && (
                    <a
                        href={data.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center opacity-80 hover:opacity-100 transition-opacity mb-4 text-sm gap-2"
                    >
                        <LinkIcon className="w-4 h-4" />
                        View Project
                    </a>
                )}

                {data.GitHubLink && (
                    <a
                        href={data.GitHubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center opacity-80 hover:opacity-100 transition-opacity mb-4 text-sm gap-2 ml-4"
                    >
                        <Github className="w-4 h-4" />
                        GitHub Repo
                    </a>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                    {data.projectTags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-white/10 rounded-full text-xs border border-white/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;
