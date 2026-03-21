import type { DifficultyLevel, GameState } from "@/interfaces/game.interface";
import { format_score } from "@/lib/game.utils";
import { GAME_THEME } from "@/lib/theme";
import SettingsPanel from "./settings-panel";

type HudProps = {
  game_state: GameState;
  score: number;
  coins: number;
  best_score: number;
  best_coins: number;
  speed: number;
  difficulty: DifficultyLevel;
  progress_percent: number;
  sound_enabled: boolean;
  show_settings: boolean;
  on_start: () => void;
  on_restart: () => void;
  on_pause_toggle: () => void;
  on_toggle_sound: () => void;
  on_toggle_settings: () => void;
};

function difficulty_badge_style(difficulty: DifficultyLevel) {
  return GAME_THEME.difficulty[difficulty];
}

export default function Hud({
  game_state,
  score,
  coins,
  best_score,
  best_coins,
  speed,
  difficulty,
  progress_percent,
  sound_enabled,
  show_settings,
  on_start,
  on_restart,
  on_pause_toggle,
  on_toggle_sound,
  on_toggle_settings,
}: HudProps) {
  const panel_style = {
    borderColor: GAME_THEME.ui.borderSoft,
    backgroundColor: GAME_THEME.ui.panel,
    color: GAME_THEME.ui.text,
  };
  const muted_panel_style = {
    borderColor: GAME_THEME.ui.borderSoft,
    backgroundColor: GAME_THEME.ui.panelMuted,
    color: GAME_THEME.ui.text,
  };
  const modal_style = {
    borderColor: GAME_THEME.ui.borderSoft,
    backgroundColor: GAME_THEME.ui.panelStrong,
    color: GAME_THEME.ui.text,
  };
  const modal_strong_style = {
    borderColor: GAME_THEME.ui.borderSoft,
    backgroundColor: GAME_THEME.ui.panelStrongest,
    color: GAME_THEME.ui.text,
  };
  const metric_card_style = {
    backgroundColor: GAME_THEME.ui.surfaceMuted,
  };
  const secondary_button_style = {
    borderColor: GAME_THEME.ui.borderSoft,
    backgroundColor: GAME_THEME.ui.buttonGhost,
    color: GAME_THEME.ui.text,
  };
  const primary_button_style = {
    backgroundColor: GAME_THEME.ui.buttonPrimary,
    color: GAME_THEME.ui.buttonPrimaryText,
  };
  const text_soft_style = {
    color: GAME_THEME.ui.textSoft,
  };
  const text_faint_style = {
    color: GAME_THEME.ui.textFaint,
  };

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 p-4 md:p-5">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-[260px_1fr_260px] md:items-start">
            <div className="pointer-events-auto flex flex-col gap-3 md:col-start-1">
              <div
                className="panel-reveal rounded-[22px] border px-4 py-3 shadow-2xl backdrop-blur-xl"
                style={panel_style}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.28em]"
                  style={text_soft_style}
                >
                  Endless Runner
                </p>
                <div className="mt-1 flex items-end gap-3">
                  <p className="text-[2rem] font-black leading-none">
                    {format_score(score)}
                  </p>
                  <span className="pb-1 text-xs" style={text_soft_style}>
                    score
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div
                  className="panel-reveal rounded-[18px] border px-4 py-3 shadow-xl backdrop-blur-xl"
                  style={muted_panel_style}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.22em]"
                    style={text_faint_style}
                  >
                    Coins
                  </p>
                  <p className="mt-1 text-xl font-bold">{coins}</p>
                </div>

                <div
                  className="panel-reveal rounded-[18px] border px-4 py-3 shadow-xl backdrop-blur-xl"
                  style={muted_panel_style}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.22em]"
                    style={text_faint_style}
                  >
                    Speed
                  </p>
                  <p className="mt-1 text-xl font-bold">{speed.toFixed(1)}</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block" />

            <div className="pointer-events-auto col-span-2 flex flex-col gap-3 md:col-span-1 md:col-start-3 md:items-end">
              <div className="flex justify-end gap-2">
                {game_state === "playing" && (
                  <button
                    onClick={on_pause_toggle}
                    className="panel-reveal rounded-[18px] border px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5"
                    style={secondary_button_style}
                  >
                    Pause
                  </button>
                )}

                <button
                  onClick={on_toggle_settings}
                  className="panel-reveal rounded-[18px] border px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5"
                  style={secondary_button_style}
                >
                  Settings
                </button>
              </div>

              <div className="grid w-full grid-cols-2 gap-3 md:max-w-[244px]">
                <div
                  className="panel-reveal rounded-[18px] border px-4 py-3 text-right shadow-xl backdrop-blur-xl"
                  style={muted_panel_style}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.22em]"
                    style={text_faint_style}
                  >
                    Best Score
                  </p>
                  <p className="mt-1 text-xl font-bold">
                    {format_score(best_score)}
                  </p>
                </div>

                <div
                  className="panel-reveal rounded-[18px] border px-4 py-3 text-right shadow-xl backdrop-blur-xl"
                  style={muted_panel_style}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.22em]"
                    style={text_faint_style}
                  >
                    Best Coins
                  </p>
                  <p className="mt-1 text-xl font-bold">{best_coins}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 px-4 md:bottom-5">
        <div className="mx-auto max-w-xl">
          <div
            className="panel-reveal pointer-events-auto rounded-[22px] border px-4 py-3 shadow-2xl backdrop-blur-xl"
            style={muted_panel_style}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={difficulty_badge_style(difficulty)}
                >
                  {difficulty}
                </div>
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.22em]"
                    style={text_faint_style}
                  >
                    Run Progress
                  </p>
                  <p className="mt-0.5 text-sm font-semibold">
                    {format_score(score)} / 500
                  </p>
                </div>
              </div>

              <p className="text-xl font-black">{Math.round(progress_percent)}%</p>
            </div>

            <div
              className="mt-3 relative h-3 overflow-hidden rounded-full border backdrop-blur"
              style={{
                borderColor: GAME_THEME.ui.borderFaint,
                backgroundColor: GAME_THEME.ui.buttonGhost,
              }}
            >
              <div
                className="absolute inset-y-[2px] left-[2px] rounded-full transition-all duration-500"
                style={{
                  width: `calc(${progress_percent}% - 4px)`,
                  minWidth: progress_percent > 1 ? "18px" : "0px",
                  backgroundImage: GAME_THEME.ui.progressGradient,
                }}
              />
              <div className="progress-sheen" />
              <div className="absolute inset-y-0 left-1/4 w-px bg-white/12" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-white/12" />
              <div className="absolute inset-y-0 left-3/4 w-px bg-white/12" />
            </div>
          </div>
        </div>
      </div>

      {show_settings && (
        <SettingsPanel
          sound_enabled={sound_enabled}
          on_toggle_sound={on_toggle_sound}
          on_toggle_settings={on_toggle_settings}
        />
      )}

      {game_state === "idle" && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center px-4"
          style={{ backgroundColor: GAME_THEME.ui.overlaySoft }}
        >
          <div
            className="panel-reveal w-full max-w-155 overflow-hidden rounded-4xl border shadow-2xl backdrop-blur-2xl"
            style={modal_style}
          >
            <div
              className="px-6 py-7 md:px-8"
              style={{ backgroundImage: GAME_THEME.ui.heroGradient }}
            >
              <h1 className="text-4xl font-black leading-none md:text-6xl">
                Endless Runner
              </h1>
              <p
                className="mt-4 max-w-xl text-sm leading-7 md:text-base"
                style={{ color: GAME_THEME.ui.textMuted }}
              >
                Dodge obstacles, collect coins, survive the speed ramp, and beat
                your best run with a clean arcade-style experience.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={on_start}
                  className="rounded-2xl px-6 py-3 text-base font-bold transition hover:scale-[1.02]"
                  style={primary_button_style}
                >
                  Start Run
                </button>

                <button
                  onClick={on_toggle_settings}
                  className="rounded-2xl border px-6 py-3 text-base font-semibold transition"
                  style={secondary_button_style}
                >
                  Settings
                </button>
              </div>
            </div>

            <div className="grid gap-3 p-6 md:grid-cols-3 md:p-8">
              <div className="rounded-3xl p-4" style={metric_card_style}>
                <p
                  className="text-xs uppercase tracking-[0.2em]"
                  style={text_faint_style}
                >
                  Best Score
                </p>
                <p className="mt-2 text-3xl font-black">
                  {format_score(best_score)}
                </p>
              </div>

              <div className="rounded-3xl p-4" style={metric_card_style}>
                <p
                  className="text-xs uppercase tracking-[0.2em]"
                  style={text_faint_style}
                >
                  Best Coins
                </p>
                <p className="mt-2 text-3xl font-black">{best_coins}</p>
              </div>

              <div className="rounded-3xl p-4" style={metric_card_style}>
                <p
                  className="text-xs uppercase tracking-[0.2em]"
                  style={text_faint_style}
                >
                  Controls
                </p>
                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: GAME_THEME.ui.textMuted }}
                >
                  Move left/right, jump, pause, survive.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {game_state === "paused" && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center px-4"
          style={{ backgroundColor: GAME_THEME.ui.overlayMid }}
        >
          <div
            className="panel-reveal w-full max-w-md rounded-4xl border p-8 text-center shadow-2xl backdrop-blur-2xl"
            style={modal_strong_style}
          >
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={text_faint_style}
            >
              Game Paused
            </p>
            <h2 className="mt-3 text-4xl font-black">Take a Breath</h2>
            <p
              className="mt-4 text-sm leading-7"
              style={{ color: GAME_THEME.ui.textMuted }}
            >
              Resume whenever you are ready.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={on_pause_toggle}
                className="rounded-2xl px-6 py-3 font-bold"
                style={primary_button_style}
              >
                Resume
              </button>
              <button
                onClick={on_restart}
                className="rounded-2xl border px-6 py-3 font-semibold"
                style={secondary_button_style}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}

      {game_state === "game_over" && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center px-4"
          style={{ backgroundColor: GAME_THEME.ui.overlayStrong }}
        >
          <div
            className="panel-reveal w-full max-w-140 overflow-hidden rounded-4xl border shadow-2xl backdrop-blur-2xl"
            style={modal_strong_style}
          >
            <div
              className="px-6 py-7 md:px-8"
              style={{ backgroundImage: GAME_THEME.ui.gameOverGradient }}
            >
              <p
                className="text-xs uppercase tracking-[0.3em]"
                style={text_soft_style}
              >
                Run Ended
              </p>
              <h2 className="mt-3 text-4xl font-black md:text-5xl">
                Game Over
              </h2>
              <p
                className="mt-4 text-sm leading-7"
                style={{ color: GAME_THEME.ui.textMuted }}
              >
                Nice run. Go again and beat your best.
              </p>
            </div>

            <div className="grid gap-3 p-6 md:grid-cols-3 md:p-8">
              <div className="rounded-3xl p-4" style={metric_card_style}>
                <p
                  className="text-xs uppercase tracking-[0.2em]"
                  style={text_faint_style}
                >
                  Score
                </p>
                <p className="mt-2 text-3xl font-black">
                  {format_score(score)}
                </p>
              </div>

              <div className="rounded-3xl p-4" style={metric_card_style}>
                <p
                  className="text-xs uppercase tracking-[0.2em]"
                  style={text_faint_style}
                >
                  Coins
                </p>
                <p className="mt-2 text-3xl font-black">{coins}</p>
              </div>

              <div className="rounded-3xl p-4" style={metric_card_style}>
                <p
                  className="text-xs uppercase tracking-[0.2em]"
                  style={text_faint_style}
                >
                  Best
                </p>
                <p className="mt-2 text-3xl font-black">
                  {format_score(best_score)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 px-6 pb-6 md:px-8 md:pb-8">
              <button
                onClick={on_restart}
                className="rounded-2xl px-6 py-3 font-bold"
                style={primary_button_style}
              >
                Play Again
              </button>
              <button
                onClick={on_toggle_settings}
                className="rounded-2xl border px-6 py-3 font-semibold"
                style={secondary_button_style}
              >
                Open Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
