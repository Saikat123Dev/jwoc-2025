import { GiRoundStar } from "react-icons/gi";
import { Linkedin, Twitter } from 'lucide-react';

export default function Team() {
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
            name: "Michael Chen",
            role: "Product Designer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/michael-chen",
            twitter: "https://twitter.com/michaelchen"
          },
          {
            name: "Michael Chen",
            role: "Product Designer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/michael-chen",
            twitter: "https://twitter.com/michaelchen"
          },
          {
            name: "Michael Chen",
            role: "Product Designer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/michael-chen",
            twitter: "https://twitter.com/michaelchen"
          },
          {
            name: "Michael Chen",
            role: "Product Designer",
            imageUrl: "/api/placeholder/300/300",
            linkedin: "https://linkedin.com/in/michael-chen",
            twitter: "https://twitter.com/michaelchen"
          }
    ];
    
    return (
        <div className="my-[120px] flex flex-col">
            <div className="flex-col relative flex gap-y-3 items-center justify-center h-30 mt-5">
                <div
                    className="w-40 h-40 bg-cyan-400 absolute mt-[14vh] mr-[170vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(25deg)'
                    }}
                ></div>
                <div
                    className="w-20 h-20 bg-cyan-300 absolute mt-[25vh] mr-[145vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(80deg)'
                    }}
                ></div>
                <div className="relative">
                    <p className="text-lg xl:text-3xl ml-12 xl:pt-2 font-bold text-cyan-500 glow-subtext mt-2">MEET OUR AWESOME</p>
                    <h1 className="text-transperent relative font-rubik text-cyan-500 text-glow ml-10">ORGANIZERS</h1>
                </div>
                <div className="flex absolute ml-[140vh]">
                    <div className="rounded-full bg-cyan-600 h-[20vh] w-[20vh]"></div>
                    <div className="rounded-full bg-cyan-800 h-[10vh] w-[10vh]"></div>
                </div>
            </div>
            <div className="flex flex-col h-auto  relative min-h-screen ml-[27vh] mt-9 w-3/4 border-double border-4 border-[#75b2d6] justify-center py-12">
                <div className="grid grid-cols-3 gap-8 px-8">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={index} 
                            className="backdrop-blur-sm bg-white/30 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 
                                     shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-opacity-20 border-white
                                     hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.6)]"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                            }}
                        >
                            <img 
                                src={member.imageUrl} 
                                alt={member.name} 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5 backdrop-blur-sm bg-white/50">
                                <h3 className="text-xl font-semibold text-cyan-800 mb-1">{member.name}</h3>
                                <p className="text-cyan-600 mb-4">{member.role}</p>
                                <div className="flex space-x-4 pt-2">
                                    <a 
                                        href={member.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-cyan-600 hover:text-cyan-800 transition-colors duration-300"
                                    >
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                    <a 
                                        href={member.twitter} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-cyan-500 hover:text-cyan-700 transition-colors duration-300"
                                    >
                                        <Twitter className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className="w-40 h-40 bg-cyan-400 absolute mt-[170vh] ml-[130vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(25deg)'
                    }}
                ></div>
                <div
                    className="w-20 h-20 bg-cyan-300 absolute mt-[190vh] ml-[130vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(80deg)'
                    }}
                ></div>
            </div>
        </div>
    )
}