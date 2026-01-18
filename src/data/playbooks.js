
export const playbooks = [
    {
        id: "marketing-95-5-rule",
        slug: "the-95-5-rule",
        category: "Marketing",
        title: "The 95/5 Rule: Fixing B2B Demand",
        subtitle: "Why 95% of your buyers are not in-market, and why your ads are annoying them.",
        readTime: "5 min read",
        difficulty: "Strategic", // Strategic, Tactical, Operational
        author: "GTM-360 Intelligence",
        lastUpdated: "January 2026",
        content: {
            onePager: `
                <h3>The Core Concept</h3>
                <p>The 95/5 Rule (popularized by the LinkedIn B2B Institute) states that at any given moment, <strong>95% of your total addressable market is NOT ready to buy</strong>. Only 5% are actively in-market.</p>
                <p>Most B2B marketing fails because it treats the 95% like the 5%.</p>
                
                <h3>The Trap: "Direct Response" Addiction</h3>
                <p>Companies addicted to attribution software (HubSpot, GA4) prioritize "Capture" over "Creation" because Capture is measurable.</p>
                <ul>
                    <li>You run "Book a Demo" ads to cold audiences.</li>
                    <li>The 95% (who aren't ready) ignore you.</li>
                    <li>The 5% (who are ready) are expensive because everyone is bidding on them.</li>
                    <li>Result: High CPA, low brand recall, and a pipeline that dries up the moment you stop spending.</li>
                </ul>

                <h3>The Shift: A Two-Track System</h3>
                <p>You need two distinct operating modes:</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div class="bg-blue-50 p-4 border-l-4 border-blue-500">
                        <h4 class="font-bold text-blue-900 mt-0">Track A: Demand Creation (The 95%)</h4>
                        <ul class="text-sm text-blue-800">
                            <li><strong>Goal:</strong> Memory (Mental Availability)</li>
                            <li><strong>Metric:</strong> Reach, Consumption, Recall</li>
                            <li><strong>Content:</strong> Education, Story, POV</li>
                            <li><strong>Offer:</strong> "Learn how to X"</li>
                        </ul>
                    </div>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500">
                        <h4 class="font-bold text-green-900 mt-0">Track B: Demand Capture (The 5%)</h4>
                        <ul class="text-sm text-green-800">
                            <li><strong>Goal:</strong> Conversion (Physical Availability)</li>
                            <li><strong>Metric:</strong> Pipeline, Revenue</li>
                            <li><strong>Content:</strong> Proof, Pricing, Case Studies</li>
                            <li><strong>Offer:</strong> "Fix problem X now"</li>
                        </ul>
                    </div>
                </div>

                <h3>Implementation</h3>
                <p>Stop asking your Demand Creation ads to generate leads. Ask them to generate <strong>trust</strong>. When the 95% eventually enter the market (in 3, 6, or 12 months), you win automatically because you are the only vendor they remember.</p>
            `,
            scriptShort: `
                <strong>[HOOK - 0:00-0:05]</strong><br/>
                Stop trying to sell to people who aren't buying.<br/>
                If you are running "Book a Demo" ads to cold traffic, you are lighting money on fire.<br/><br/>

                <strong>[THE INSIGHT - 0:05-0:30]</strong><br/>
                Here is the math: The "95/5 Rule".<br/>
                At any given moment, 95% of your market is NOT ready to buy. They don't care about your software. They care about their problems.<br/>
                Only 5% are ready. And everyone is fighting for them.<br/><br/>

                <strong>[THE SHIFT - 0:30-0:50]</strong><br/>
                Smart companies split their marketing.<br/>
                For the 5%: Show them the product. Capture the demand.<br/>
                But for the 95%: Stop selling. Start teaching.<br/>
                Build a relationship <em>before</em> they need you. So when they <em>do</em> need you, they don't Google your competitors. They just call you.<br/><br/>

                <strong>[CTA - 0:50-1:00]</strong><br/>
                Capture the 5%. Educate the 95%.<br/>
                Don't mix them up.
            `,
            scriptDeepDive: `
                <strong>Topic:</strong> Why Attribution Software Killed Marketing Strategy<br/>
                <strong>Format:</strong> Fireside Chat / Solo Analysis<br/>
                <strong>Duration:</strong> 10-15 Minutes<br/><br/>

                <strong>Section 1: The " Attribution Trap"</strong><br/>
                - Start with a story: "The CEO who cut all brand spend because 'it doesn't show up in HubSpot'."<br/>
                - Explain why attribution tools favor "Bottom of Funnel" (Google Search) vs. "Top of Funnel" (LinkedIn/Podcast).<br/>
                - The "Last Touch" fallacy.<br/><br/>

                <strong>Section 2: The 95/5 Rule Explained</strong><br/>
                - Reference: LinkedIn B2B Institute / Ehrenberg-Bass.<br/>
                - The concept of "Mental Availability" vs. "Physical Availability".<br/>
                - Why "Brand" is not a logo, it's "Future Cash Flow".<br/><br/>

                <strong>Section 3: The "Split Funnel" Model</strong><br/>
                - How to structure the team.<br/>
                - <strong>Team A (Media):</strong> Competing for attention. KPI: Consumption.<br/>
                - <strong>Team B (Growth):</strong> Competing for dollars. KPI: Pipeline.<br/><br/>

                <strong>Section 4: Actionable Steps</strong><br/>
                - Audit your ad account. What % is "Ask" vs. "Give"?<br/>
                - If it's >80% "Ask", you are over-harvesting and under-planting.<br/>
            `
        },
        relatedService: {
            title: "Fix Your Go-To-Market Model",
            link: "/services/gtm-operating-model"
        }
    },
    // Placeholder for future sales playbook
    {
        id: "sales-multithreading",
        slug: "the-multithreaded-close",
        category: "Sales",
        title: "The Multithreaded Close",
        subtitle: "Why single-threaded deals die, and how to engineer consensus.",
        readTime: "Coming Soon",
        difficulty: "Tactical",
        author: "GTM-360 Intelligence",
        lastUpdated: "Coming Soon",
        content: null // Indicates coming soon
    }
];
