import { useCallback, useMemo, useRef, useState } from "react";

import useGameControls from "@/hooks/use-game-controls";
import useLocalStorage from "@/hooks/use-local-storage";
import type {
  CoinType,
  GameState,
  Lane,
  ObstacleType,
} from "@/interfaces/game.interface";
import {
  BASE_SPEED,
  COIN_SPAWN_INTERVAL,
  DESPAWN_Z,
  GRAVITY,
  JUMP_FORCE,
  MAX_SPEED,
  OBSTACLE_SPAWN_INTERVAL,
  PLAYER_Y,
  SPEED_RAMP,
} from "@/lib/constants";
import {
  create_coin,
  create_obstacle,
  get_difficulty_label,
} from "@/lib/game.utils";
import { GAME_THEME } from "@/lib/theme";
import GameCanvas from "./_components/game-canvas";
import Hud from "./_components/hud";
import MobileControls from "@/pages/game/_components/mobile-controls";

export default function GamePage() {
  const [game_state, set_game_state] = useState<GameState>("idle");
  const [player_lane, set_player_lane] = useState<Lane>(0);
  const [player_y, set_player_y] = useState(PLAYER_Y);

  const [score, set_score] = useState(0);
  const [coins, set_coins] = useState(0);
  const [best_score, set_best_score] = useLocalStorage<number>(
    "runner_best_score",
    0,
  );
  const [best_coins, set_best_coins] = useLocalStorage<number>(
    "runner_best_coins",
    0,
  );
  const [sound_enabled, set_sound_enabled] = useLocalStorage<boolean>(
    "runner_sound_enabled",
    true,
  );
  const [show_settings, set_show_settings] = useState(false);

  const [obstacles, set_obstacles] = useState<ObstacleType[]>([]);
  const [coin_items, set_coin_items] = useState<CoinType[]>([]);

  const jump_velocity_ref = useRef(0);
  const obstacle_spawn_timer_ref = useRef(0);
  const coin_spawn_timer_ref = useRef(0);
  const obstacle_id_ref = useRef(1);
  const coin_id_ref = useRef(1);
  const score_accumulator_ref = useRef(0);

  const speed = useMemo(() => {
    const next_speed = BASE_SPEED + score * SPEED_RAMP * 0.05;
    return Math.min(next_speed, MAX_SPEED);
  }, [score]);

  const difficulty = useMemo(() => get_difficulty_label(score), [score]);

  const progress_percent = useMemo(() => {
    return Math.min((score / 500) * 100, 100);
  }, [score]);

  const start_game = useCallback(() => {
    set_player_lane(0);
    set_player_y(PLAYER_Y);
    set_score(0);
    set_coins(0);
    set_obstacles([]);
    set_coin_items([]);

    jump_velocity_ref.current = 0;
    obstacle_spawn_timer_ref.current = 0;
    coin_spawn_timer_ref.current = 0;
    obstacle_id_ref.current = 1;
    coin_id_ref.current = 1;
    score_accumulator_ref.current = 0;

    set_game_state("playing");
    set_show_settings(false);
  }, []);

  const restart_game = useCallback(() => {
    start_game();
  }, [start_game]);

  const pause_toggle = useCallback(() => {
    set_game_state((prev) => {
      if (prev === "playing") return "paused";
      if (prev === "paused") return "playing";
      return prev;
    });
  }, []);

  const game_over = useCallback(() => {
    set_game_state("game_over");
    set_best_score((prev) => Math.max(prev, score));
    set_best_coins((prev) => Math.max(prev, coins));
  }, [coins, score, set_best_coins, set_best_score]);

  const move_left = useCallback(() => {
    if (game_state !== "playing") return;
    set_player_lane((prev) => (prev === 1 ? 0 : prev === 0 ? -1 : -1));
  }, [game_state]);

  const move_right = useCallback(() => {
    if (game_state !== "playing") return;
    set_player_lane((prev) => (prev === -1 ? 0 : prev === 0 ? 1 : 1));
  }, [game_state]);

  const jump = useCallback(() => {
    if (game_state !== "playing") return;
    if (player_y <= PLAYER_Y + 0.02) {
      jump_velocity_ref.current = JUMP_FORCE;
    }
  }, [game_state, player_y]);

  useGameControls({
    game_state,
    on_left: move_left,
    on_right: move_right,
    on_jump: jump,
    on_start: start_game,
    on_restart: restart_game,
    on_pause_toggle: pause_toggle,
  });

  const update_game = useCallback(
    (delta: number) => {
      if (game_state !== "playing") return;

      set_player_y((prev) => {
        let next_y = prev + jump_velocity_ref.current * delta;
        jump_velocity_ref.current -= GRAVITY * delta;

        if (next_y <= PLAYER_Y) {
          next_y = PLAYER_Y;
          jump_velocity_ref.current = 0;
        }

        return next_y;
      });

      obstacle_spawn_timer_ref.current += delta;
      coin_spawn_timer_ref.current += delta;

      const difficulty_factor = Math.max(0.52, 1 - score * 0.0015);

      if (
        obstacle_spawn_timer_ref.current >=
        OBSTACLE_SPAWN_INTERVAL * difficulty_factor
      ) {
        obstacle_spawn_timer_ref.current = 0;
        set_obstacles((prev) => [
          ...prev,
          create_obstacle(obstacle_id_ref.current++),
        ]);
      }

      if (coin_spawn_timer_ref.current >= COIN_SPAWN_INTERVAL) {
        coin_spawn_timer_ref.current = 0;
        set_coin_items((prev) => [...prev, create_coin(coin_id_ref.current++)]);
      }

      set_obstacles((prev) =>
        prev
          .map((item) => ({
            ...item,
            z: item.z + speed * delta,
          }))
          .filter((item) => item.z < DESPAWN_Z),
      );

      set_coin_items((prev) =>
        prev
          .map((item) => ({
            ...item,
            z: item.z + speed * delta,
          }))
          .filter((item) => item.z < DESPAWN_Z && !item.collected),
      );

      score_accumulator_ref.current += delta * 10;
      if (score_accumulator_ref.current >= 1) {
        const whole = Math.floor(score_accumulator_ref.current);
        score_accumulator_ref.current -= whole;
        set_score((prev) => prev + whole);
      }
    },
    [game_state, score, speed],
  );

  const collect_coin = useCallback((coin_id: number) => {
    set_coin_items((prev) => prev.filter((item) => item.id !== coin_id));
    set_coins((prev) => prev + 1);
    set_score((prev) => prev + 5);
  }, []);

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: GAME_THEME.scene.shell }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: GAME_THEME.scene.shellOverlay }}
      />

      <GameCanvas
        game_state={game_state}
        player_lane={player_lane}
        player_y={player_y}
        obstacles={obstacles}
        coin_items={coin_items}
        on_tick={update_game}
        on_collide={game_over}
        on_collect_coin={collect_coin}
      />

      <Hud
        game_state={game_state}
        score={score}
        coins={coins}
        best_score={best_score}
        best_coins={best_coins}
        speed={speed}
        difficulty={difficulty}
        progress_percent={progress_percent}
        sound_enabled={sound_enabled}
        show_settings={show_settings}
        on_start={start_game}
        on_restart={restart_game}
        on_pause_toggle={pause_toggle}
        on_toggle_sound={() => set_sound_enabled((prev) => !prev)}
        on_toggle_settings={() => set_show_settings((prev) => !prev)}
      />

      <MobileControls
        game_state={game_state}
        on_left={move_left}
        on_right={move_right}
        on_jump={jump}
        on_pause_toggle={pause_toggle}
      />
    </div>
  );
}
