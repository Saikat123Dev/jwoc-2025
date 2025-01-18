import React from "react";
import Timeline from "./ui/Timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "20th January",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-extrabold text-blue-50 flex justify-center items-center">
            Program Kickoff: Registration Phase
          </p>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-neutral-200 text-sm leading-relaxed">
            JWOC begins! Mentors and mentees, register now to grow our developer community!
            </p>

          </div>
        </div>
      ),
      tags: ["Registration", "Program Start"]
    },
    {
      title: "30th January",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-extrabold text-blue-50 flex justify-center items-center">
            Project Announcement Day
          </p>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-neutral-200 text-sm leading-relaxed">
            Project announcement day! Mentees explore projects, mentors share goals—kickstarting collaborations!
            </p>

          </div>
        </div>
      ),
      tags: ["Projects", "Announcements", "Selection"]
    },
    {
      title: "4th February",
      content: (
        <div className="space-y-4">
          <p className="text-lg  font-extrabold text-blue-50 flex justify-center items-center">
            Registration Closure & Community Bonding
          </p>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-neutral-200 text-sm leading-relaxed">
            Registrations close! Community bonding begins for mentors and mentees to connect and plan.
            </p>

          </div>
        </div>
      ),
      tags: ["Registration End", "Community Bonding", "Team Formation"]
    },
    {
      title: "5th February",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-extrabold text-blue-50 flex justify-center items-center">
            Coding Phase 1 Launch
          </p>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-neutral-200 text-sm leading-relaxed">
            Coding begins! Participants start building projects and laying foundations.
            </p>

          </div>
        </div>
      ),
      tags: ["Coding", "Development", "Phase 1"]
    },
    {
      title: "20th February",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-extrabold text-blue-50 flex justify-center items-center">
            Phase Transition
          </p>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-neutral-200 text-sm leading-relaxed">
            Phase 1 ends, Phase 2 begins! Advanced features and complex tasks start.
            </p>

          </div>
        </div>
      ),
      tags: ["Phase Transition", "Milestones", "Progress"]
    },
    {
      title: "30th February",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-extrabold text-blue-50 flex justify-center items-center">
            Program Conclusion
          </p>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-neutral-200 text-sm leading-relaxed">
            JWOC ends! Final submissions mark project completion.
            </p>

          </div>
        </div>
      ),
      tags: ["Program End", "Completion", "Submissions"]
    },
    {
      title: "5th March",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-extrabold text-blue-50 flex justify-center items-center">
            Results Day
          </p>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-neutral-200 text-sm leading-relaxed">
            Results announced! Contributions recognized, and certificates awarded.
            </p>

          </div>
        </div>
      ),
      tags: ["Results", "Recognition", "Achievements"]
    },
  ];

  return (
    <div className="w-full mr-32 mt-12 ml-[5vh] h-full min-h-screen">
      <Timeline data={data} />
    </div>
  );
}

export default TimelineDemo;
