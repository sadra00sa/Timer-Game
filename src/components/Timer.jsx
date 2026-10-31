import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

export default function Timer({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining < targetTime * 1000 && timeRemaining > -2000;

  if (timeRemaining <= -2000) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section
        className={`relative overflow-hidden rounded-2xl border-2 border-ink transition-colors duration-300 ${
          timerIsActive ? "lane-live bg-cobalt text-white" : "bg-white text-ink"
        }`}
      >
        <div className="relative grid items-center gap-4 p-5 sm:grid-cols-[1fr_auto_auto] sm:gap-8 sm:p-6">
          <div>
            <h2 className="font-display text-xl font-bold sm:text-2xl">{title}</h2>
            <p
              aria-live="polite"
              className={`mt-1 text-base ${
                timerIsActive ? "font-semibold text-white" : "text-ink/60"
              }`}
            >
              {timerIsActive ? "Time is running..." : "Timer inactive"}
            </p>
          </div>

          <p className="flex items-baseline gap-2">
            <span className="font-display text-6xl font-black leading-none tabular-nums sm:text-7xl">
              {targetTime}
            </span>
            <span className="text-lg font-semibold">
              second{targetTime > 1 ? "s" : ""}
            </span>
          </p>

          <button
            onClick={timerIsActive ? handleStop : handleStart}
            className={`min-w-44 cursor-pointer rounded-xl px-6 py-3 text-lg font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
              timerIsActive
                ? "bg-signal text-ink hover:bg-white focus-visible:outline-white"
                : "bg-ink text-white hover:bg-cobalt focus-visible:outline-cobalt"
            }`}
          >
            {timerIsActive ? "Stop" : "Start"} challenge
          </button>
        </div>
      </section>
    </>
  );
}
