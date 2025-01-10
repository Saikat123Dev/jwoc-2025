import { GiRoundStar } from "react-icons/gi";
export default function Team() {
    return (
        <div className="my-[120px]  flex flex-col">
            <div className="flex-col relative flex gap-y-3 items-center  justify-center h-30 mt-5">
                <div
                    className="w-40 h-40 bg-cyan-400 absolute mt-[16vh] mr-[170vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(25deg)'
                    }}
                ></div>
                <div
                    className="w-20 h-20 bg-cyan-300 absolute mt-[30vh] mr-[145vh]"
                    style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        transform: 'rotate(80deg)'
                    }}
                ></div>
                <div className="relative ">
                    <p className="text-lg xl:text-3xl  ml-12 xl:pt-2 font-bold text-cyan-500 glow-subtext mt-2">MEET OUR AWESOME</p>
                    <h1 className="text-transperent relative font-rubik text-cyan-500 text-glow ml-10">ORGANIZERS</h1>
                </div>
                <div className="flex absolute ml-[140vh]">
                    <div className="rounded-full bg-cyan-600 h-[20vh] w-[20vh]"></div>
                    <div className="rounded-full bg-cyan-800 h-[10vh] w-[10vh]"></div>
                </div>
            </div>
            <div className=" flex flex-col h-[100vh] ml-[27vh] mt-9 w-3/4 border-double border-4 border-[#75b2d6]  justify-center">
              

            </div>
        </div>
    )
}

