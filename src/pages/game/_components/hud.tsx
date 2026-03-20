import type { GameState } from "@/interfaces/game.interface";

type HudProps = {
  game_state: GameState;
  score: number;
  high_score: number;
  on_start: () => void;
  on_restart: () => void;
};

export default function Hud({
  game_state,
  score,
  high_score,
  on_start,
  on_restart,
}: HudProps) {
  return (
    <>
      <div className="absolute left-4 top-4 rounded-2xl bg-black/45 px-4 py-3 text-white shadow-lg backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
          Score
        </p>
        <p className="text-3xl font-bold">{score}</p>
      </div>

      <div className="absolute right-4 top-4 rounded-2xl bg-black/45 px-4 py-3 text-white shadow-lg backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
          High Score
        </p>
        <p className="text-3xl font-bold">{high_score}</p>
      </div>

      {game_state === "idle" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
          <div className="w-[90%] max-w-md rounded-3xl bg-white/10 p-8 text-center text-white backdrop-blur-xl">
            <h1 className="text-4xl font-extrabold">Endless Runner</h1>
            <p className="mt-4 text-sm leading-6 text-white/80">
              Move with A / D or Arrow keys. Jump with W, Arrow Up, or Space.
            </p>
            <button
              onClick={on_start}
              className="mt-6 rounded-2xl bg-white px-6 py-3 text-base font-semibold text-black transition hover:scale-[1.02]"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {game_state === "game_over" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-md rounded-3xl bg-white/10 p-8 text-center text-white backdrop-blur-xl">
            <h2 className="text-4xl font-extrabold">Game Over</h2>
            <p className="mt-4 text-lg text-white/80">Final Score: {score}</p>
            <button
              onClick={on_restart}
              className="mt-6 rounded-2xl bg-white px-6 py-3 text-base font-semibold text-black transition hover:scale-[1.02]"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
