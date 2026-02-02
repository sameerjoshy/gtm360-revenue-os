
import {
    Database, Mail, Activity, PenTool, MessageSquare, Monitor, Disc,
    TrendingUp, ShieldCheck, Search, Crosshair, Network, FileText
} from 'lucide-react';



export const agentSwarms = [
    {
        id: 'outbound-swarm',
        title: 'Outbound Swarm',
        subtitle: 'Target, Enrich, & Engage',
        color: 'from-blue-500/10 to-indigo-500/5',
        border: 'border-blue-200/50',
        icon: Network,
        agents: [
            {
                id: 'researcher', // keeping ID stable for routing
                name: 'Signals Scout',
                role: 'Signal-to-Intent Owner',
                status: 'ACTIVE',
                icon: Database,
                route: '/agents/researcher',
                description: 'Converts weak external signals into a human-reviewable intent judgment.',
                capabilities: [
                    'Scrapes Homepage & Careers',
                    'Detects Tech Stack',
                    'Finds Funding News',
                    'Scores against ICP'
                ],
                faqs: [
                    { q: 'How does it find data?', a: 'It uses Tavily to search the live web and scrapes specific corporate pages.' },
                    { q: 'Is it accurate?', a: 'It double-verifies claims against an "Evidence Graph" to prevent hallucinations.' }
                ]
            },
            {
                id: 'sniper',
                name: 'Sniper',
                role: 'Multi-Channel Outreach',
                status: 'ACTIVE',
                icon: Mail,
                route: '/agents/sniper',
                description: 'Precision Outbound Drafting Engine',
                capabilities: [
                    'Generates personalized emails',
                    'Selects relevant hooks',
                    'Self-critiques drafts',
                    'Checks deliverability'
                ],
                faqs: [
                    { q: 'Does it send emails?', a: 'No, it only drafts them for your review. Humans must click "Approve".' },
                    { q: 'Can I change the tone?', a: 'Yes, use the "Advanced Context" settings to inject your own style guide.' }
                ]
            },
            {
                id: 'scraper',
                name: 'Listener',
                role: 'Market Ear',
                status: 'ACTIVE',
                icon: Activity,
                route: '/agents/listener',
                description: 'Real-time Signal Monitoring & Veto',
                capabilities: [
                    'Ingests Raw Market Events',
                    'Validates against Canon',
                    'Vetoes Non-ICP Signals',
                    'Governs Outreach Decisions'
                ],
                faqs: [
                    { q: 'What signals does it track?', a: '52 canonical triggers including Funding, Hiring, and Tech changes.' },
                    { q: 'Does it auto-email?', a: 'Rarely. It defaults to "Research". Outreach requires strict criteria.' }
                ]
            }
        ]
    },
    {
        id: 'sales-swarm',
        title: 'Sales Swarm',
        subtitle: 'Close & Convert',
        color: 'from-orange-500/10 to-red-500/5',
        border: 'border-orange-200/50',
        icon: Activity,
        agents: [
            {
                id: 'deal-intel',
                name: 'Deal Room',
                role: 'Deal Intelligence',
                status: 'ACTIVE',
                icon: Search,
                route: '/agents/sales',
                description: 'Live Deal Context & Risk Analysis',
                capabilities: [
                    'Summarizes Deal History',
                    'Maps Stakeholders',
                    'Calculates Buyer Readiness',
                    'Flags Risk Factors'
                ],
                faqs: [
                    { q: 'Where does it get data?', a: 'It reads deal notes and emails from your CRM (HubSpot).' },
                    { q: 'Can it update the deal?', a: 'It suggests updates to the "Next Steps" field but does not change stages.' }
                ]
            }
        ]
    },
    {
        id: 'cs-swarm',
        title: 'CS Swarm',
        subtitle: 'Retain & Expand',
        color: 'from-emerald-500/10 to-teal-500/5',
        border: 'border-emerald-200/50',
        icon: TrendingUp,
        agents: [
            {
                id: 'expansion',
                name: 'Expansion',
                role: 'Upsell Signal Detection',
                status: 'ACTIVE',
                icon: TrendingUp,
                route: '/agents/expansion',
                description: 'Identifies Accounts Ready for Growth',
                capabilities: [
                    'Monitors Seat Utilization',
                    'Detects Feature Spikes',
                    'Drafts Upsell Proposals',
                    'Tracks API Usage'
                ],
                faqs: [
                    { q: 'What signals trigger an upsell?', a: 'Typically >90% license utilization or high usage of premium features.' },
                    { q: 'Who sees the proposal?', a: 'It creates an internal brief for the Account Manager, not the client.' }
                ]
            }
        ]
    },
    {
        id: 'ops-swarm',
        title: 'RevOps Swarm',
        subtitle: 'Synchronize & Enable',
        color: 'from-slate-500/10 to-gray-500/5',
        border: 'border-slate-200/50',
        icon: Database,
        agents: [
            {
                id: 'data-hygiene',
                name: 'Hygiene',
                role: 'Data Integrity Monitor',
                status: 'ACTIVE',
                icon: ShieldCheck,
                route: '/agents/revops',
                description: 'Self-Healing CRM Guard',
                capabilities: [
                    'Detects Stale Deals',
                    'Identifies Missing Fields',
                    'Calculates Health Score',
                    'Auto-Fixes Contact Data'
                ],
                faqs: [
                    { q: 'How often does it scan?', a: 'Ideally daily. Currently runs on-demand via the dashboard.' },
                    { q: 'Is it safe?', a: 'It only flags issues. "Auto-Fix" requires your explicit confirmation.' }
                ]
            }
        ]
    },
    {
        id: 'exec-swarm',
        title: 'Executive Swarm',
        subtitle: 'Synthesize & Direct',
        color: 'from-slate-800/10 to-black/5',
        border: 'border-slate-800/20',
        icon: Monitor,
        agents: [
            {
                id: 'executive',
                name: 'Chief of Staff',
                role: 'Executive Briefing',
                status: 'ACTIVE',
                icon: FileText,
                route: '/agents/executive',
                description: 'Weekly Strategy & Risk Synthesis',
                capabilities: [
                    'Aggregates all Swarm Data',
                    'Identifies Systemic Risks',
                    'Writes Weekly Memos',
                    'Suggests Strategic Moves'
                ],
                faqs: [
                    { q: 'Who writes the memo?', a: 'The Agent synthesizes inputs from Researcher, Sales, and CS agents.' },
                    { q: 'Can I edit the format?', a: 'Yes, it follows a strict "Smart Brevity" template you can adjust.' }
                ]
            }
        ]
    }
];
