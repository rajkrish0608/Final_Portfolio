export interface Achievement {
    id: string
    title: string
    institution: string
    type: 'hackathon' | 'research' | 'award' | 'certification'
    date: string
    description: string
    color: string
    badge?: string
    rank?: string
}

export const achievements: Achievement[] = [
    {
        id: 'harvard',
        title: 'Best Innovation Award',
        institution: 'Harvard Business School Innovation Summit',
        type: 'award',
        date: 'Oct 2024',
        description: 'Recognized for the Neural Interface BCI project among 200+ teams globally. Presented to investors and faculty from Stanford, MIT.',
        color: '#a31018',
        badge: '🏆',
        rank: '1st Place',
    },
    {
        id: 'microsoft-stanford',
        title: 'AI for Good Hackathon Winner',
        institution: 'Microsoft × Stanford AI Lab',
        type: 'hackathon',
        date: 'Aug 2024',
        description: 'Built an adaptive learning system for neurodivergent students using ML personalization. Won $5,000 prize and 3-month mentorship.',
        color: '#0078D4',
        badge: '🥇',
        rank: '1st Place',
    },
    {
        id: 'iiit-delhi',
        title: 'Smart Systems Grand Prix',
        institution: 'IIIT Delhi — Techathlon',
        type: 'hackathon',
        date: 'Mar 2024',
        description: 'Autonomous drone navigation challenge. Completed all 5 mission objectives in record time of 4m 12s.',
        color: '#1a237e',
        badge: '🤖',
        rank: '1st Place',
    },
    {
        id: 'research-paper',
        title: 'EEG-Based Motor Imagery Classification Using Hybrid CNN-LSTM',
        institution: 'IEEE Xplore — ICCSP 2024',
        type: 'research',
        date: 'Jun 2024',
        description: 'Published research paper on BCI signal processing achieving 94.2% accuracy. Accepted for oral presentation.',
        color: '#00d4ff',
        badge: '📄',
    },
    {
        id: 'robotics-club',
        title: 'President — Robotics & AI Club',
        institution: 'University Technical Club',
        type: 'award',
        date: '2023 – Present',
        description: 'Leading 80+ member club. Organized 3 national-level competitions, mentored 20+ junior members.',
        color: '#ffd700',
        badge: '⚙️',
    },
]

export const stats = [
    { label: 'Hackathons Won', value: 8, suffix: '+' },
    { label: 'Projects Built', value: 25, suffix: '+' },
    { label: 'Students Mentored', value: 50, suffix: '+' },
    { label: 'Papers Published', value: 2, suffix: '' },
]
