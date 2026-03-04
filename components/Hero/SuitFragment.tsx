'use client'

import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
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

export function SuitFragment({
    modelPath,
    restPosition,
    restRotation,
    spawnPosition,
    spawnRotation,
    delay,
    isAssembled,
}: SuitFragmentProps) {
    const groupRef = useRef<THREE.Group>(null)
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)

    // Try to load the model. If it doesn't exist yet, we'll use a fallback geometry.
    // In a real scenario, you'd have the actual GLTF models.
    // We'll create a procedural fallback if useGLTF fails.
    const loadFailed = useRef(false)
    let gltf: any = null
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        gltf = useGLTF(modelPath)
    } catch (e) {
        loadFailed.current = true
    }

    // Animation logic
    useEffect(() => {
        if (!groupRef.current) return

        const obj = groupRef.current

        if (isAssembled) {
            // Assemble animation
            gsap.to(obj.position, {
                x: restPosition[0],
                y: restPosition[1],
                z: restPosition[2],
                duration: 2.5,
                delay: delay,
                ease: 'power3.inOut',
            })
            gsap.to(obj.rotation, {
                x: restRotation[0],
                y: restRotation[1],
                z: restRotation[2],
                duration: 2.5,
                delay: delay,
                ease: 'power3.inOut',
            })

            // Flash emission on assembly
            if (materialRef.current) {
                gsap.to(materialRef.current.emissive, {
                    r: 0, g: 0.8, b: 1, // #00d4ff
                    duration: 0.2,
                    delay: delay + 2.3,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.out'
                })
            }
        } else {
            // Return to spawn / scattered state
            gsap.to(obj.position, {
                x: spawnPosition[0],
                y: spawnPosition[1],
                z: spawnPosition[2],
                duration: 1.5,
                ease: 'power2.inOut',
            })
            gsap.to(obj.rotation, {
                x: spawnRotation[0],
                y: spawnRotation[1],
                z: spawnRotation[2],
                duration: 1.5,
                ease: 'power2.inOut',
            })
        }
    }, [isAssembled, delay, restPosition, restRotation, spawnPosition, spawnRotation])

    // Float slightly when scattered
    useFrame((state) => {
        if (!isAssembled && groupRef.current) {
            const t = state.clock.getElapsedTime()
            groupRef.current.position.y += Math.sin(t * 2 + delay) * 0.002
            groupRef.current.rotation.x += Math.sin(t * 0.5 + delay) * 0.001
            groupRef.current.rotation.y += Math.cos(t * 0.5 + delay) * 0.001
        }
    })

    // Procedural material for fragments (Iron Man Mark II/III style)
    const fragmentMaterial = new THREE.MeshPhysicalMaterial({
        color: '#0d0d1a', // Dark metal
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2,
        emissive: new THREE.Color('#00d4ff'),
        emissiveIntensity: 0.05,
        wireframe: true, // Wireframe looks cooler if models aren't present
    })

    // Since we don't have actual GLTF files in public/models/, 
    // we will render a fallback dynamic geometry.
    return (
        <group ref={groupRef} position={spawnPosition} rotation={spawnRotation}>
            {gltf && !loadFailed.current ? (
                <primitive object={gltf.scene.clone()} />
            ) : (
                // Fallback procedural geometry (abstract tech fragment)
                <mesh castShadow receiveShadow>
                    <icosahedronGeometry args={[0.4, 0]} />
                    <primitive object={fragmentMaterial} attach="material" ref={materialRef} />
                </mesh>
            )}
        </group>
    )
}
