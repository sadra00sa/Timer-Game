import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [userName, setUserName] = useState("");

  function handleClick() {
    setUserName(playerName.current.value);
    playerName.current.value = "";
  }

  return (
    <section
      id="player"
      className="mb-10 flex flex-col gap-5 border-y-2 border-ink py-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <h2 className="font-display text-xl font-bold sm:text-2xl">
        Welcome {userName ? userName : "unknown"}
      </h2>
      <p className="flex">
        <input
          ref={playerName}
          type="text"
          aria-label="Your name"
          placeholder="Type your name"
          className="w-full min-w-0 rounded-l-xl border-2 border-ink bg-white px-4 py-3 text-base placeholder:text-ink/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt sm:w-56"
        />
        <button
          onClick={handleClick}
          className="cursor-pointer whitespace-nowrap rounded-r-xl border-2 border-ink bg-ink px-5 py-3 font-semibold text-chalk transition-colors hover:bg-cobalt hover:border-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
        >
          Set Name
        </button>
      </p>
    </section>
  );
}
