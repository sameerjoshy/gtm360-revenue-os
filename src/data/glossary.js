export const engineStages = [
    { id: 'focus', title: 'Focus & ICP', color: 'blue' },
    { id: 'signals', title: 'Signals & Intent', color: 'indigo' },
    { id: 'execution', title: 'Execution & Flow', color: 'green' },
    { id: 'governance', title: 'Governance & Accuracy', color: 'slate' }
];


export const glossaryTerms = [
    {
        id: 'shadow-funnel',
        slug: 'shadow-funnel',
        title: 'The Shadow Funnel',
        stage: 'focus',
        type: 'Reality',
        visualIcon: 'ghost',
        shortDefinition: 'The 90% of the buying journey that happens in "Dark Social" channels you can\'t track (Slack, WhatsApp, DMs).',
        fullDefinition: 'Attribution software only sees the last click. The Shadow Funnel is where the actual decision happens—in peer-to-peer conversations, communities, and backchannels where your brand is either recommended or roasted without you knowing.',
        relatedPlaybook: { title: 'The 95/5 Rule', link: '/playbooks/the-95-5-rule' }
    },
    {
        id: 'zombie-pipeline',
        slug: 'zombie-pipeline',
        title: 'Zombie Pipeline',
        stage: 'execution',
        type: 'Killer',
        visualIcon: 'skull',
        shortDefinition: 'Opportunities that are dead, but your sales rep keeps pushing the close date because they are afraid to kill it.',
        fullDefinition: 'The accumulation of deals in "Commit" or "Best Case" that have not had a bi-directional interaction in 30+ days. These deals artificially inflate forecasting and give leadership a false sense of security.',
        relatedPlaybook: { title: 'GTM Audit & Diagnostic', link: '/playbooks/gtm-audit-diagnostic' }
    },
    {
        id: 'gtm-debt',
        slug: 'gtm-debt',
        title: 'GTM Debt',
        stage: 'governance',
        type: 'Killer',
        visualIcon: 'alert-triangle',
        shortDefinition: 'The accumulation of quick fixes, bad data, and disconnected tools that eventually slows your revenue velocity to zero.',
        fullDefinition: 'Just like technical debt, GTM Debt gathers interest. Every time you add a field to Salesforce that nobody uses, or launch a campaign without clear signal definitions, you are adding friction to the engine.',
        relatedPlaybook: { title: 'GTM Audit & Diagnostic', link: '/playbooks/gtm-audit-diagnostic' }
    },
    {
        id: 'champion-equity',
        slug: 'champion-equity',
        title: 'Champion\'s Equity',
        stage: 'execution',
        type: 'Currency',
        visualIcon: 'award',
        shortDefinition: 'The limited political capital your internal advocate is willing to spend to sell your product to their boss.',
        fullDefinition: 'You are charge of selling your product, but your Champion is in charge of selling the *project*. Every time they ask for budget, they burn political capital. If you don\'t give them enough ROI ammunition to "refill" their equity, they will ghost you to protect their career.'
    },
    {
        id: 'no-decision-void',
        slug: 'no-decision-void',
        title: 'The "No-Decision" Void',
        stage: 'execution',
        type: 'Killer',
        visualIcon: 'cloud-off',
        shortDefinition: 'Your biggest competitor. Not another vendor, but the status quo.',
        fullDefinition: '40-60% of B2B deals end in "No Decision". This usually happens because the vendor proved their solution was "Better" but failed to prove the problem was "Urgent". Value beats Competitors; Urgency beats Status Quo.'
    },
    {
        id: 'signal-vs-noise',
        slug: 'signal-vs-noise',
        title: 'Signal > Noise',
        stage: 'signals',
        type: 'Principle',
        visualIcon: 'activity',
        shortDefinition: 'The discipline of ignoring "Vanity Activity" (MQLs, Email Opens) in favor of "verification events".',
        fullDefinition: 'Noise is high-volume, low-intent data (e.g., a webinar download). Signal is low-volume, high-intent behavior (e.g., viewing the pricing page 3 times or inviting a colleague to the workspace).'
    },
    {
        id: 'revenue-leakage',
        slug: 'revenue-leakage',
        title: 'Revenue Leakage',
        stage: 'governance',
        type: 'Killer',
        visualIcon: 'droplet',
        shortDefinition: 'The silent compounding loss of revenue due to inefficient handoffs and poor process.',
        fullDefinition: 'It’s the 8% of deals that slip because of bad notes. The 5% churn because CS didn\'t know the customer\'s goals. The 10% of leads ignored because they lacked a phone number. It adds up to 30%+ of your growth potential.',
        relatedPlaybook: { title: 'GTM Audit & Diagnostic', link: '/playbooks/gtm-audit-diagnostic' }
    },
    {
        id: 'founders-dilemma',
        slug: 'founders-dilemma',
        title: 'The Founder\'s Dilemma',
        stage: 'focus',
        type: 'Trap',
        visualIcon: 'user',
        shortDefinition: 'The inability to switch from "Hero Mode" (doing everything) to "Architect Mode" (building systems).',
        fullDefinition: 'Founders often scale the company by working harder. But eventually, you can\'t work 100 hours a week. To cross $10M ARR, you must stop being the best player on the field and start being the coach who designed the playbook.'
    },
    {
        id: 'nrr-is-king',
        slug: 'nrr-is-king',
        title: 'NRR > ARR',
        stage: 'governance',
        type: 'Metric',
        visualIcon: 'trending-up',
        shortDefinition: 'Net Revenue Retention is the only metric that proves you have a business, not just a sales team.',
        fullDefinition: 'If your NRR is <100%, you are filling a leaky bucket. If it is >120%, you can stop marketing and still grow. NRR measures the true product-market fit unlike ARR, which just measures sales efficacy.'
    },
    {
        id: 'buying-committee',
        slug: 'buying-committee',
        title: 'The Hidden Committee',
        stage: 'execution',
        type: 'Reality',
        visualIcon: 'users',
        shortDefinition: 'The 6-10 people who actually decide if you get paid, most of whom you will never talk to.',
        fullDefinition: 'Standard sales treats the "Lead" as the buyer. Modern enterprise sales acknowledges that the "Lead" is just the door opener. The real buyer is a committee of Finance (No), Security (No), and Legal (Slow). Multithreading is the only cure.'
    },
    {
        id: 'plg-trap',
        slug: 'plg-trap',
        title: 'The PLG Trap',
        stage: 'focus',
        type: 'Trap',
        visualIcon: 'mouse-pointer',
        shortDefinition: 'The mistaken belief that "Product-Led Growth" means "We don\'t need sales reps".',
        fullDefinition: 'PLG opens the door, but SLG (Sales-Led Growth) closes the enterprise contract. Pure PLG hits a ceiling at ~$5M ARR. The best companies overlap them: Product attracts users; Sales navigates the procurement process for the enterprise license.'
    },
    {
        id: 'feature-factory',
        slug: 'feature-factory',
        title: 'The Feature Factory',
        stage: 'execution',
        type: 'Trap',
        visualIcon: 'box',
        shortDefinition: 'A product team that measures success by "shipping code" rather than "solving problems".',
        fullDefinition: 'When the roadmap is driven by "Sales needs this to close one deal" rather than strategic vision. The result is a bloated product that does 100 things poorly and nothing perfectly.'
    },
    {
        id: 'cac-payback',
        slug: 'cac-payback',
        title: 'CAC Payback (The Speed Limit)',
        stage: 'governance',
        type: 'Metric',
        visualIcon: 'clock',
        shortDefinition: 'How many months it takes to earn back the cost of acquiring a customer. This is your growth speed limit.',
        fullDefinition: 'If your Payback period is >15 months, you will run out of cash before you grow. If it is <9 months, you should be spending every dollar you have on growth. It is the single most important efficiency metric in SaaS.'
    },
    {
        id: 'dark-social',
        slug: 'dark-social',
        title: 'Dark Social',
        stage: 'focus',
        type: 'Reality',
        visualIcon: 'message-square',
        shortDefinition: 'The invisible network of peer-to-peer influence that drives 80% of B2B buying decisions.',
        fullDefinition: 'Slack communities, Reddit threads, text messages between CROs. This is where the brand is built. You can\'t track it, but you can influence it by creating content that is "insanely shareable".',
        relatedPlaybook: { title: 'The 95/5 Rule', link: '/playbooks/the-95-5-rule' }
    },
    {
        id: 'rev-engineering',
        slug: 'revenue-engineering',
        title: 'Revenue Engineering',
        stage: 'governance',
        type: 'Discipline',
        visualIcon: 'cpu',
        shortDefinition: 'Treating the GTM function as a machine with mathematical inputs and outputs, rather than a department of people.',
        fullDefinition: 'The shift from "Art" to "Science". Revenue Engineers don\'t ask "How do we motivate the reps?" They ask "What is the conversion rate delta between Stage 2 and 3, and what constraint is causing it?"'
    }
];
