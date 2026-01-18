
export const playbooks = [
    {
        id: "marketing-95-5-rule",
        slug: "the-95-5-rule",
        category: "Marketing",
        title: "The 95/5 Rule: Fixing B2B Demand",
        subtitle: "Why 95% of your buyers are not in-market, and why your ads are annoying them.",
        readTime: "5 min read",
        difficulty: "Strategic",
        author: "GTM-360 Intelligence",
        lastUpdated: "January 2026",
        content: {
            onePager: `
                <h3>The Core Concept</h3>
                <p>The 95/5 Rule states that at any given moment, <strong>95% of your total addressable market is NOT ready to buy</strong>. Only 5% are actively in-market.</p>
                <p>Most B2B marketing fails because it uses "Hunters" (Lead Gen) to do a "Farmer's" job (Brand Gen).</p>
                
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
                <p>Stop asking your Demand Creation ads to generate leads. Ask them to generate <strong>trust</strong>. When the 95% eventually enter the market, you win automatically because you are the only vendor they remember.</p>
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

                <strong>Section 1: The "Attribution Trap"</strong><br/>
                - Start with a story: "The CEO who cut all brand spend because 'it doesn't show up in HubSpot'."<br/>
                - Explain the "Last Touch" fallacy.<br/><br/>

                <strong>Section 2: The 95/5 Rule Explained</strong><br/>
                - Reference: LinkedIn B2B Institute / Ehrenberg-Bass.<br/>
                - Mental Availability vs. Physical Availability.<br/><br/>

                <strong>Section 3: The "Split Funnel" Model</strong><br/>
                - How to structure the team.<br/>
                - Team A (Media) vs. Team B (Growth).<br/><br/>

                <strong>Section 4: Actionable Steps</strong><br/>
                - Audit your ad account. What % is "Ask" vs. "Give"?<br/>
            `,
            bestPracticeSnippets: [
                "Stop asking Demand Creation ads to generate leads. Ask them to generate trust.",
                "Mental Availability is won when the buyer isn't in-market. Physical Availability is won when they are.",
                "Split your budget: 80% for the 95% (Educate), 20% for the 5% (Capture).",
                "If you can't describe your POV in one sentence without mentioning your product features, you don't have a strategy."
            ]
        },
        relatedService: {
            title: "Fix Your Go-To-Market Model",
            link: "/services/gtm-operating-model"
        }
    },
    {
        id: "sales-multithreading",
        slug: "the-multithreaded-close",
        category: "Sales",
        title: "The Multithreaded Close",
        subtitle: "Why single-threaded deals die, and how to engineer consensus without being annoying.",
        readTime: "7 min read",
        difficulty: "Tactical",
        author: "GTM-360 Intelligence",
        lastUpdated: "January 2026",
        content: {
            onePager: `
                <h3>The Core Concept</h3>
                <p><strong>Deals don't die because of competitors. They die because of Indecision.</strong></p>
                <p>Indecision happens when you have a "Champion" who loves you, but a "Budget Holder" who doesn't know you exist. The deal stalls in the gap between them.</p>
                <p>The "Multithreaded Close" is not about emailing everyone. It's about engineering a consensus event.</p>

                <h3>The Trap: "Happy Ears"</h3>
                <p>Reps love talking to Champions because Champions are nice. They return calls. They say "We love the demo."</p>
                <p>But Champions rarely sign the check. In modern B2B, the average buying group is 6-10 people. If you are only talking to 1, your deal is 90% risk.</p>

                <h3>The Shift: The Committee Map</h3>
                <p>You must validate three roles in every deal before Stage 3:</p>
                <ul class="list-disc pl-5 my-4 space-y-2">
                    <li><strong>The Champion (User):</strong> Owns the pain.</li>
                    <li><strong>The Economic Buyer (Approver):</strong> Owns the budget. Cares about ROI/Risk.</li>
                    <li><strong>The Technical Validator (Blocker):</strong> Owns the integration. Cares about security/compliance.</li>
                </ul>

                <h3>Implementation: The "Access" Ask</h3>
                <p>Don't go around your Champion. Go <em>with</em> them.</p>
                <p><em>"Hey Champion, usually at this stage, the CFO asks about X and Y. I don't want you to get stuck answering that alone. Can we spend 15 mins with them to arm you with the right data?"</em></p>
            `,
            scriptShort: `
                <strong>[HOOK - 0:00-0:05]</strong><br/>
                If you are only talking to one person in a B2B deal, you don't have a deal.<br/>
                You have a friend.<br/><br/>

                <strong>[THE INSIGHT - 0:05-0:30]</strong><br/>
                Single-threaded deals are the #1 cause of "Unknown Slip" in pipelines.<br/>
                You think it's closing because your Champion said "Yes".<br/>
                But the CFO said "Who?"<br/>
                And the IT Director said "No".<br/><br/>

                <strong>[THE SHIFT - 0:30-0:50]</strong><br/>
                Stop accepting "I'll run it up the flagpole."<br/>
                Your job is to Multithread.<br/>
                Don't go around your Champion. Empower them.<br/>
                "Hey, the CFO is going to grill you on ROI. Let's build that slide together so you don't look bad."<br/><br/>

                <strong>[CTA - 0:50-1:00]</strong><br/>
                Map the committee. Or lose the deal.<br/>
                It's that simple.
            `,
            scriptDeepDive: `
                <strong>Topic:</strong> How to Multithread Without Being Annoying<br/>
                <strong>Format:</strong> Tactical Workshop<br/>
                <strong>Duration:</strong> 12 Minutes<br/><br/>

                <strong>Section 1: The "Hidden" Org Chart</strong><br/>
                - Why Org Charts lie.<br/>
                - Finding the "Political Capital" vs. the "Job Title".<br/><br/>

                <strong>Section 2: The 3-Point Access Strategy</strong><br/>
                - How to get to Power (CFO).<br/>
                - How to get to Technical (IT/Security).<br/>
                - How to get to Legal (Procurement).<br/><br/>

                <strong>Section 3: Handling Pushback</strong><br/>
                - What to do when a Champion says "No, I handle everything."<br/>
                - The concept of "Selling on Behalf Of".<br/>
            `,
            bestPracticeSnippets: [
                "Don't go around your Champion. Empower them to look like the hero to their CFO.",
                "Validating the 'Technical Blocker' early saves 2 months of security review at the finish line.",
                "The person who signs the check usually cares about Risk and ROI, not features. Sell the outcome.",
                "If you haven't identified at least 3 distinct stakeholders by Stage 2, your deal is at 90% risk."
            ]
        },
        relatedService: {
            title: "Pipeline & Deal Quality Repair",
            link: "/services/pipeline-quality"
        }
    },
    {
        id: "revops-signal-vs-noise",
        slug: "signal-vs-noise",
        category: "RevOps",
        title: "Signal vs. Noise: Why Your Dashboard is Lying",
        subtitle: "Activity metrics hide reality. Learn to measure outcomes, not busy work.",
        readTime: "6 min read",
        difficulty: "Technical",
        author: "GTM-360 Intelligence",
        lastUpdated: "January 2026",
        content: {
            onePager: `
                <h3>The Core Concept</h3>
                <p><strong>More data does not equal better decisions. Usually, it equals more confusion.</strong></p>
                <p>RevOps teams trip into the trap of "Tracking Everything." The result is a dashboard with 40 tiles that nobody looks at, because it doesn't tell a story.</p>
                
                <h3>The Trap: "Vanity Activity"</h3>
                <p>We measure what is easy to count, not what matters.</p>
                <ul>
                    <li>Calls Made (Easy) vs. Conversations Had (Hard).</li>
                    <li>MQLs Genereated (Easy) vs. Meetings Held (Hard).</li>
                    <li>Emails Sent (Easy) vs. Replies Positive (Hard).</li>
                </ul>
                <p>When you incentivize "Calls Made," reps will just call the same 10 people 5 times. The chart goes up. Revenue stays flat.</p>

                <h3>The Shift: Verification Metrics</h3>
                <p>Move from "Activity" to "Verification".</p>
                <p>A "Verification Metric" requires a counter-party action.</p>
                <ul class="list-disc pl-5 my-4">
                    <li><strong>Activity:</strong> I sent a quote. (Noise)</li>
                    <li><strong>Verification:</strong> The customer opened the doc and viewed the pricing page. (Signal)</li>
                </ul>

                <h3>Implementation</h3>
                <p>Audit your dashboard. If a metric can be gamed by an employee pressing a button, delete it (or hide it). Only surface metrics that require a customer to do something.</p>
            `,
            scriptShort: `
                <strong>[HOOK - 0:00-0:05]</strong><br/>
                Your CRM dashboard is lying to you.<br/>
                It's full of green arrows, but you missed your number. Why?<br/><br/>

                <strong>[THE INSIGHT - 0:05-0:30]</strong><br/>
                Because you are tracking "Vanity Activity".<br/>
                Calls made. Emails sent. MQLs.<br/>
                These aren't results. They are effort.<br/>
                You can make 100 calls and speak to 0 people.<br/>
                The chart looks great. The bank account looks empty.<br/><br/>

                <strong>[THE SHIFT - 0:30-0:50]</strong><br/>
                Switch to "Verification Metrics".<br/>
                Don't track what *you* did. Track what *they* did.<br/>
                Did they reply? Did they show up? Did they sign the POC?<br/><br/>

                <strong>[CTA - 0:50-1:00]</strong><br/>
                If your metric doesn't require a customer action,<br/>
                it's just noise.<br/>
                Delete it.
            `,
            scriptDeepDive: `
                <strong>Topic:</strong> The Dashboard Cleanup Protocol<br/>
                <strong>Format:</strong> Screen-share / Walkthrough<br/>
                <strong>Duration:</strong> 10 Minutes<br/><br/>

                <strong>Section 1: The 80/20 of Data</strong><br/>
                - 80% of CRM fields are never used in decision making.<br/>
                - The cost of data maintenance.<br/><br/>

                <strong>Section 2: Defining "Signal"</strong><br/>
                - The concept of "Bi-Directional Verification".<br/>
                - Why "Stage Duration" is the only truth.<br/><br/>

                <strong>Section 3: Building the "Executive View"</strong><br/>
                - How to build a dashboard that fits on one screen.<br/>
                - The 4 tiles every CRO needs.<br/>
            `,
            bestPracticeSnippets: [
                "If a metric can be gamed by an employee pressing a button without a customer action, delete it.",
                "Measure 'Stage Duration' over 'Opportunity Count'. Velocity is the best disinfectant.",
                "A dashboard with more than 5 tiles is a research project, not a management tool.",
                "Treat high MQL volume as a warning sign of 'Noise' until proven otherwise by conversion rates."
            ]
        },
        relatedService: {
            title: "Forecasting & Revenue Governance",
            link: "/services/forecasting-governance"
        }
    },
    {
        id: "cs-qbr-trap",
        slug: "the-qbr-trap",
        category: "CS",
        title: "The QBR Trap: Why Customers Ghost Your Reviews",
        subtitle: "Stop reading usage logs to your customers. Start validating outcomes.",
        readTime: "6 min read",
        difficulty: "Strategic",
        author: "GTM-360 Intelligence",
        lastUpdated: "January 2026",
        content: {
            onePager: `
                <h3>The Core Concept</h3>
                <p><strong>Your customers hate your Quarterly Business Reviews (QBRs).</strong></p>
                <p>Why? Because most QBRs are actually "Vendor Business Reviews." You talk about your roadmap, your features, and your support tickets.</p>
                <p>The customer sits there politely, checks their email, and wonders: "Did I get promoted because of this tool?"</p>

                <h3>The Trap: "Usage = Value"</h3>
                <p>CSMs often confuse specific usage (logins) with value (ROI). Just because they logged in doesn't mean they are winning. They might be logging in to struggle with a bug.</p>

                <h3>The Shift: The Impact Review</h3>
                <p>Rename the meeting. Call it an "Impact Review" or "Strategy Sync."</p>
                <p>The deck should have 3 slides:</p>
                <ol class="list-decimal pl-5 my-4">
                    <li><strong>The Promise:</strong> "Here is why you bought us."</li>
                    <li><strong>The Proof:</strong> "Here is the data showing we delivered that specific outcome."</li>
                    <li><strong>The Path:</strong> "Here is how we unlock the next level of value."</li>
                </ol>

                <h3>Implementation</h3>
                <p>If you can't fill out Slide 2 (The Proof), cancel the meeting. You have a churn risk. Go fix the value gap first.</p>
            `,
            scriptShort: `
                <strong>[HOOK - 0:00-0:05]</strong><br/>
                Your customers are ghosting your QBRs for one reason:<br/>
                They are boring.<br/><br/>

                <strong>[THE INSIGHT - 0:05-30]</strong><br/>
                Most QBRs are just you reading a usage report out loud.<br/>
                "You logged in 50 times! You created 12 widgets!"<br/>
                Who cares?<br/>
                Your champion doesn't get promoted for creating widgets.<br/>
                They get promoted for saving money or making money.<br/><br/>

                <strong>[THE SHIFT - 0:30-0:50]</strong><br/>
                Stop doing "Usage Reviews". Start doing "Impact Reviews".<br/>
                One slide: "You paid us $50k. We saved you $120k. Here is the math."<br/>
                If you can't make that slide...<br/>
                You don't have a renewal. You have a hostage.<br/><br/>

                <strong>[CTA - 0:50-1:00]</strong><br/>
                Prove the value.<br/>
                Or lose the account.
            `,
            scriptDeepDive: `
                <strong>Topic:</strong> Reinventing the QBR<br/>
                <strong>Format:</strong> Presentation / Slide Breakdown<br/>
                <strong>Duration:</strong> 14 Minutes<br/><br/>

                <strong>Section 1: The Anatomy of a Bad QBR</strong><br/>
                - The "Feature Dump" mistake.<br/>
                - The "Support Ticket Review" mistake.<br/><br/>

                <strong>Section 2: The "Hero's Journey" Framework</strong><br/>
                - Framing the Customer as the Hero, and you as the Guide.<br/>
                - How to find the ROI data (even if your tool doesn't track it).<br/><br/>

                <strong>Section 3: The "Pre-Renew" Strategy</strong><br/>
                - Using the QBR to close the renewal 90 days early.<br/>
            `,
            bestPracticeSnippets: [
                "If you can't fill out the 'Proof of Impact' slide, cancel the QBR and go fix the value gap.",
                "Usage is a lagging indicator of interest. Impact is the leading indicator of renewal.",
                "Frame the Customer as the Hero and your product as the Guide in every review.",
                "The renewal should be a formality, not a negotiation. Prove the ROI 90 days early."
            ]
        },
        relatedService: {
            title: "GTM Operating Model Realignment",
            link: "/services/gtm-operating-model"
        }
    },
    {
        id: "founder-gtm-os",
        slug: "revenue-operating-system",
        category: "Founders",
        title: "The Revenue Operating System: Escaping Hero Mode",
        subtitle: "Why scaling breaks your business, and how to switch from 'Heroics' to 'Engineering'.",
        readTime: "8 min read",
        difficulty: "Strategic",
        author: "GTM-360 Intelligence",
        lastUpdated: "January 2026",
        content: {
            onePager: `
                <h3>The Core Concept</h3>
                <p><strong>Most companies don't grow; they just swell.</strong></p>
                <p>In the early days (Seed/Series A), growth comes from <strong>Heroics</strong>. The founders hustle, the first rep is a rockstar, and everyone works 80 hours.</p>
                <p>But Heroics don't scale. As you add people, efficiency drops. You hire a VP of Sales to "fix it," but they fail. Why? Because you didn't need a leader; you needed a <strong>System</strong>.</p>

                <h3>The Trap: "The Talent Delusion"</h3>
                <p>Founders often think: <em>"If I just hire a Google/Salesforce vet, they will bring the playbook."</em></p>
                <p>Wrong. They will bring <em>Google's</em> playbook. And Google's playbook assumes you have Google's brand, budget, and product-market fit. You have none of those.</p>

                <h3>The Shift: Installing the OS</h3>
                <p>A Revenue Operating System (GTM-OS) replaces personality with process. It has 4 layers:</p>
                <ul class="list-disc pl-5 my-4 space-y-2">
                    <li><strong>Data Layer:</strong> One truth. No "Marketing numbers" vs "Sales numbers."</li>
                    <li><strong>Decision Layer:</strong> Clear logic for pricing, disqualification, and forecasting.</li>
                    <li><strong>Process Layer:</strong> Documented workflows that don't rely on "tribal knowledge."</li>
                    <li><strong>Talent Layer:</strong> People plug <em>into</em> the system; they don't <em>carry</em> it.</li>
                </ul>

                <h3>Implementation</h3>
                <p>Stop asking "Who do we hire next?" Start asking "What system is broken?"</p>
                <p>If you can't describe your revenue engine as a schematic diagram, you don't have an engine. You have a casino.</p>
            `,
            scriptShort: `
                <strong>[HOOK - 0:00-0:05]</strong><br/>
                Your business is addicted to Heroics.<br/>
                And that is why you stopped growing.<br/><br/>

                <strong>[THE INSIGHT - 0:05-0:30]</strong><br/>
                In the early days, you grew because you hustled.<br/>
                You were the Hero.<br/>
                But now you have 50 people. You can't hero-mode 50 people.<br/>
                You hired a VP of Sales to fix it. They failed.<br/>
                You hired a CMO. They failed.<br/><br/>

                <strong>[THE SHIFT - 0:30-0:50]</strong><br/>
                It's not them. It's the System.<br/>
                You are trying to scale "Hard Work".<br/>
                You need to scale "Engineering".<br/>
                A Revenue Operating System means the business grows even if you sleep.<br/>
                It means the process wins, not the person.<br/><br/>

                <strong>[CTA - 0:50-1:00]</strong><br/>
                Stop hiring "Rockstars".<br/>
                Start building an Orchestra.
            `,
            scriptDeepDive: `
                <strong>Topic:</strong> From Founder-Led to System-Led Growth<br/>
                <strong>Format:</strong> Keynote / Board Presentation<br/>
                <strong>Duration:</strong> 20 Minutes<br/><br/>

                <strong>Section 1: The "Series B Cliff"</strong><br/>
                - Why companies stall at $10M ARR.<br/>
                - The collapse of "Tribal Knowledge".<br/><br/>

                <strong>Section 2: The 4 Components of a GTM-OS</strong><br/>
                - Data, Decision, Process, Talent.<br/>
                - Why you must build them in that order (Talent last).<br/><br/>

                <strong>Section 3: The Board Conversation</strong><br/>
                - How to tell your investors you are rebuilding the engine.<br/>
                - Why "slowing down to speed up" is the only path.<br/>
            `,
            bestPracticeSnippets: [
                "Stop hiring 'Rockstars' to fix broken systems. They'll just burn out faster.",
                "Revenue Engineering > Founder Heroics. You can't scale a personality.",
                "Build your systems in order: Data first, then Process, then Talent.",
                "If you can't draw your revenue engine as a schematic, you don't have an engine; you have a casino."
            ]
        },
        relatedService: {
            title: "GTM Operating Model Realignment",
            link: "/services/gtm-operating-model"
        }
    }
];
