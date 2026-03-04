'use client'

import { useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { useStore } from '@/lib/store'
import { SuitFragment, SuitFragmentProps } from './SuitFragment'

// ==================== FRAGMENT GENERATION ====================
// Creates 20 suit fragments with deterministic-seeded random positions
// so every reload produces the same beautiful layout
function seededRandom(seed: number) {
    const x = Math.sin(seed * 9301 + 49297) * 49297
    return x - Math.floor(x)
}

const generateFragments = (): SuitFragmentProps[] => {
    const fragments: SuitFragmentProps[] = []
    const count = 20

    // Body part rest positions for humanoid silhouette
    const bodySlots: [number, number, number][] = [
        // Head area
        [0, 1.8, 0], [-0.15, 1.6, 0.1], [0.15, 1.6, 0.1],
        // Shoulders
        [-0.8, 1.2, 0], [0.8, 1.2, 0],
        // Chest / Arc reactor area
        [-0.3, 0.6, 0.3], [0.3, 0.6, 0.3], [0, 0.8, 0.2], [0, 0.4, 0.3],
        // Arms
        [-1.2, 0.5, 0], [1.2, 0.5, 0], [-1.0, -0.2, 0], [1.0, -0.2, 0],
        // Gauntlets
        [-1.4, -0.6, 0.1], [1.4, -0.6, 0.1],
        // Core / belly
        [-0.2, -0.2, 0.2], [0.2, -0.2, 0.2],
        // Legs
        [-0.4, -1.2, 0], [0.4, -1.2, 0],
        // Boots
        [0, -1.8, 0],
    ]

    for (let i = 0; i < count; i++) {
        const seed = i * 137
        const angle = seededRandom(seed) * Math.PI * 2
        const distance = 8 + seededRandom(seed + 1) * 12

        const rest = bodySlots[i] || [
            (seededRandom(seed + 10) - 0.5) * 1.5,
            (seededRandom(seed + 11) - 0.5) * 3,
            (seededRandom(seed + 12) - 0.5) * 0.8,
        ]

        fragments.push({
            id: `frag-${i}`,
            modelPath: `/models/fragment_${i}.gltf`,
            restPosition: rest,
            restRotation: [
                seededRandom(seed + 20) * Math.PI * 0.5,
                seededRandom(seed + 21) * Math.PI * 0.5,
                0,
            ],
            spawnPosition: [
                Math.cos(angle) * distance,
                (seededRandom(seed + 30) - 0.5) * 14,
                Math.sin(angle) * distance,
            ],
            spawnRotation: [
                seededRandom(seed + 40) * Math.PI * 4,
                seededRandom(seed + 41) * Math.PI * 4,
                seededRandom(seed + 42) * Math.PI * 2,
            ],
            delay: (i / count) * 0.8,  // 0 to 0.8s stagger
            isAssembled: false,
        })
    }
    return fragments
}

// ==================== ARC REACTOR CORE ====================
function ArcReactorCore({ isAssembled }: { isAssembled: boolean }) {
    const outerRef = useRef<THREE.Mesh>(null)
    const innerRef = useRef<THREE.Mesh>(null)
    const lightRef = useRef<THREE.PointLight>(null)
    const glowRef = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()

        // Outer ring rotation
        if (outerRef.current) {
            outerRef.current.rotation.z = t * 1.5
        }

        // Inner ring counter-rotation
        if (innerRef.current) {
            innerRef.current.rotation.z = -t * 3
            if (innerRef.current.material instanceof THREE.MeshStandardMaterial) {
                innerRef.current.material.emissiveIntensity = isAssembled
                    ? 3 + Math.sin(t * 4) * 1.5
                    : 0.1
            }
        }

        // Point light pulse
        if (lightRef.current) {
            lightRef.current.intensity = isAssembled
                ? 12 + Math.sin(t * 4) * 4
                : 0
        }

        // Central glow sphere
        if (glowRef.current) {
            const s = isAssembled ? 1 + Math.sin(t * 3) * 0.15 : 0
            glowRef.current.scale.setScalar(s)
        }
    })

    return (
        <group position={[0, 0.2, 0.5]}>
            {/* Outer ring */}
            <mesh ref={outerRef}>
                <torusGeometry args={[0.35, 0.02, 16, 48]} />
                <meshStandardMaterial
                    color="#00d4ff"
                    emissive="#00d4ff"
                    emissiveIntensity={0.5}
                    toneMapped={false}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Inner ring */}
            <mesh ref={innerRef}>
                <torusGeometry args={[0.2, 0.035, 16, 32]} />
                <meshStandardMaterial
                    color="#00aaff"
                    emissive="#00d4ff"
                    emissiveIntensity={0.1}
                    toneMapped={false}
                />
            </mesh>

            {/* Central glow sphere */}
            <mesh ref={glowRef} scale={0}>
                <sphereGeometry args={[0.12, 32, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#00d4ff"
                    emissiveIntensity={5}
                    toneMapped={false}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Point light — the actual glow source */}
            <pointLight
                ref={lightRef}
                color="#00d4ff"
                intensity={0}
                distance={15}
                decay={2}
            />
        </group>
    )
}

