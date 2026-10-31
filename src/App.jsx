import Player from './components/Player.jsx';
import Timer from './components/Timer.jsx';

function App() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-10 sm:py-16">
      <header className="mb-10">
        <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
          Timer Game
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/75">
          Start a lane, then stop the clock the moment you think time is up.
          The closer you land, the higher your score. Wait more than two
          seconds past the target and you lose.
        </p>
      </header>

      <Player />

      <div id="challenges" className="flex flex-col gap-4">
        <Timer title='Fast' targetTime={1}/>
        <Timer title='Easy' targetTime={5}/>
        <Timer title='Normal' targetTime={10}/>
        <Timer title='Hard' targetTime={15}/>
      </div>
    </main>
  );
}

export default App;
