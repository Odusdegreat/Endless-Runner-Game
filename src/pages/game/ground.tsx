import { useMemo } from "react";

import { GROUND_Y } from "@/lib/constants";
import { GAME_THEME } from "@/lib/theme";

type GroundProps = {
  speed: number;
};

export default function Ground({ speed }: GroundProps) {
  const roadside_props = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        return {
          key: index,
          x: side * (6.5 + (index % 3) * 1.1),
          z: -14 - index * 11,
          scale: 1 + (index % 4) * 0.18,
        };
      }),
    [],
  );

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, GROUND_Y, -18]}
        receiveShadow
      >
        <planeGeometry args={[30, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.road} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, GROUND_Y + 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[0.2, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.laneCenter} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-2.2, GROUND_Y + 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[0.14, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.laneDivider} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[2.2, GROUND_Y + 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[0.14, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.laneDivider} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-9, GROUND_Y - 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[8, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.verge} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[9, GROUND_Y - 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[8, 160]} />
        <meshStandardMaterial color={GAME_THEME.scene.verge} />
      </mesh>

      <mesh position={[-6, 1.2, -15]} castShadow>
        <boxGeometry args={[1.3, 2.4, 1.3]} />
        <meshStandardMaterial color={GAME_THEME.scene.buildingNear} />
      </mesh>

      <mesh position={[6, 1.5, -22]} castShadow>
        <boxGeometry args={[1.8, 3, 1.8]} />
        <meshStandardMaterial color={GAME_THEME.scene.buildingMid} />
      </mesh>

      <mesh position={[-7, 1.8, -30]} castShadow>
        <boxGeometry args={[1.8, 3.6, 1.8]} />
        <meshStandardMaterial color={GAME_THEME.scene.buildingFar} />
      </mesh>

      <mesh position={[7, 1.3, -36]} castShadow>
        <boxGeometry args={[1.5, 2.6, 1.5]} />
        <meshStandardMaterial color={GAME_THEME.scene.buildingAlt} />
      </mesh>

      <mesh position={[-8, 0.65, -42]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.3, 12]} />
        <meshStandardMaterial color={GAME_THEME.scene.pole} />
      </mesh>

      <mesh position={[-8, 1.55, -42]} castShadow>
        <sphereGeometry args={[0.22, 14, 14]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.lampGlow}
          emissive={GAME_THEME.scene.lampGlowEmissive}
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh position={[8, 0.65, -48]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.3, 12]} />
        <meshStandardMaterial color={GAME_THEME.scene.pole} />
      </mesh>

      <mesh position={[8, 1.55, -48]} castShadow>
        <sphereGeometry args={[0.22, 14, 14]} />
        <meshStandardMaterial
          color={GAME_THEME.scene.lampGlow}
          emissive={GAME_THEME.scene.lampGlowEmissive}
          emissiveIntensity={0.4}
        />
      </mesh>

      {roadside_props.map((prop) => (
        <group key={prop.key} position={[prop.x, GROUND_Y + 0.15, prop.z]}>
          <mesh castShadow position={[0, 0.55 * prop.scale, 0]}>
            <boxGeometry args={[0.35, 1.1 * prop.scale, 0.35]} />
            <meshStandardMaterial color={GAME_THEME.scene.pole} />
          </mesh>
          <mesh castShadow position={[0, 1.18 * prop.scale, 0]}>
            <coneGeometry args={[0.85, 1.5 * prop.scale, 8]} />
            <meshStandardMaterial color={GAME_THEME.scene.verge} />
          </mesh>
          <mesh
            castShadow
            position={[0, 0.42 * prop.scale, 0]}
            rotation={[0, speed * 0.01, 0]}
          >
            <torusGeometry args={[0.55, 0.04, 10, 24]} />
            <meshStandardMaterial
              color={GAME_THEME.scene.playerTrim}
              emissive={GAME_THEME.scene.playerTrimEmissive}
              emissiveIntensity={0.25}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
