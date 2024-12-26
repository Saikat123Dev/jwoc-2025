import React from "react";
import Timeline from "./ui/Timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch
          </p>
          <div className="grid grid-cols-2 gap-4" />
        </div>
      )
    },
    {
      title: "Early 2023",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            I usually run out of copy, but when I see content this big, I try to
            integrate lorem ipsum.
          </p>
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            Lorem ipsum is for people who are too lazy to write copy. But we are
            not. Here are some more examples of beautiful designs I built.
          </p>
          <div className="grid grid-cols-2 gap-4" />
        </div>
      )
    },
    {
      title: "Changelog",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            Deployed 5 new components on Aceternity today
          </p>
          <div className="space-y-2">
            <div className="flex gap-2 items-center text-neutral-200 text-xs md:text-sm">
              <span className="text-green-500">✓</span> Card grid component
            </div>
            <div className="flex gap-2 items-center text-neutral-200 text-xs md:text-sm">
              <span className="text-green-500">✓</span> Startup template Aceternity
            </div>
            <div className="flex gap-2 items-center text-neutral-200 text-xs md:text-sm">
              <span className="text-green-500">✓</span> Random file upload lol
            </div>
            <div className="flex gap-2 items-center text-neutral-200 text-xs md:text-sm">
              <span className="text-green-500">✓</span> Himesh Reshammiya Music CD
            </div>
            <div className="flex gap-2 items-center text-neutral-200 text-xs md:text-sm">
              <span className="text-green-500">✓</span> Salman Bhai Fan Club registrations open
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4" />
        </div>
      )
    }
  ];

  return (
    <div className="w-full pl-10 ml-10 pr-20 mr-20 h-full min-h-screen ">
      <Timeline data={data} />
    </div>
  );
}
