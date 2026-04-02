import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const THREAD_LENGTH = 3;
const THREAD_RADIUS = 0.018;

export default function DiscoBall() {
  const groupRef = useRef();

  const tiles = useMemo(() => {
    const result = [];
    const RADIUS = 2;
    const ROWS = 20;

    for (let row = 0; row < ROWS; row++) {
      const phi = (Math.PI * (row + 0.5)) / ROWS;
      const y = Math.cos(phi) * RADIUS;
      const r = Math.sin(phi) * RADIUS;
      const cols = Math.max(1, Math.round((2 * Math.PI * r) / 0.25));

      for (let col = 0; col < cols; col++) {
        const theta = (2 * Math.PI * col) / cols;
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        const pos = new THREE.Vector3(x, y, z);
        result.push({ pos, key: `${row}-${col}` });
      }
    }
    return result;
  }, []);

  useFrame(() => {
    groupRef.current.rotation.y += 0.003;
  });

  // Thread sits above the ball: top of ball is at y=+2, thread goes from y=2 up to y=2+THREAD_LENGTH
  const threadY = 2 + THREAD_LENGTH / 2;

  return (
    <group>
      {/* Static hanging thread — outside the rotating group */}
      <mesh position={[0, threadY, 0]}>
        <cylinderGeometry args={[THREAD_RADIUS, THREAD_RADIUS, THREAD_LENGTH, 8]} />
        <meshStandardMaterial color="#c8b89a" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Small metal cap where thread meets ball */}
      <mesh position={[0, 2.05, 0]}>
        <cylinderGeometry args={[0.12, 0.08, 0.12, 16]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Spinning disco ball */}
      <group ref={groupRef}>
        {tiles.map(({ pos, key }) => (
          <mesh
            key={key}
            position={pos}
            onUpdate={(self) => self.lookAt(pos.clone().multiplyScalar(1.5))}
          >
            <planeGeometry args={[0.21, 0.21]} />
            <meshStandardMaterial
              color="#d0d0d0"
              metalness={0.8}
              roughness={0.1}
            />
          </mesh>
        ))}
        <mesh>
          <sphereGeometry args={[1.99, 64, 64]} />
          <meshStandardMaterial color="#111111" metalness={0} roughness={1} />
        </mesh>
      </group>
    </group>
  );
}