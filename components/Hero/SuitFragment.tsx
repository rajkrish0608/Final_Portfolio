'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

export interface SuitFragmentProps {
    id: string
    modelPath: string
    restPosition: [number, number, number]
    restRotation: [number, number, number]
    spawnPosition: [number, number, number]
    spawnRotation: [number, number, number]
    delay: number
    isAssembled: boolean
}

// Declarative geometry component prevents sharing the same WebGL buffer between solid and wireframe meshes
function FragmentGeometry({ type }: { type: number }) {
    switch (type) {
        case 0: return <icosahedronGeometry args={[0.35, 1]} /> // Detailed angular shard
        case 1: return <octahedronGeometry args={[0.4, 1]} />  // Shield plate
        case 2: return <tetrahedronGeometry args={[0.45, 1]} /> // Triangle plating
        case 3: return <boxGeometry args={[0.6, 0.25, 0.2]} /> // Heavy strut
        case 4: return <cylinderGeometry args={[0.1, 0.2, 0.5, 8]} /> // Mechanical piston/joint
        default: return <icosahedronGeometry args={[0.35, 1]} />
    }
}

export function SuitFragment({
    id,
    restPosition,
    restRotation,
    spawnPosition,
    spawnRotation,
    delay,
    isAssembled,
}: SuitFragmentProps) {
    const groupRef = useRef<THREE.Group>(null)
    const meshRef = useRef<THREE.Mesh>(null)
    const matRef = useRef<THREE.MeshPhysicalMaterial>(null)
    const animatedRef = useRef(false)
    const index = parseInt(id.replace('frag-', ''), 10) || 0

    const type = index % 5

    // Materials — varied solid armor plates (Gunmetal, Deep Red, Silver, Dark Gray)
    const material = useMemo(() => {
        let baseColor = '#1a1a1a' // Gunmetal

        // Distribute colors based on fragment index to look like different suit parts
        if (index % 4 === 1) baseColor = '#8b0000' // Deep Red accent
        else if (index % 4 === 2) baseColor = '#aaaaaa' // Silver accent
        else if (index % 4 === 3) baseColor = '#0f0f0f' // Dark plate

        return new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(baseColor),
            metalness: 0.95,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            emissive: new THREE.Color('#00d4ff'),
            emissiveIntensity: 0.0, // Only glows on lock
            wireframe: false,
            transparent: false,
            opacity: 1.0,
        })
    }, [index])

    // Assembly animation — triggered by isAssembled prop
    useEffect(() => {
        if (!groupRef.current) return

        const group = groupRef.current

        if (isAssembled && !animatedRef.current) {
            animatedRef.current = true

            // Position animation — fly to rest
            gsap.to(group.position, {
                x: restPosition[0],
                y: restPosition[1],
                z: restPosition[2],
                duration: 2.0,
                delay,
                ease: 'power3.inOut',
            })

            // Rotation — smooth lock
            gsap.to(group.rotation, {
                x: restRotation[0],
                y: restRotation[1],
                z: restRotation[2],
                duration: 2.0,
                delay,
                ease: 'power3.inOut',
            })

            // Scale — spring in
            gsap.fromTo(
                group.scale,
                { x: 0.3, y: 0.3, z: 0.3 },
                {
                    x: 1, y: 1, z: 1,
                    duration: 2.0,
                    delay,
                    ease: 'elastic.out(1, 0.5)',
                }
            )

            // Emission flash on lock
            if (material) {
                gsap.to(material, {
                    emissiveIntensity: 0.8,
                    duration: 0.15,
                    delay: delay + 1.8,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.to(material, {
                            emissiveIntensity: 0.05,
                            duration: 1.5,
                            ease: 'power2.inOut',
                        })
                    },
                })
            }
        } else if (!isAssembled) {
            animatedRef.current = false
            // Reset to spawn position
            gsap.to(group.position, {
                x: spawnPosition[0],
                y: spawnPosition[1],
                z: spawnPosition[2],
                duration: 1.5,
                ease: 'power2.inOut',
            })
            gsap.to(group.rotation, {
                x: spawnRotation[0],
                y: spawnRotation[1],
                z: spawnRotation[2],
                duration: 1.5,
                ease: 'power2.inOut',
            })
        }
    }, [isAssembled, delay, restPosition, restRotation, spawnPosition, spawnRotation, material])

    // Per-frame idle animation
    useFrame(({ clock }) => {
        if (!groupRef.current) return
        const t = clock.getElapsedTime()

        if (!isAssembled) {
            // Scattered: gentle drift + rotation
            groupRef.current.position.y += Math.sin(t * 1.5 + delay * 10) * 0.003
            groupRef.current.rotation.x += 0.002
            groupRef.current.rotation.y += 0.001
        } else if (animatedRef.current) {
            // Assembled: tiny breathing micro-motion
            groupRef.current.position.y += Math.sin(t * 2 + index) * 0.0005
        }
    })

    return (
        <group
            ref={groupRef}
            position={spawnPosition}
            rotation={spawnRotation}
            scale={[0.5, 0.5, 0.5]}
        >
            {/* Solid Armor Mesh */}
            <mesh ref={meshRef} castShadow receiveShadow>
                <FragmentGeometry type={type} />
                <primitive object={material} attach="material" ref={matRef} />
            </mesh>
        </group>
    )
}
