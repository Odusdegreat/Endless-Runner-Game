import type { GameState } from "@/interfaces/game.interface";
import { GAME_THEME } from "@/lib/theme";

type MobileControlsProps = {
  game_state: GameState;
  on_left: () => void;
  on_right: () => void;
  on_jump: () => void;
  on_pause_toggle: () => void;
};

export default function MobileControls({
  game_state,
  on_left,
  on_right,
  on_jump,
  on_pause_toggle,
}: MobileControlsProps) {
  if (game_state !== "playing") return null;

  const secondary_button_style = {
    borderColor: GAME_THEME.ui.borderSoft,
    backgroundColor: GAME_THEME.ui.panelStrong,
    color: GAME_THEME.ui.text,
  };
  const primary_button_style = {
    backgroundColor: GAME_THEME.ui.buttonPrimary,
    color: GAME_THEME.ui.buttonPrimaryText,
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex items-end justify-between px-4 md:hidden">
      <div className="pointer-events-auto flex gap-3">
        <button
          onClick={on_left}
          className="h-14 w-14 rounded-[18px] border text-xs font-bold shadow-xl backdrop-blur-xl"
          style={secondary_button_style}
        >
          Left
        </button>
        <button
          onClick={on_right}
          className="h-14 w-14 rounded-[18px] border text-xs font-bold shadow-xl backdrop-blur-xl"
          style={secondary_button_style}
        >
          Right
        </button>
      </div>

      <div className="pointer-events-auto flex gap-3">
        <button
          onClick={on_pause_toggle}
          className="h-14 w-14 rounded-[18px] border text-[11px] font-bold shadow-xl backdrop-blur-xl"
          style={secondary_button_style}
        >
          Pause
        </button>
        <button
          onClick={on_jump}
          className="h-14 min-w-23 rounded-[18px] px-5 text-base font-bold shadow-xl"
          style={primary_button_style}
        >
          Jump
        </button>
      </div>
    </div>
  );
}
