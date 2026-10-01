import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeParticleHeroProps {
  particleCount?: number;
  interactive?: boolean;
}

export const ThreeParticleHero: React.FC<ThreeParticleHeroProps> = ({
  particleCount = 1000,
  interactive = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 280;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Geometry & Attributes
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cobalt = new THREE.Color("#0028FF");
    const iceBlue = new THREE.Color("#90B4FF");
    const pureWhite = new THREE.Color("#FFFFFF");
    const dimSilver = new THREE.Color("#4A5568");

    // Distribute particles across a vast, gentle celestial torus field
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 120 + Math.random() * 140;
      const spreadY = (Math.random() - 0.5) * 160;
      const spreadZ = (Math.random() - 0.5) * 120;

      const x = Math.cos(angle) * radius;
      const y = spreadY;
      const z = Math.sin(angle) * (radius * 0.4) + spreadZ;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Color distribution: mostly starry white & ice blue, with 25% deep cobalt
      const rand = Math.random();
      const chosenColor = rand < 0.25 ? cobalt : rand < 0.55 ? iceBlue : rand < 0.85 ? pureWhite : dimSilver;

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Crisp, tiny star point texture (no large blurry halo)
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.6, 'rgba(0, 40, 255, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 2.2, // Small, crisp, fine stippled stars
      map: texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Fine Hairline Synaptic Lines (Only between close neighbors)
    const maxLineDist = 26;
    const linePositions = new Float32Array(particleCount * 6);
    const lineColors = new Float32Array(particleCount * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Smooth Mouse Interactivity
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 25;
      mouse.targetY = y * 25;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Gentle, slow planetary orbit
      particles.rotation.y = elapsedTime * 0.03 + mouse.x * 0.005;
      particles.rotation.x = Math.sin(elapsedTime * 0.04) * 0.05 - mouse.y * 0.005;
      linesMesh.rotation.y = particles.rotation.y;
      linesMesh.rotation.x = particles.rotation.x;

      const posArray = geometry.attributes.position.array as Float32Array;
      let vertexPos = 0;
      let colorPos = 0;
      let lineCount = 0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Subtle vertical breathing
        posArray[i3 + 1] = originalPositions[i3 + 1] + Math.sin(elapsedTime * 0.8 + originalPositions[i3] * 0.015) * 3;

        // Build synaptic mesh lines
        if (i % 5 === 0 && lineCount < 240) {
          for (let j = i + 1; j < Math.min(i + 8, particleCount); j++) {
            const j3 = j * 3;
            const dx = posArray[i3] - posArray[j3];
            const dy = posArray[i3 + 1] - posArray[j3 + 1];
            const dz = posArray[i3 + 2] - posArray[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxLineDist) {
              const alpha = (1.0 - dist / maxLineDist) * 0.25;

              linePositions[vertexPos++] = posArray[i3];
              linePositions[vertexPos++] = posArray[i3 + 1];
              linePositions[vertexPos++] = posArray[i3 + 2];

              linePositions[vertexPos++] = posArray[j3];
              linePositions[vertexPos++] = posArray[j3 + 1];
              linePositions[vertexPos++] = posArray[j3 + 2];

              lineColors[colorPos++] = 0.0;
              lineColors[colorPos++] = 0.15;
              lineColors[colorPos++] = 1.0 * alpha;

              lineColors[colorPos++] = 1.0 * alpha;
              lineColors[colorPos++] = 1.0 * alpha;
              lineColors[colorPos++] = 1.0 * alpha;

              lineCount++;
            }
          }
        }
      }

      geometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, vertexPos / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [particleCount, interactive]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    />
  );
};
