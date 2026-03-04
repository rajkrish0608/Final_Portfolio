'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { useStore } from '@/lib/store'
import { SuitFragment, SuitFragmentProps } from './SuitFragment'

// Procedural generation of 20 fragments
const generateFragments = (): SuitFragmentProps[] => {
    const fragments: SuitFragmentProps[] = []
    const count = 20

    for (let i = 0; i < count; i++) {
        // Determine a position roughly forming a humanoid core
        const restX = (Math.random() - 0.5) * 1.5
        const restY = (Math.random() - 0.5) * 3
        const restZ = (Math.random() - 0.5) * 1

        // Spawn them way outside the screen bounds
        const angle = Math.random() * Math.PI * 2
        const distance = 10 + Math.random() * 10
        const spawnX = Math.cos(angle) * distance
        const spawnY = (Math.random() - 0.5) * 15
        const spawnZ = Math.sin(angle) * distance + (Math.random() * 10 - 5)

        fragments.push({
            id: `frag-${i}`,
            modelPath: `/models/fragment_${i}.gltf`, // Placeholders
            restPosition: [restX, restY, restZ],
            restRotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
            spawnPosition: [spawnX, spawnY, spawnZ],
            spawnRotation: [Math.random() * Math.PI * 4, Math.random() * Math.PI * 4, Math.random() * Math.PI],
            delay: Math.random() * 1.5, // 0 to 1.5s delay stagger
            isAssembled: false, // overridden by state
        })
    }
    return fragments
}

function ArcReactorCore({ isAssembled }: { isAssembled: boolean }) {
    const coreRef = useRef<THREE.Mesh>(null)
    const lightRef = useRef<THREE.PointLight>(null)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (coreRef.current) {
            coreRef.current.rotation.z = t * 2
            // Pulse emission
            const intensity = isAssembled ? 2 + Math.sin(t * 4) * 0.5 : 0.2
            if (coreRef.current.material instanceof THREE.MeshStandardMaterial) {
                coreRef.current.material.emissiveIntensity = intensity
            }
        }
        if (lightRef.current) {
            lightRef.current.intensity = isAssembled ? 8 + Math.sin(t * 4) * 2 : 0
        }
    })

    return (
        <group position={[0, 0.2, 0.5]}>
            <mesh ref={coreRef}>
                <torusGeometry args={[0.3, 0.05, 16, 32]} />
                <meshStandardMaterial
                    color="#00d4ff"
                    emissive="#00d4ff"
                    emissiveIntensity={0}
                    toneMapped={false}
                />
            </mesh>
            <pointLight ref={lightRef} color="#00d4ff" intensity={0} distance={10} />
        </group>
    )
}

function Rig() {
    const { viewport, mouse } = useThree()
    useFrame((state) => {
        // Subtle parallax effect based on mouse hover
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 0.5, 0.05)
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.y * 0.5, 0.05)
        state.camera.lookAt(0, 0, 0)
    })
    return null
}
import { useThree } from '@react-three/fiber'

export function SuitAssembly() {
    const { isSuitAssembled } = useStore()
    const fragments = useMemo(() => generateFragments(), [])

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ powerPreference: "high-performance", antialias: false }} // optimized for postprocessing
                dpr={[1, 2]} // limit pixel ratio for performance
            >
                <color attach="background" args={['#0a0a0f']} />

                {/* Lighting */}
                <ambientLight intensity={0.1} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} color="#e8f4f8" castShadow />
                <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#00d4ff" />

                {/* Environment map for realistic reflections on the metal fragments */}
                <Environment preset="city" environmentIntensity={0.2} />

                {/* 3D Objects */}
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

                {/* Particles */}
                <Sparkles
                    count={isSuitAssembled ? 300 : 50}
                    scale={10}
                    size={2}
                    speed={0.4}
                    color="#00d4ff"
                    opacity={0.6}
                />

                {/* Camera interaction */}
                <Rig />

                {/* Cinematic Post-Processing Stack */}
                <EffectComposer multisampling={4}>
                    <Bloom
                        luminanceThreshold={0.5}
                        luminanceSmoothing={0.9}
                        intensity={2.5}
                        levels={8}
                        mipmapBlur
                    />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL}
                        offset={new THREE.Vector2(0.002, 0.002)}
                        radialModulation={false}
                        modulationOffset={0}
                    />
                    <Noise opacity={0.03} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
