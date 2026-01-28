from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph import StateGraph, END
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from app.providers.adapters import GeminiAdapter

# State Definition
class ExecutiveState(TypedDict):
    input_period: str  # e.g., "Week of Jan 28"
    raw_intelligence: Dict[str, Any]  # Aggregated stats from other swarms
    briefing_memo: Dict[str, Any]  # Final JSON output
    status: str

# Nodes
class ExecutiveNodes:
    def __init__(self):
        self.llm = GeminiAdapter()

    def gather_intelligence(self, state: ExecutiveState) -> Dict:
        """
        In a real app, this queries the DB for all runs in the last 7 days.
        For MVP, we expect 'raw_intelligence' to be seeded by the endpoint.
        """
        return {"status": "ANALYZING"}

    async def synthesize(self, state: ExecutiveState) -> Dict:
        input_data = state["raw_intelligence"]
        
        system_prompt = """You are the Chief of Staff for a Series B SaaS company.
        Your job is to write a "State of Revenue" memo for the CEO.
        
        Style Guide:
        - "Axios Smart Brevity" style.
        - Short, punchy sentences.
        - No corporate fluff.
        - Focus on EXCEPTIONS (what went wrong, what went surprisingly well).
        - Use specific numbers from the data.

        Structure your JSON output exactly like this:
        {
            "subject": "Week of [Date]: [3-5 word punchy headline]",
            "tldr": "2 sentences summarizing the most critical update.",
            "sections": [
                {
                    "title": "The Good 🟢",
                    "bullets": ["Point 1", "Point 2"]
                },
                {
                    "title": "The Bad 🔴",
                    "bullets": ["Point 1", "Point 2"]
                },
                {
                    "title": "The Ugly (Risks) ⚠️",
                    "bullets": ["Point 1", "Point 2"]
                }
            ],
            "recommendations": [
                {
                    "action": "Actionable Title",
                    "owner": "Role (e.g. VP Sales)",
                    "rationale": "Why this matters now."
                }
            ]
        }
        """

        human_prompt = f"""
        Here is the intelligence gathered from our agent swarms this week:
        {str(input_data)}
        
        Write the briefing.
        """

        try:
            res = await self.llm.generate_json(
                prompt=human_prompt,
                schema={"type": "object", "properties": {"subject": {"type": "string"}, "tldr": {"type": "string"}}}, # Simplified schema hint
                system_prompt=system_prompt
            )
            return {"briefing_memo": res, "status": "DRAFTED"}
        except Exception as e:
            print(f"Exec Memo Generation Error: {e}")
            # Fallback
            return {
                "briefing_memo": {
                    "subject": "Weekly Revenue Briefing",
                    "tldr": "Automated generation failed. Raw data available below.",
                    "sections": []
                },
                "status": "FAILED"
            }

def create_executive_graph():
    nodes = ExecutiveNodes()
    workflow = StateGraph(ExecutiveState)

    workflow.add_node("gather", nodes.gather_intelligence)
    workflow.add_node("synthesize", nodes.synthesize)

    workflow.set_entry_point("gather")
    workflow.add_edge("gather", "synthesize")
    workflow.add_edge("synthesize", END)

    return workflow.compile()
