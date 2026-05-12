import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const goals = [
  {
    title: "Emergency Fund",
    savedThisMonth: "+€770",
    progress: "€3,200 / €5,000",
  },
  {
    title: "Vacation",
    savedThisMonth: "+€250",
    progress: "€1,400 / €2,000",
  },
  {
    title: "Car",
    savedThisMonth: "+€120",
    progress: "€9,000 / €15,000",
  },
  {
    title: "House",
    savedThisMonth: "+€300",
    progress: "€23,400 / €50,000",
  },
];


const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};



export default function SavingsGoalsCard() {
    

const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
const [direction, setDirection] = useState(1);

const currentGoal = goals[currentGoalIndex];


const handlePreviousGoal = () => {
  
    setDirection(-1);

    setCurrentGoalIndex((prevIndex) =>
        prevIndex === 0 ? goals.length - 1 : prevIndex - 1
    );
};

const handleNextGoal = () => {
    
    setDirection(1);
    
    setCurrentGoalIndex((prevIndex) =>
        prevIndex === goals.length - 1 ? 0 : prevIndex + 1
    );
};


  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm transition">
      <p className="text-sm font-medium text-[#76638F]">Savings Goals</p>

      <div className="mt-2 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <button 
        onClick={handlePreviousGoal} 
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-zinc-400 text-lg text-zinc-600 transition hover:text-[#f1d498]">
          <ChevronLeft size={18} />
        </button>

        <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
            key={currentGoalIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.15, ease: "easeInOut" }}
            >
            <h3 className="text-center text-2xl font-semibold text-[#542c88]">
                {currentGoal.title}
            </h3>

            <div className="mt-5 mx-auto grid max-w-4xl grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-zinc-200">
                <div className="flex flex-col items-center justify-center px-6 py-6 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
                    Saved This Month
                </p>
                <p className="mt-3 text-4xl font-semibold text-emerald-600">
                    {currentGoal.savedThisMonth}
                </p>
                </div>

                <div className="flex flex-col items-center justify-center border-zinc-200 px-6 py-6 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
                    Target
                </p>
                <p className="mt-3 text-4xl font-semibold text-zinc-800">
                    {currentGoal.progress}
                </p>
                </div>
            </div>
            </motion.div>
        </AnimatePresence>
        </div>

        <button 
        onClick={handleNextGoal} 
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-zinc-400 text-lg text-zinc-600 transition hover:text-[#f7f3eb]">
          <ChevronRight size={18} />
        </button>
      </div>

        <div className="mt-6 flex items-center justify-center gap-2">
        {goals.map((_, index) => (
            <span
            key={index}
            className={`h-2.5 w-2.5 rounded-full transition ${
                index === currentGoalIndex ? "bg-zinc-800" : "bg-zinc-300"
            }`}
            />
        ))}
        </div>
    </article>
  );
}