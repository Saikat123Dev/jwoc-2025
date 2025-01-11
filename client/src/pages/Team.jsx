import React, { useEffect, useState } from 'react';
import { Linkedin, Twitter } from 'lucide-react';

export default function Team() {
    const [shuffledMembers, setShuffledMembers] = useState([]);

    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "Software Engineer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/sarah-johnson",
            twitter: "https://twitter.com/sarahjohnson"
        },
        {
            name: "Michael Chen",
            role: "Product Designer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/michael-chen",
            twitter: "https://twitter.com/michaelchen"
        },
        {
            name: "Emma Davis",
            role: "Frontend Developer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/emma-davis",
            twitter: "https://twitter.com/emmadavis"
        },
        {
            name: "Alex Rivera",
            role: "UX Designer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/alex-rivera",
            twitter: "https://twitter.com/alexrivera"
        },
        {
            name: "Lisa Wang",
            role: "Backend Developer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/lisa-wang",
            twitter: "https://twitter.com/lisawang"
        },
        {
            name: "James Wilson",
            role: "System Architect",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/james-wilson",
            twitter: "https://twitter.com/jameswilson"
        },
        {
            name: "Rachel Kim",
            role: "Data Scientist",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/rachel-kim",
            twitter: "https://twitter.com/rachelkim"
        },
        {
            name: "David Patel",
            role: "DevOps Engineer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/david-patel",
            twitter: "https://twitter.com/davidpatel"
        },
        {
            name: "Sophie Martinez",
            role: "QA Engineer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/sophie-martinez",
            twitter: "https://twitter.com/sophiemartinez"
        },
        {
            name: "Thomas Anderson",
            role: "Security Specialist",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/thomas-anderson",
            twitter: "https://twitter.com/thomasanderson"
        },
        {
            name: "Nina Williams",
            role: "Mobile Developer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/nina-williams",
            twitter: "https://twitter.com/ninawilliams"
        },
        {
            name: "Kevin Zhang",
            role: "ML Engineer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/kevin-zhang",
            twitter: "https://twitter.com/kevinzhang"
        }
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

        setShuffledMembers(shuffleArray(teamMembers));
    }, []);

    return (
        <div className="my-24 flex flex-col">
            <div className="flex-col relative flex gap-y-3 items-center justify-center h-30 mt-5">
                <div className="flex fixed right-[150vh] top-[80vh]">
                    <div className="rounded-full opacity-40 bg-cyan-600 h-[15vh] w-[15vh]"></div>
                    <div className="rounded-full opacity-40 bg-cyan-800  h-[24vh] w-[24vh]"></div>
                </div>
                <div
                    className="w-60 h-60 bg-cyan-400 opacity-40 fixed top-[14vh] right-[170vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(25deg)'
                    }}
                ></div>
                <div
                    className="w-32 h-32 bg-cyan-200 opacity-40 fixed top-[25vh] right-[155vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(80deg)'
                    }}
                ></div>
                <div className="relative">
                    <p style={{fontFamily:"Jersey,sans-serif"}} className="text-lg xl:text-3xl ml-12 xl:pt-2 font-bold  text-cyan-500 glow-subtext mt-2">
                        MEET OUR AWESOME
                    </p>
                    <h1 className="text-transperent text-6xl relative font-rubik text-cyan-500 text-glow ml-10">
                        ORGANIZERS
                    </h1>
                </div>
                <div className="flex fixed left-[140vh]">
                    <div className="rounded-full opacity-40 bg-cyan-600 h-[24vh] w-[24vh]"></div>
                    <div className="rounded-full opacity-40 bg-cyan-800 h-[15vh] w-[15vh]"></div>
                </div>
            </div>

            <div className="flex flex-col h-auto relative min-h-screen ml-[27vh] mt-9 w-3/4 justify-center py-12">
                <div className="grid grid-cols-4 gap-8 px-8">
                    {shuffledMembers.map((member, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden backdrop-blur-md bg-white/10 border-2 border-black/20
                                 transform hover:scale-105 transition-transform duration-200
                                 shadow-lg hover:shadow-xl rounded-xl
                                 hover:border-black"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5"></div>
                            <img
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5 relative backdrop-blur-sm bg-white/10">
                                <h3 className="text-xl font-semibold text-black mb-1">{member.name}</h3>
                                <p className="text-gray-800 mb-4">{member.role}</p>
                                <div className="flex space-x-4 pt-2">
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-black hover:text-gray-600 transition-colors duration-300"
                                    >
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                    <a
                                        href={member.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-black hover:text-gray-600 transition-colors duration-300"
                                    >
                                        <Twitter className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom decorative elements */}
                <div
                    className="w-40 h-40 bg-cyan-400 opacity-25 fixed bottom-[20vh] right-[16vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(25deg)'
                    }}
                ></div>
                <div
                    className="w-32 h-32 bg-cyan-300 opacity-25 fixed bottom-[11vh] right-[8vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(80deg)'
                    }}
                ></div>
            </div>
        </div>

    );
}