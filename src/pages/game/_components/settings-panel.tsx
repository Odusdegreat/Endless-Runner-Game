import { GAME_THEME } from "@/lib/theme";

type SettingsPanelProps = {
  sound_enabled: boolean;
  on_toggle_sound: () => void;
  on_toggle_settings: () => void;
};

export default function SettingsPanel({
  sound_enabled,
  on_toggle_sound,
  on_toggle_settings,
}: SettingsPanelProps) {
  const panel_style = {
    borderColor: GAME_THEME.ui.borderSoft,
    backgroundColor: GAME_THEME.ui.panelStrongest,
    color: GAME_THEME.ui.text,
  };

  return (
    <div
      className="panel-reveal pointer-events-auto absolute right-4 top-28 z-30 w-70 rounded-[28px] border p-4 shadow-2xl backdrop-blur-2xl md:right-5"
      style={panel_style}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Settings</h3>
          <p
            className="mt-1 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: GAME_THEME.ui.textSoft }}
          >
            Quick preferences
          </p>
        </div>

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
        className="mt-4 rounded-[22px] px-4 py-4"
        style={{ backgroundColor: GAME_THEME.ui.surfaceMuted }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">Sound</p>
            <p className="mt-1 text-xs" style={{ color: GAME_THEME.ui.textSoft }}>
              Turn game audio on or off
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={sound_enabled}
            aria-label="Toggle sound"
            onClick={on_toggle_sound}
            className="relative inline-flex h-9 w-18 items-center rounded-full border px-1 transition"
            style={{
              borderColor: sound_enabled
                ? "rgba(52, 211, 153, 0.5)"
                : GAME_THEME.ui.borderSoft,
              backgroundColor: sound_enabled
                ? "rgba(52, 211, 153, 0.24)"
                : GAME_THEME.ui.buttonGhost,
            }}
          >
            <span
              className="absolute left-3 text-[10px] font-bold uppercase tracking-[0.18em] transition"
              style={{
                color: sound_enabled
                  ? GAME_THEME.ui.toggleOn
                  : GAME_THEME.ui.textSoft,
                opacity: sound_enabled ? 1 : 0,
              }}
            >
              On
            </span>
            <span
              className="absolute right-3 text-[10px] font-bold uppercase tracking-[0.18em] transition"
              style={{
                color: !sound_enabled
                  ? GAME_THEME.ui.text
                  : GAME_THEME.ui.textSoft,
                opacity: sound_enabled ? 0 : 1,
              }}
            >
              Off
            </span>
            <span
              className="h-7 w-7 rounded-full shadow-lg transition"
              style={{
                transform: sound_enabled ? "translateX(33px)" : "translateX(0)",
                backgroundColor: sound_enabled
                  ? GAME_THEME.ui.toggleOn
                  : "#ffffff",
              }}
            />
          </button>
        </div>
      </div>

      <div
        className="mt-3 rounded-[22px] px-4 py-3 text-sm"
        style={{
          backgroundColor: GAME_THEME.ui.surfaceMuted,
          color: GAME_THEME.ui.textMuted,
        }}
      >
        A / D or Left / Right to move
        <br />
        W / Up / Space to jump
        <br />
        P or Esc to pause
      </div>
    </div>
  );
}
