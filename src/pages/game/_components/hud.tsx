import type { DifficultyLevel, GameState } from "@/interfaces/game.interface";
import { format_score } from "@/lib/game.utils";
import { GAME_THEME } from "@/lib/theme";

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
        <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-4">
          <div className="pointer-events-auto flex flex-col gap-3">
            <div
              className="rounded-3xl border px-4 py-3 shadow-2xl backdrop-blur-xl"
              style={panel_style}
            >
              <p
                className="text-[11px] uppercase tracking-[0.28em]"
                style={text_soft_style}
              >
                Endless Runner
              </p>
              <div className="mt-1 flex items-end gap-3">
                <p className="text-3xl font-black leading-none">
                  {format_score(score)}
                </p>
                <span className="pb-1 text-xs" style={text_soft_style}>
                  score
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-[20px] border px-4 py-3 shadow-xl backdrop-blur-xl"
                style={muted_panel_style}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.22em]"
                  style={text_faint_style}
                >
                  Coins
                </p>
                <p className="mt-1 text-2xl font-bold">{coins}</p>
              </div>

              <div
                className="rounded-[20px] border px-4 py-3 shadow-xl backdrop-blur-xl"
                style={muted_panel_style}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.22em]"
                  style={text_faint_style}
                >
                  Speed
                </p>
                <p className="mt-1 text-2xl font-bold">{speed.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="pointer-events-auto flex flex-col items-end gap-3">
            <div className="flex gap-2">
              {game_state === "playing" && (
                <button
                  onClick={on_pause_toggle}
                  className="rounded-2xl border px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-xl transition"
                  style={secondary_button_style}
                >
                  Pause
                </button>
              )}

              <button
                onClick={on_toggle_settings}
                className="rounded-2xl border px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-xl transition"
                style={secondary_button_style}
              >
                Settings
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-[20px] border px-4 py-3 text-right shadow-xl backdrop-blur-xl"
                style={muted_panel_style}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.22em]"
                  style={text_faint_style}
                >
                  Best Score
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {format_score(best_score)}
                </p>
              </div>

              <div
                className="rounded-[20px] border px-4 py-3 text-right shadow-xl backdrop-blur-xl"
                style={muted_panel_style}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.22em]"
                  style={text_faint_style}
                >
                  Best Coins
                </p>
                <p className="mt-1 text-2xl font-bold">{best_coins}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-7xl">
          <div className="flex items-center justify-between gap-3">
            <div
              className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
              style={difficulty_badge_style(difficulty)}
            >
              {difficulty}
            </div>

            <div
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: GAME_THEME.ui.textMuted }}
            >
              Run Progress
            </div>
          </div>

          <div
            className="mt-2 h-3 overflow-hidden rounded-full border backdrop-blur"
            style={{
              borderColor: GAME_THEME.ui.borderFaint,
              backgroundColor: GAME_THEME.ui.buttonGhost,
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress_percent}%`,
                backgroundImage: GAME_THEME.ui.progressGradient,
              }}
            />
          </div>
        </div>
      </div>

      {show_settings && (
        <div
          className="absolute right-4 top-28 z-30 w-70 rounded-[28px] border p-4 shadow-2xl backdrop-blur-2xl md:right-5"
          style={modal_strong_style}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Settings</h3>
            <button
              onClick={on_toggle_settings}
              className="rounded-xl px-3 py-1 text-sm"
              style={{
                backgroundColor: GAME_THEME.ui.buttonGhost,
                color: GAME_THEME.ui.text,
              }}
            >
              Close
            </button>
          </div>

          <div
            className="mt-4 flex items-center justify-between rounded-2xl px-4 py-3"
            style={metric_card_style}
          >
            <div>
              <p className="text-sm font-semibold">Sound</p>
              <p className="text-xs" style={text_soft_style}>
                UI toggle ready
              </p>
            </div>
            <button
              onClick={on_toggle_sound}
              className="rounded-full px-4 py-2 text-sm font-semibold"
              style={
                sound_enabled
                  ? {
                      backgroundColor: GAME_THEME.ui.toggleOn,
                      color: GAME_THEME.ui.toggleOnText,
                    }
                  : {
                      backgroundColor: GAME_THEME.ui.buttonGhost,
                      color: GAME_THEME.ui.text,
                    }
              }
            >
              {sound_enabled ? "On" : "Off"}
            </button>
          </div>

          <div
            className="mt-3 rounded-2xl px-4 py-3 text-sm"
            style={{
              ...metric_card_style,
              color: GAME_THEME.ui.textMuted,
            }}
          >
            A / D or Left / Right to move
            <br />
            W / Up / Space to jump
            <br />P or Esc to pause
          </div>
        </div>
      )}

      {game_state === "idle" && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center px-4"
          style={{ backgroundColor: GAME_THEME.ui.overlaySoft }}
        >
          <div
            className="w-full max-w-155 overflow-hidden rounded-4xl border shadow-2xl backdrop-blur-2xl"
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
            className="w-full max-w-md rounded-4xl border p-8 text-center shadow-2xl backdrop-blur-2xl"
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
            className="w-full max-w-140 overflow-hidden rounded-4xl border shadow-2xl backdrop-blur-2xl"
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
