import React, { useEffect, useState } from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';

export default function Team() {
    const [shuffledMembers, setShuffledMembers] = useState([]);

    const teamMembers = [
        {
            name: "Shahil Afroz",
            role: "Web Team",
            imageUrl: "p1.jpg",
            linkedin: "https://www.linkedin.com/in/shahil-afroz/",
            Github: "https://github.com/shahil-afroz"
        },
        {
            name: "Surajit Maity",
            role: "Web Team",
            imageUrl: "p2.jpg",
            linkedin: "https://www.linkedin.com/in/surajit-maity23/",
            Github: "https://github.com/Surajit0573"
        },
        {
            name: "Saikat Bera",
            role: "Web Team Lead",
            imageUrl: "p3.jpg",
            linkedin: "https://www.linkedin.com/in/saikat-bera-29a9b5250/",
            Github: "https://github.com/Saikat123Dev"
        },
        {
            name: "Akash Saha",
            role: "Web Team",
            imageUrl: "p4.jpg",
            linkedin: "https://www.linkedin.com/in/akash-saha-731440257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            Github: "https://github.com/Akash4701"
        },
        {
            name: "Niggadev Sardar",
            role: "Web Team",
            imageUrl: "p5.jpg",
            linkedin: "https://www.linkedin.com/in/bishnudev-sardar-047b83256/",
            Github: "https://github.com/bishnudev35"
        },
        {
            name: "Urnisha Paul",
            role: " Outreach Team",
            imageUrl: "p6.jpg",
            linkedin: "https://www.linkedin.com/in/urnisha-paul-277689254/",
            Github: "https://github.com/flawed-hooman"
        },
        {
            name: "Atanu Basak ",
            role: "Lead",
            imageUrl: "p7.jpg",
            linkedin: "https://linkedin.com/in/michael-chen",
            Github: "https://twitter.com/michaelchen"
        },
        {
            name: "Michael Chen",
            role: "Product Designer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/michael-chen",
            Github: "https://twitter.com/michaelchen"
        },
        {
            name: "Michael Chen",
            role: "Product Designer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/michael-chen",
            Github: "https://twitter.com/michaelchen"
        },
        {
            name: "Michael Chen",
            role: "Product Designer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/michael-chen",
            Github: "https://twitter.com/michaelchen"
        },
        {
            name: "Michael Chen",
            role: "Product Designer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/michael-chen",
            Github: "https://twitter.com/michaelchen"
        },
    ];

    useEffect(() => {
        const shuffleArray = (array) => {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        };

        // Separate lead and non-lead members
        const leadMember = teamMembers.find(member => member.role === "Lead");
        const nonLeadMembers = teamMembers.filter(member => member.role !== "Lead");
        
        // Shuffle only non-lead members and combine with lead
        const shuffledNonLead = shuffleArray(nonLeadMembers);
        setShuffledMembers([leadMember, ...shuffledNonLead]);
    }, []);

    return (
        <div className="my-12 md:my-24 flex flex-col">
            {/* Top section with fixed circles - Hide on mobile */}
            <div className="flex-col relative flex gap-y-3 items-center justify-center h-30 mt-5">
                <div className="hidden md:flex fixed right-[150vh] top-[80vh]">
                    <div className="rounded-full opacity-20 bg-cyan-600 h-[15vh] w-[15vh]"></div>
                    <div className="rounded-full opacity-20 bg-cyan-400  h-[24vh] w-[24vh]"></div>
                </div>
                <div
                    className="hidden md:block w-60 h-60 bg-cyan-600 opacity-20 fixed top-[14vh] right-[170vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(25deg)'
                    }}
                ></div>
                <div
                    className="hidden md:block w-32 h-32 bg-cyan-400 opacity-20 fixed top-[25vh] right-[155vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(80deg)'
                    }}
                ></div>
                <div className="relative text-center md:text-left px-4 md:px-0">
                    <p style={{fontFamily:"Jersey,sans-serif"}} className="text-lg md:text-2xl xl:text-3xl md:ml-32 xl:pt-2 font-bold text-cyan-500 glow-subtext mt-2">
                        MEET OUR AWESOME
                    </p>
                    <h1 className="text-transperent text-4xl md:text-5xl xl:text-6xl relative font-extrabold font-rubik  text-white text-glow md:ml-10">
                        ORGANIZERS
                    </h1>
                </div>
                <div className="hidden md:flex fixed left-[140vh]">
                    <div className="rounded-full opacity-20 bg-cyan-600 h-[24vh] w-[24vh]"></div>
                    <div className="rounded-full opacity-20 bg-cyan-400 h-[15vh] w-[15vh]"></div>
                </div>
            </div>

            {/* Cards grid with higher z-index */}
            <div className="flex flex-col h-auto relative min-h-screen mx-4 md:ml-[27vh] mt-9 w-auto md:w-3/4  justify-center py-8 md:py-12 z-10">
                <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-16 px-2 md:px-8">
                    {shuffledMembers.map((member, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden bg-gradient-to-br border border-gray-200
                                 transform hover:scale-105 transition-transform duration-300
                                 shadow-lg hover:shadow-2xl rounded-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                            <img
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-full h-48 object-crop rounded-t-xl"
                            />
                            <div className="p-4 md:p-5 flex flex-col justify-center items-center relative bg-white rounded-b-xl">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                                <div className="text-gray-800 text-sm md:text-base mb-3 md:mb-4 p-2 border border-gray-300 rounded-md bg-cyan-100 font-bold">{member.role}</div>
                                <div className="flex space-x-4 pt-1 md:pt-2">
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-800 hover:text-indigo-600 transition-colors duration-300"
                                    >
                                        <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                                    </a>
                                    <a
                                        href={member.twitter || member.Github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-800 hover:text-indigo-600 transition-colors duration-300"
                                    >
                                        <Github className="w-5 h-5 md:w-6 md:h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom stars with lower z-index - Hide on mobile */}
            <div className="hidden md:block pointer-events-none" style={{ zIndex: -1 }}>
                <div
                    className="w-40 h-40 bg-cyan-400 opacity-10 fixed bottom-[20vh] right-[16vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(25deg)'
                    }}
                ></div>
                <div
                    className="w-32 h-32 bg-cyan-300 opacity-10 fixed bottom-[11vh] right-[8vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(80deg)'
                    }}
                ></div>
            </div>
        </div>
    );
}