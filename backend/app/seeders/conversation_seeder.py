
import json
import random
from datetime import datetime, timedelta

def generate_mock_transcript(deal_id="deal_123"):
    """
    Generates a realistic B2B sales call transcript (Discovery/Demo phase).
    Used to seed the Deal Intelligence Agent.
    """
    
    speakers = ["Rep (Alex)", "Prospect (Sarah - VP Sales)", "Prospect (Mike - RevOps)"]
    
    intro = [
        ("Rep (Alex)", "Thanks for joining. The goal today is to walk through the GTM-360 platform."),
        ("Prospect (Sarah - VP Sales)", "Sounds good. We're really struggling with data visibility right now.")
    ]
    
    pain_points = [
        ("Prospect (Mike - RevOps)", "Yeah, our CRM is a mess. I spend 10 hours a week just fixing fields."),
        ("Prospect (Sarah - VP Sales)", "And I can't trust the forecast. My reps say one thing, the data says another."),
        ("Rep (Alex)", "That's exactly what we solve. Our Agent Swarm cleans that up automatically.")
    ]
    
    objections = [
        ("Prospect (Mike - RevOps)", "How does it handle writeback? I don't want a bot messing up my HubSpot."),
        ("Rep (Alex)", "Great question. It uses a 'Suggested Mode'. Nothing is committed without approval."),
        ("Prospect (Mike - RevOps)", "Okay, that's a relief. That's a dealbreaker for us otherwise.")
    ]
    
    pricing = [
        ("Prospect (Sarah - VP Sales)", "What's the ballpark implementation timeline? We need this by Q3."),
        ("Rep (Alex)", "We can get the core swarm live in 2 weeks."),
        ("Prospect (Sarah - VP Sales)", "Two weeks? really? That works for our budget cycle too.")
    ]
    
    transcript = intro + pain_points + objections + pricing
    
    text_blob = ""
    for speaker, line in transcript:
        text_blob += f"{speaker}: {line}\n"
        
    return {
        "conversation_id": f"conv_{random.randint(1000, 9999)}",
        "deal_id": deal_id,
        "type": "Zoom Call",
        "date": (datetime.now() - timedelta(days=2)).isoformat(),
        "duration_minutes": 45,
        "transcript": text_blob
    }

def generate_mock_emails(deal_id="deal_123"):
    return [
        {
            "email_id": f"email_{random.randint(1000, 9999)}",
            "deal_id": deal_id,
            "sender": "sarah@acme.com",
            "subject": "Follow up / Legal",
            "body": "Hi Alex, thanks for the demo. Loop in Legal (attached) for the MSA. Mike is sold on the technical side.",
            "date": (datetime.now() - timedelta(days=1)).isoformat()
        }
    ]

if __name__ == "__main__":
    # Generate a seed pack
    data = {
        "transcripts": [generate_mock_transcript()],
        "emails": generate_mock_emails()
    }
    print(json.dumps(data, indent=2))
