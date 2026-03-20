import { GROUND_Y } from "@/lib/constants";

export default function Ground() {
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, GROUND_Y, -18]}
        receiveShadow
      >
        <planeGeometry args={[30, 120]} />
        <meshStandardMaterial color="#404040" />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, GROUND_Y + 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[0.18, 120]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-2.2, GROUND_Y + 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[0.12, 120]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[2.2, GROUND_Y + 0.01, -18]}
        receiveShadow
      >
        <planeGeometry args={[0.12, 120]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
    </group>
  );
}
