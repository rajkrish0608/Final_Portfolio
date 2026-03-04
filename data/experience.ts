export interface Experience {
    id: string
    title: string
    company: string
    location: string
    period: string
    description: string[]
    techStack: string[]
    type: 'internship' | 'project' | 'contribution'
    color: string
}

export const experiences: Experience[] = [
    {
        id: 'alpixn',
        title: 'Robotics & AI Intern',
        company: 'Alpixn Technologies',
        location: 'Remote / Bengaluru',
        period: 'Jun 2024 – Aug 2024',
        description: [
            'Developed autonomous navigation algorithms for warehouse robots using ROS2 and Nav2 stack.',
            'Optimized computer vision models for edge deployment on NVIDIA Jetson Orin, reducing latency by 40%.',
            'Implemented real-time sensor fusion (LiDAR + IMU + Odom) for high-precision mapping in GPS-denied environments.',
            'Collaborated with senior engineers to transition prototype code to production-ready C++ modules.'
        ],
        techStack: ['ROS2', 'C++', 'Python', 'NVIDIA Jetson', 'OpenCV', 'TensorFlow'],
        type: 'internship',
        color: '#00d4ff',
    },
    {
        id: 'bci-research',
        title: 'Lead Researcher',
        company: 'University BCI Lab',
        location: 'Campus',
        period: 'Jan 2024 – Present',
        description: [
            'Designing end-to-end BCI systems for assistive technology.',
            'Lead the experimental design for motor imagery data collection from 20+ participants.',
            'Secured university grant of $2,000 for purchasing high-density EEG headsets.'
        ],
        techStack: ['Python', 'MNE', 'SciPy', 'Deep Learning', 'EEG'],
        type: 'project',
        color: '#c0392b',
    },
    {
        id: 'open-source-robotics',
        title: 'Core Contributor',
        company: 'Mission-Ros-Package (Open Source)',
        location: 'GitHub',
        period: '2023 – Present',
        description: [
            'Maintained and optimized legacy driver software for several low-cost LiDAR sensors.',
            'Implemented a custom URDF generator tool for modular robotic arms.',
            'Active member of the ROS infrastructure working group.'
        ],
        techStack: ['ROS', 'C++', 'CMake', 'Docker'],
        type: 'contribution',
        color: '#ffd700',
    }
]
