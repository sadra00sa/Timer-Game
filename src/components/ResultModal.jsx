import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref,
) {
  const dialog = useRef();

  const userLost = remainingTime <= -2000;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.max(
  0,
  Math.round(
    (1 - Math.abs(remainingTime) / (targetTime * 1000)) * 100
  )
);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));

  return createPortal(
    <dialog
      className="m-auto w-[min(92vw,28rem)] overflow-hidden rounded-3xl border-2 border-ink bg-chalk p-0 text-ink backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      ref={dialog}
    >
      <div className={`px-7 pb-6 pt-7 ${userLost ? "bg-flare" : "bg-signal"}`}>
        {userLost && (
          <h2 className="font-display text-5xl font-black leading-none">You lost</h2>
        )}
        {!userLost && (
          <>
            <h2 className="font-display leading-none">
              <span className="block text-base font-bold">Your Score</span>
              <span className="mt-2 block text-8xl font-black tabular-nums">{score}</span>
            </h2>
            <div
              className="mt-5 h-3 overflow-hidden rounded-full bg-ink/15"
              role="presentation"
            >
              <div
                className="h-full rounded-full bg-ink"
                style={{ width: `${score}%` }}
              />
            </div>
          </>
        )}
      </div>

      <div className="px-7 pb-7 pt-5">
        <p className="text-lg">
          The target time was <strong className="font-bold">{targetTime} seconds.</strong>
        </p>
        <p className="mt-2 text-lg">
          You stopped the timer with{" "}
          <strong className="font-bold">{formattedRemainingTime} second left</strong>.
        </p>
        <form method="dialog" onSubmit={onReset} className="mt-6 text-right">
          <button className="cursor-pointer rounded-xl bg-ink px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt">
            Close
          </button>
        </form>
      </div>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
