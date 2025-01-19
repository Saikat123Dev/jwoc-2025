import React, { useEffect, useState } from 'react';
import { Linkedin, Github } from 'lucide-react';
import { CardSpotlight } from "@/components/ui/card-spotlight";

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
            linkedin: "https://www.linkedin.com/in/akash-saha-731440257",
            Github: "https://github.com/Akash4701"
        },
        {
            name: "Bishnudev Sardar",
            role: "Web Team",
            imageUrl: "p5.jpg",
            linkedin: "https://www.linkedin.com/in/bishnudev-sardar-047b83256/",
            Github: "https://github.com/bishnudev35"
        },
        {
            name: "Urnisha Paul",
            role: "Outreach Team",
            imageUrl: "p6.jpg",
            linkedin: "https://www.linkedin.com/in/urnisha-paul-277689254/",
            Github: "https://github.com/flawed-hooman"
        },
        {
            name: "Atanu Basak",
            role: "Lead",
            imageUrl: "p7.jpg",
            linkedin: "https://linkedin.com/in/michael-chen",
            Github: "https://twitter.com/michaelchen"
        },
        {
            name: "Suman Chakraborty",
            role: "Sponsor Team",
            imageUrl: "p8.jpg",
            linkedin: "https://www.linkedin.com/in/suman-chakraborty-99660a203",
        },
        {
            name: "Sama Asif Laskar",
            role: "Sponsor Team",
            imageUrl: "p9.jpg",
            linkedin: "https://www.linkedin.com/in/sama-ashif-laskar-95669b258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        },
        {
            name: "Aneek Karmakar",
            role: " Graphics Design",
            imageUrl: "p10.jpg",
            linkedin: "https://www.linkedin.com/in/aneek-karmakar-3a578025b/",
        },
        {
            name: "Anirban Roy",
            role: "Outreach Team",
            imageUrl: "p11.jpg",
            linkedin: "https://www.linkedin.com/in/anirban-roy-694a15255/",
            Github: "https://github.com/duceboi"
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

        const leadMember = teamMembers.find(member => member.role === "Lead");
        const nonLeadMembers = teamMembers.filter(member => member.role !== "Lead");
        const shuffledNonLead = shuffleArray(nonLeadMembers);
        setShuffledMembers([leadMember, ...shuffledNonLead]);
    }, []);

    return (
        <div className="my-8 sm:my-12 md:my-24 flex flex-col">
            <div className="flex-col relative flex gap-y-3 items-center justify-center h-30 mt-1">
                <div className="hidden md:flex fixed right-[150vh] top-[80vh]">
                    <div className="rounded-full opacity-20 bg-cyan-600 h-[15vh] w-[15vh]"></div>
                    <div className="rounded-full opacity-20 bg-cyan-400 h-[24vh] w-[24vh]"></div>
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
                <div className="relative text-center px-4 sm:px-0">
                    <p style={{fontFamily:"Jersey,sans-serif"}} className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-cyan-500 glow-subtext mt-2">
                        MEET OUR AWESOME
                    </p>
                    <h1 className="text-transperent text-3xl sm:text-4xl md:text-5xl xl:text-6xl relative font-extrabold font-rubik text-white text-glow">
                        ORGANIZERS
                    </h1>
                </div>
                <div className="hidden md:flex fixed left-[140vh]">
                    <div className="rounded-full opacity-20 bg-cyan-600 h-[24vh] w-[24vh]"></div>
                    <div className="rounded-full opacity-20 bg-cyan-400 h-[15vh] w-[15vh]"></div>
                </div>
            </div>

            <div className="flex flex-col h-auto relative min-h-screen px-4 sm:px-8 lg:px-16 mt-9 w-auto justify-center py-8 sm:py-12 z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
                    {shuffledMembers.map((member, index) => (
                        <CardSpotlight key={index} className="w-full max-w-[260px] sm:w-[260px] h-[380px] rounded-3xl">
                            <div className="relative z-20 flex flex-col items-center w-full h-full">
                                <div className="relative w-full h-[200px]">
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                </div>
                                
                                <div className="flex flex-col items-center justify-center p-3 w-full flex-grow">
                                    <div className="w-full text-center mb-2">
                                        <h3 className="text-lg font-bold text-white truncate px-1">
                                            {member.name}
                                        </h3>
                                    </div>
                                    <div className="w-full text-sm bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full mb-3">
                                        <span className="block text-center truncate">
                                            {member.role}
                                        </span>
                                    </div>
                                    <div className="flex space-x-4 mt-auto">
                                        {member.linkedin && (
                                            <a
                                                href={member.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        {member.Github && (
                                            <a
                                                href={member.Github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardSpotlight>
                    ))}
                </div>
            </div>

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