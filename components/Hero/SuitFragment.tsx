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

// Generate varied procedural geometry based on fragment index
function getGeometry(index: number): THREE.BufferGeometry {
    const type = index % 5
    switch (type) {
        case 0: return new THREE.IcosahedronGeometry(0.25, 0) // angular shard
        case 1: return new THREE.OctahedronGeometry(0.3, 0)  // diamond piece
        case 2: return new THREE.TetrahedronGeometry(0.35, 0) // triangle shard
        case 3: return new THREE.BoxGeometry(0.5, 0.2, 0.15) // plate
        case 4: return new THREE.CylinderGeometry(0.05, 0.15, 0.4, 6) // strut
        default: return new THREE.IcosahedronGeometry(0.25, 0)
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

    // Generate geometry once
    const geometry = useMemo(() => getGeometry(index), [index])

    // Material — dark metal with subtle wireframe
    const material = useMemo(() => {
        return new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#1a1a2e'),
            metalness: 0.9,
            roughness: 0.15,
            clearcoat: 0.8,
            clearcoatRoughness: 0.1,
            emissive: new THREE.Color('#00d4ff'),
            emissiveIntensity: 0.02,
            wireframe: true,
            transparent: true,
            opacity: 0.85,
        })
    }, [])

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
            scale={[0.3, 0.3, 0.3]}
        >
            <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
                <primitive object={material} attach="material" ref={matRef} />
            </mesh>
            {/* Edge glow outline */}
            <mesh geometry={geometry}>
                <meshBasicMaterial
                    color="#00d4ff"
                    wireframe
                    transparent
                    opacity={0.08}
                />
            </mesh>
        </group>
    )
}
