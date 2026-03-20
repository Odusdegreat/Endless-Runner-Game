import { useEffect } from "react";

type UseGameControlsProps = {
  on_left: () => void;
  on_right: () => void;
  on_jump: () => void;
  on_start: () => void;
  on_restart: () => void;
  on_pause_toggle: () => void;
  game_state: "idle" | "playing" | "paused" | "game_over";
};

export default function useGameControls({
  on_left,
  on_right,
  on_jump,
  on_start,
  on_restart,
  on_pause_toggle,
  game_state,
}: UseGameControlsProps) {
  useEffect(() => {
    const on_key_down = (event: KeyboardEvent) => {
      if (game_state === "idle") {
        if (event.code === "Space" || event.key === "Enter") {
          on_start();
        }
        return;
      }

      if (game_state === "game_over") {
        if (event.code === "Space" || event.key === "Enter") {
          on_restart();
        }
        return;
      }

      if (event.key.toLowerCase() === "p" || event.key === "Escape") {
        on_pause_toggle();
        return;
      }

      if (game_state === "paused") {
        return;
      }

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        on_left();
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        on_right();
      }

      if (
        event.key === "ArrowUp" ||
        event.key.toLowerCase() === "w" ||
        event.code === "Space"
      ) {
        on_jump();
      }
    };

    window.addEventListener("keydown", on_key_down);
    return () => window.removeEventListener("keydown", on_key_down);
  }, [
    game_state,
    on_jump,
    on_left,
    on_pause_toggle,
    on_restart,
    on_right,
    on_start,
  ]);
}
