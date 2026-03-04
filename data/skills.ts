export interface Skill {
    id: string
    name: string
    level: number // 0-100
    category: 'aiml' | 'robotics' | 'programming' | 'web'
    color: string
    detail: string
}

export const skills: Skill[] = [
    // AI/ML Core
    { id: 'tensorflow', name: 'TensorFlow', level: 90, category: 'aiml', color: '#FF6F00', detail: 'Deep learning, CNNs, RNNs, GANs' },
    { id: 'pytorch', name: 'PyTorch', level: 85, category: 'aiml', color: '#EE4C2C', detail: 'Research models, custom layers, RL' },
    { id: 'nlp', name: 'NLP / LLMs', level: 80, category: 'aiml', color: '#00d4ff', detail: 'Transformers, fine-tuning, RAG' },
    { id: 'computer-vision', name: 'Computer Vision', level: 88, category: 'aiml', color: '#00ff88', detail: 'YOLO, SLAM, depth estimation' },
    { id: 'reinforcement', name: 'Reinforcement Learning', level: 75, category: 'aiml', color: '#ffd700', detail: 'PPO, SAC, multi-agent systems' },

    // Robotics & Hardware
    { id: 'ros', name: 'ROS / ROS2', level: 85, category: 'robotics', color: '#c0392b', detail: 'Nav2, MoveIt, sensor fusion' },
    { id: 'arduino', name: 'Arduino / ESP32', level: 92, category: 'robotics', color: '#00979D', detail: 'Firmware, real-time control loops' },
    { id: 'raspberry', name: 'Raspberry Pi', level: 90, category: 'robotics', color: '#A22846', detail: 'Edge ML, camera, GPIO, I2C' },
    { id: 'embedded', name: 'Embedded C/C++', level: 80, category: 'robotics', color: '#f48024', detail: 'RTOS, bare metal, drivers' },

    // Programming
    { id: 'python', name: 'Python', level: 95, category: 'programming', color: '#3776AB', detail: 'ML, scripting, APIs, automation' },
    { id: 'cpp', name: 'C++', level: 82, category: 'programming', color: '#00599C', detail: 'Robotics, performance, STL' },
    { id: 'typescript', name: 'TypeScript', level: 88, category: 'programming', color: '#3178C6', detail: 'Full-stack, Next.js, type safety' },

    // Web Systems
    { id: 'nextjs', name: 'Next.js', level: 88, category: 'web', color: '#ffffff', detail: 'SSR, SSG, App Router, Vercel' },
    { id: 'threejs', name: 'Three.js / WebGL', level: 78, category: 'web', color: '#049EF4', detail: '3D scenes, shaders, R3F' },
    { id: 'docker', name: 'Docker / K8s', level: 75, category: 'web', color: '#2496ED', detail: 'Containerization, orchestration' },
]

export const skillCategories = [
    { id: 'aiml', label: 'AI / ML Core', color: '#00d4ff' },
    { id: 'robotics', label: 'Robotics & Hardware', color: '#c0392b' },
    { id: 'programming', label: 'Programming', color: '#ffd700' },
    { id: 'web', label: 'Web Systems', color: '#00ff88' },
] as const
