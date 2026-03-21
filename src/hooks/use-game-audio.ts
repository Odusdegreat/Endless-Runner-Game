import { useCallback, useEffect, useRef } from "react";

export default function useGameAudio(enabled: boolean) {
  const audio_context_ref = useRef<AudioContext | null>(null);
  const master_gain_ref = useRef<GainNode | null>(null);
  const enabled_ref = useRef(enabled);

  useEffect(() => {
    enabled_ref.current = enabled;
  }, [enabled]);

  useEffect(() => {
    return () => {
      if (audio_context_ref.current && audio_context_ref.current.state !== "closed") {
        void audio_context_ref.current.close();
      }
    };
  }, []);

  const ensure_context = useCallback(async () => {
    if (typeof window === "undefined") return null;

    if (!audio_context_ref.current) {
      const context = new window.AudioContext();
      const master_gain = context.createGain();
      master_gain.gain.value = 0.12;
      master_gain.connect(context.destination);

      audio_context_ref.current = context;
      master_gain_ref.current = master_gain;
    }

    if (audio_context_ref.current.state === "suspended") {
      await audio_context_ref.current.resume();
    }

    return audio_context_ref.current;
  }, []);

  const play_tone = useCallback(
    async ({
      frequency,
      frequency_end = frequency,
      duration = 0.16,
      type = "sine",
      volume = 0.2,
      delay = 0,
    }: {
      frequency: number;
      frequency_end?: number;
      duration?: number;
      type?: OscillatorType;
      volume?: number;
      delay?: number;
    }) => {
      if (!enabled_ref.current) return;

      const context = await ensure_context();
      const master_gain = master_gain_ref.current;

      if (!context || !master_gain) return;

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start_time = context.currentTime + delay;
      const end_time = start_time + duration;

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, start_time);
      oscillator.frequency.exponentialRampToValueAtTime(
        Math.max(frequency_end, 1),
        end_time,
      );

      gain.gain.setValueAtTime(0.0001, start_time);
      gain.gain.exponentialRampToValueAtTime(volume, start_time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, end_time);

      oscillator.connect(gain);
      gain.connect(master_gain);

      oscillator.start(start_time);
      oscillator.stop(end_time + 0.02);
    },
    [ensure_context],
  );

  const unlock = useCallback(async () => {
    await ensure_context();
  }, [ensure_context]);

  const play_start = useCallback(async () => {
    await Promise.all([
      play_tone({
        frequency: 392,
        frequency_end: 523,
        duration: 0.18,
        type: "triangle",
        volume: 0.16,
      }),
      play_tone({
        frequency: 587,
        frequency_end: 784,
        duration: 0.22,
        type: "sine",
        volume: 0.1,
        delay: 0.08,
      }),
    ]);
  }, [play_tone]);

  const play_jump = useCallback(async () => {
    await play_tone({
      frequency: 310,
      frequency_end: 640,
      duration: 0.16,
      type: "square",
      volume: 0.09,
    });
  }, [play_tone]);

  const play_lane_move = useCallback(async () => {
    await play_tone({
      frequency: 220,
      frequency_end: 180,
      duration: 0.08,
      type: "triangle",
      volume: 0.05,
    });
  }, [play_tone]);

  const play_coin = useCallback(async () => {
    await Promise.all([
      play_tone({
        frequency: 880,
        frequency_end: 1320,
        duration: 0.11,
        type: "triangle",
        volume: 0.12,
      }),
      play_tone({
        frequency: 1320,
        frequency_end: 1760,
        duration: 0.14,
        type: "sine",
        volume: 0.08,
        delay: 0.04,
      }),
    ]);
  }, [play_tone]);

  const play_pause_toggle = useCallback(
    async (paused: boolean) => {
      await play_tone({
        frequency: paused ? 260 : 420,
        frequency_end: paused ? 200 : 620,
        duration: 0.12,
        type: "triangle",
        volume: 0.08,
      });
    },
    [play_tone],
  );

  const play_game_over = useCallback(async () => {
    await Promise.all([
      play_tone({
        frequency: 330,
        frequency_end: 180,
        duration: 0.35,
        type: "sawtooth",
        volume: 0.08,
      }),
      play_tone({
        frequency: 220,
        frequency_end: 110,
        duration: 0.4,
        type: "triangle",
        volume: 0.06,
        delay: 0.05,
      }),
    ]);
  }, [play_tone]);

  return {
    unlock,
    play_start,
    play_jump,
    play_lane_move,
    play_coin,
    play_pause_toggle,
    play_game_over,
  };
}
