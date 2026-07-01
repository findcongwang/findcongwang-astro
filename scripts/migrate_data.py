"""
Migration script to convert legacy PresentationData to DualTrackPresentation format
"""

import json
import re
import sys
from pathlib import Path

def convert_timeline_to_steps(timeline):
    """Convert TimelineEvent[] to StoryStep[]"""
    steps = []
    for event in timeline:
        step = {
            "id": event["id"],
            "label": event["label"],
            "date": event.get("date"),
            "thread": event["thread"],
            "conceptsAdded": event.get("conceptsAdded"),
            "conceptsFaded": event.get("conceptsFading"),
        }
        steps.append(step)
    return steps

def create_story(threads, color_map):
    """Create story object"""
    return {
        "type": "timeline",
        "visualisation": "wordcloud",
        "steps": [],
        "threadColors": color_map
    }

def build_concept_map(timeline, terms):
    """Build map of concept -> (appearedAt, fadedAt)"""
    concept_map = {}
    for term in terms:
        term_name = term["term"]
        appeared = term["appearedAt"]
        faded = term.get("fadedAt")
        
        if term_name not in concept_map:
            concept_map[term_name] = {"appeared": [], "faded": []}
        
        concept_map[term_name]["appeared"].append(appeared)
        if faded:
            concept_map[term_name]["faded"].append(faded)
    
    return concept_map

def update_concepts_for_step(step, concept_map, timeline):
    """Update step with concepts from timeline"""
    # conceptsAdded and conceptsFaded are already provided in timeline
    pass

def main():
    # Read ddes-s26.ts
    data_path = Path(r"C:\Users\CongW\work\FCWANG\findcongwang-astro\src\components\gestalt\data\ddes-s26.ts")
    content = data_path.read_text()
    
    # Extract the data object
    # Find export const ddesS26Data = { ... }
    match = re.search(r"export const ddesS26Data:\s*PresentationData\s*=\s*({.*?^});", content, re.MULTILINE | re.DOTALL)
    
    if not match:
        print("Could not find ddesS26Data")
        return
    
    # This is complex - let's just read the whole file and manually parse
    print(f"Found data: {match.group(1)[:100]}...")

if __name__ == "__main__":
    main()
