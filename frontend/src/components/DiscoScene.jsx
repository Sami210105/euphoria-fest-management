import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import DiscoBall from "./DiscoBall";

export default function DiscoScene({ className }) {
  return (
    <div className={`h-[400px] w-[400px] ${className}`}>
      <Canvas>
        <ambientLight intensity={0.05} />
        <pointLight position={[5, 5, 5]} intensity={10} color="#c05754" />
        <pointLight position={[-5, 2, -5]} intensity={10} color="#c05754" />
        <pointLight position={[0, -5, 5]} intensity={6} color="#aaddff" />
        <DiscoBall />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}