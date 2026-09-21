import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function useScrollRatio() {
  return useRef(0);
}


type CursorRef = React.MutableRefObject<{ x: number; y: number }>;

function Knot({ scroll, cursor }: { scroll: React.MutableRefObject<number>; cursor: CursorRef }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (!mesh.current) return;
    const p = scroll.current;
    mesh.current.rotation.y += dt * 0.25;
    mesh.current.rotation.x = -0.3 + p * 1.4;
    mesh.current.position.y = 0.7 - p * 2.2;
    mesh.current.scale.setScalar(0.78 - p * 0.28);
    const { x, y } = cursor.current;
    mesh.current.rotation.z += (x * 0.38 - mesh.current.rotation.z) * 0.07;
    mesh.current.rotation.x += (-0.3 + p * 1.4 - y * 0.18 - mesh.current.rotation.x) * 0.07;
    mesh.current.position.x += (1.5 + x * 0.42 - mesh.current.position.x) * 0.07;
    mesh.current.position.y += (0.7 - p * 2.2 + y * 0.26 - mesh.current.position.y) * 0.07;
  });


  return (
    <mesh ref={mesh} castShadow>
      <torusKnotGeometry args={[1.25, 0.34, 220, 40, 2, 3]} />
      <meshStandardMaterial
        color="#c8722a"
        roughness={0.22}
        metalness={0.95}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

function Shards({ scroll, cursor }: { scroll: React.MutableRefObject<number>; cursor: CursorRef }) {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        pos: [
          (Math.random() - 0.5) * 11,
          (Math.random() - 0.5) * 7,
          -1 - Math.random() * 7,
        ] as [number, number, number],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
        s: 0.2 + Math.random() * 0.75,
        i,
      })),
    [],
  );

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (!group.current) return;
    group.current.rotation.y += dt * 0.05;
    group.current.position.z = scroll.current * 6;
    group.current.position.x += (-cursor.current.x * 0.28 - group.current.position.x) * 0.035;
    group.current.position.y += (-cursor.current.y * 0.18 - group.current.position.y) * 0.035;
  });

  return (
    <group ref={group}>
      {items.map((it) => (
        <Float key={it.i} speed={1 + (it.i % 4) * 0.3} rotationIntensity={0.5} floatIntensity={1.1}>
          <mesh position={it.pos} rotation={it.rot} scale={it.s}>
            <boxGeometry args={[1, 1, 0.06]} />
            <meshStandardMaterial
              color={it.i % 5 === 0 ? "#e8e2d6" : "#2a2521"}
              roughness={0.35}
              metalness={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ScrollBinder({ scroll }: { scroll: React.MutableRefObject<number> }) {
  useFrame(() => {
    const max = window.innerHeight;
    scroll.current = Math.min(1, window.scrollY / max);
  });
  return null;
}

export default function HeroScene() {
  const scroll = useScrollRatio();
  const cursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      cursor.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursor.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    const resetCursor = () => {
      cursor.current.x = 0;
      cursor.current.y = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", resetCursor);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", resetCursor);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 8, 22]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={2.1} color="#ffd9a8" />
      <directionalLight position={[-6, -2, -3]} intensity={0.8} color="#6d8fb3" />
      <Suspense fallback={null}>
        <Environment>
          <Lightformer intensity={2.4} position={[0, 5, 2]} scale={[10, 10, 1]} />
          <Lightformer
            intensity={1.4}
            color="#ffbb77"
            position={[-6, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[20, 2, 1]}
          />
          <Lightformer
            intensity={1}
            color="#88aacc"
            position={[6, -1, 1]}
            rotation-y={-Math.PI / 2}
            scale={[20, 2, 1]}
          />
        </Environment>
        <Knot scroll={scroll} cursor={cursor} />
        <Shards scroll={scroll} cursor={cursor} />
      </Suspense>
      <ScrollBinder scroll={scroll} />
    </Canvas>
  );
}
