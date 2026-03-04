export interface Project {
    id: string
    title: string
    description: string
    longDescription: string
    tags: string[]
    domain: 'robotics' | 'ai' | 'iot' | 'web' | 'quantum'
    color: string
    featured?: boolean
    githubUrl?: string
    demoUrl?: string
    year: string
}

export const projects: Project[] = [
    {
        id: 'neural-interface',
        title: 'Neural Interface',
        description: 'Brain-Computer Interface enabling thought-to-digital control with 94% accuracy.',
        longDescription:
            'A cutting-edge BCI system using EEG signal processing and deep learning to decode motor imagery signals. Achieved 94% accuracy in real-time thought-to-digital control using a custom CNN-LSTM architecture. Features adaptive calibration that personalizes to individual neural patterns within 2 minutes.',
        tags: ['Python', 'TensorFlow', 'EEG', 'Signal Processing', 'LSTM', 'BCI'],
        domain: 'ai',
        color: '#00d4ff',
        featured: true,
        year: '2024',
    },
    {
        id: 'autonomous-drone',
        title: 'Autonomous Drone',
        description: 'Full-stack autonomous navigation drone with obstacle avoidance and swarm intelligence.',
        longDescription:
            'Built a quadrotor UAV with fully autonomous navigation using ROS2, SLAM mapping, and a custom obstacle avoidance algorithm. Integrated swarm communication protocol allowing 5 drones to coordinate missions. Used Raspberry Pi 5 + NVIDIA Jetson for edge inference.',
        tags: ['ROS2', 'SLAM', 'Python', 'C++', 'OpenCV', 'Raspberry Pi', 'NVIDIA Jetson'],
        domain: 'robotics',
        color: '#c0392b',
        year: '2024',
    },
    {
        id: 'quantum-computing-api',
        title: 'Quantum Computing API',
        description: 'REST API abstracting quantum circuit execution across IBM Quantum and AWS Braket.',
        longDescription:
            'Developed a unified REST API that abstracts quantum circuit execution across multiple cloud providers (IBM Quantum, AWS Braket, Google Cirq). Implements automatic backend selection based on qubit count and circuit depth. Features circuit optimization middleware reducing gate count by up to 30%.',
        tags: ['Python', 'Qiskit', 'FastAPI', 'AWS Braket', 'Docker', 'Redis'],
        domain: 'quantum',
        color: '#ffd700',
        year: '2023',
    },
    {
        id: 'smart-city-grid',
        title: 'Smart City Grid',
        description: 'IoT mesh network for real-time city infrastructure monitoring and ML-driven optimization.',
        longDescription:
            'Deployed a mesh network of 50+ IoT sensors across a university campus to monitor traffic, energy, and environmental data. ML pipeline predicts energy demand 24h ahead with 91% accuracy. Dashboard built with real-time WebSocket updates and 3D city visualization.',
        tags: ['ESP32', 'MQTT', 'Node-RED', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
        domain: 'iot',
        color: '#00ff88',
        year: '2023',
    },
    {
        id: 'ar-dev-kit',
        title: 'AR Development Kit',
        description: 'Open-source AR SDK for Unity enabling spatial anchoring without proprietary hardware.',
        longDescription:
            'Built an open-source Augmented Reality SDK for Unity3D that enables spatial anchoring and marker-less AR without proprietary hardware. Uses ARCore/ARKit under the hood with a unified API. Includes a visual graph editor for AR interaction design.',
        tags: ['C#', 'Unity3D', 'ARCore', 'ARKit', 'OpenCV', 'SLAM'],
        domain: 'web',
        color: '#8b5cf6',
        year: '2023',
    },
]
