import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function GraphNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { positions, velocities, lineGeom, count } = useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    const lineGeom = new THREE.BufferGeometry();
    const linePositions = new Float32Array(count * count * 3 * 2);
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return { positions, velocities, lineGeom, count };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] += velocities[i * 3 + 0];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // bounce within bounds
      for (let a = 0; a < 3; a++) {
        const lim = a === 0 ? 7 : a === 1 ? 4.5 : 4;
        if (arr[i * 3 + a] > lim || arr[i * 3 + a] < -lim) {
          velocities[i * 3 + a] *= -1;
        }
      }
    }
    posAttr.needsUpdate = true;

    // rebuild edges
    const linePos = (linesRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    let lineIdx = 0;
    const threshold = 2.2;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < threshold * threshold) {
          linePos[lineIdx++] = arr[i * 3];
          linePos[lineIdx++] = arr[i * 3 + 1];
          linePos[lineIdx++] = arr[i * 3 + 2];
          linePos[lineIdx++] = arr[j * 3];
          linePos[lineIdx++] = arr[j * 3 + 1];
          linePos[lineIdx++] = arr[j * 3 + 2];
        }
      }
    }
    // zero out the rest
    for (let k = lineIdx; k < linePos.length; k++) linePos[k] = 0;
    (linesRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIdx / 3);

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.25;
      groupRef.current.rotation.x = Math.cos(t * 0.06) * 0.12;
    }
  });

  const pointsGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.12}
          color="#f0a8e8"
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial
          color="#b794f4"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export function Background3D({ intensity = 1 }: { intensity?: number }) {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: intensity }}
      aria-hidden
    >
      {/* radial vignette behind canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, oklch(0.18 0.08 320) 0%, oklch(0.08 0.02 300) 70%)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.6]}
      >
        <ambientLight intensity={0.6} />
        <GraphNetwork />
      </Canvas>
      {/* subtle film grain / glow overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, transparent 40%, oklch(0.06 0.02 300 / 0.6) 90%)",
        }}
      />
    </div>
  );
}