// ==================== CAMERA RIG ====================
function Rig() {
    const { mouse } = useThree()

    useFrame(({ camera }) => {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.4, 0.03)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.3, 0.03)
        camera.lookAt(0, 0, 0)
    })

    return null
}

// ==================== MAIN COMPONENT ====================
export function SuitAssembly() {
    const { isSuitAssembled } = useStore()
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const allFragments = useMemo(() => generateFragments(), [])
    // On mobile, only render 10 fragments for performance
    const fragments = useMemo(() => isMobile ? allFragments.slice(0, 10) : allFragments, [isMobile, allFragments])

    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                gl={{
                    powerPreference: 'high-performance',
                    antialias: false,
                    alpha: true,
                }}
                dpr={isMobile ? [1, 1] : [1, 1.5]}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.08} />
                    <directionalLight
                        position={[5, 8, 5]}
                        intensity={1.2}
                        color="#e8f4f8"
                    />
                    <directionalLight
                        position={[-5, -3, -5]}
                        intensity={0.6}
                        color="#00d4ff"
                    />
                    <directionalLight
                        position={[0, -5, 5]}
                        intensity={0.3}
                        color="#ffd700"
                    />

                    {/* Environment reflections */}
                    <Environment preset="city" environmentIntensity={0.15} />

                    {/* Suit Fragments */}
                    <group>
                        {fragments.map((frag) => (
                            <SuitFragment
                                key={frag.id}
                                {...frag}
                                isAssembled={isSuitAssembled}
                            />
                        ))}
                        <ArcReactorCore isAssembled={isSuitAssembled} />
                    </group>

                    {/* Sparkle particles in 3D space */}
                    <Sparkles
                        count={isSuitAssembled ? 250 : 30}
                        scale={12}
                        size={isSuitAssembled ? 2.5 : 1}
                        speed={0.3}
                        color="#00d4ff"
                        opacity={0.5}
                    />

                    {/* Gold accent sparkles (subtle) */}
                    <Sparkles
                        count={isSuitAssembled ? 80 : 0}
                        scale={8}
                        size={1.5}
                        speed={0.2}
                        color="#ffd700"
                        opacity={0.25}
                    />

                    {/* Camera rig */}
                    <Rig />

                    {/* Post-Processing */}
                    <EffectComposer multisampling={isMobile ? 0 : 4}>
                        <Bloom
                            luminanceThreshold={0.4}
                            luminanceSmoothing={0.9}
                            intensity={2.0}
                            levels={8}
                            mipmapBlur
                        />
                        <ChromaticAberration
                            blendFunction={BlendFunction.NORMAL}
                            offset={new THREE.Vector2(0.0015, 0.0015)}
                            radialModulation={false}
                            modulationOffset={0}
                        />
                        <Noise opacity={0.025} />
                        <Vignette eskil={false} offset={0.1} darkness={1.0} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    )
}
