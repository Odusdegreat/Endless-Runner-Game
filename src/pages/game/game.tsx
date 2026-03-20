import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  GameState,
  Lane,
  ObstacleType,
} from "@/interfaces/game.interface";
import {
  BASE_SPEED,
  GRAVITY,
  JUMP_FORCE,
  MAX_SPEED,
  PLAYER_Y,
  SPEED_RAMP,
  SPAWN_INTERVAL,
} from "@/lib/constants";
import { create_obstacle } from "@/lib/game.utils";
import GameCanvas from "./_components/game-canvas";
import Hud from "./_components/hud";

export default function GamePage() {
  const [game_state, set_game_state] = useState<GameState>("idle");
  const [player_lane, set_player_lane] = useState<Lane>(0);
  const [player_y, set_player_y] = useState(PLAYER_Y);
  const [score, set_score] = useState(0);
  const [high_score, set_high_score] = useState(0);
  const [obstacles, set_obstacles] = useState<ObstacleType[]>([]);

  const jump_velocity_ref = useRef(0);
  const spawn_timer_ref = useRef(0);
  const obstacle_id_ref = useRef(1);
  const score_accumulator_ref = useRef(0);

  const speed = useMemo(() => {
    const value = BASE_SPEED + score * SPEED_RAMP * 0.05;
    return Math.min(value, MAX_SPEED);
  }, [score]);

  const reset_game = useCallback(() => {
    set_game_state("idle");
    set_player_lane(0);
    set_player_y(PLAYER_Y);
    set_score(0);
    set_obstacles([]);
    jump_velocity_ref.current = 0;
    spawn_timer_ref.current = 0;
    obstacle_id_ref.current = 1;
    score_accumulator_ref.current = 0;
  }, []);

  const start_game = useCallback(() => {
    reset_game();
    set_game_state("playing");
  }, [reset_game]);

  const trigger_game_over = () => {
    set_game_state("game_over");
    set_high_score((prev) => Math.max(prev, score));
  };

  const move_left = () => {
    set_player_lane((prev) => (prev === 1 ? 0 : prev === 0 ? -1 : -1));
  };

  const move_right = () => {
    set_player_lane((prev) => (prev === -1 ? 0 : prev === 0 ? 1 : 1));
  };

  const jump = useCallback(() => {
    if (player_y <= PLAYER_Y + 0.01) {
      jump_velocity_ref.current = JUMP_FORCE;
    }
  }, [player_y]);

  useEffect(() => {
    const on_key_down = (event: KeyboardEvent) => {
      if (game_state === "idle") {
        if (event.code === "Space" || event.key === "Enter") {
          start_game();
        }
        return;
      }

      if (game_state === "game_over") {
        if (event.code === "Space" || event.key === "Enter") {
          start_game();
        }
        return;
      }

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        move_left();
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        move_right();
      }

      if (
        event.key === "ArrowUp" ||
        event.key.toLowerCase() === "w" ||
        event.code === "Space"
      ) {
        jump();
      }
    };

    window.addEventListener("keydown", on_key_down);
    return () => window.removeEventListener("keydown", on_key_down);
  }, [game_state, jump, start_game]);

  const update_game = (delta: number) => {
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

    spawn_timer_ref.current += delta;
    if (spawn_timer_ref.current >= SPAWN_INTERVAL) {
      spawn_timer_ref.current = 0;
      set_obstacles((prev) => [
        ...prev,
        create_obstacle(obstacle_id_ref.current++),
      ]);
    }

    set_obstacles((prev) =>
      prev
        .map((obstacle) => ({
          ...obstacle,
          z: obstacle.z + speed * delta,
        }))
        .filter((obstacle) => obstacle.z < 8),
    );

    score_accumulator_ref.current += delta * 10;
    if (score_accumulator_ref.current >= 1) {
      const whole_points = Math.floor(score_accumulator_ref.current);
      score_accumulator_ref.current -= whole_points;
      set_score((prev) => prev + whole_points);
    }
  };

  const on_collide = () => {
    if (game_state === "playing") {
      trigger_game_over();
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-950">
      <GameCanvas
        game_state={game_state}
        player_lane={player_lane}
        player_y={player_y}
        obstacles={obstacles}
        on_tick={update_game}
        on_collide={on_collide}
      />

      <Hud
        game_state={game_state}
        score={score}
        high_score={high_score}
        on_start={start_game}
        on_restart={start_game}
      />
    </div>
  );
}
