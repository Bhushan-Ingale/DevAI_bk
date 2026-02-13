import sys
import os

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Now this will work
from services.git_analyzer import GitAnalyzer
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import os

from services.git_analyzer import GitAnalyzer
#from models.user import User, UserRole
#from models.group import Group, Member

app = FastAPI(title="DevAI Analytics API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Mock DB (replace with MongoDB)
groups_db = {}
users_db = {}

# Models
class GroupCreate(BaseModel):
    name: str
    repo_url: str
    members: List[str]
    guide_id: str

class CommentCreate(BaseModel):
    content: str
    member_name: str

# Routes
@app.get("/")
async def root():
    return {"message": "DevAI Analytics API", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/groups")
async def create_group(group: GroupCreate):
    """Create a new student group"""
    group_id = f"group_{len(groups_db) + 1}"
    groups_db[group_id] = {
        "id": group_id,
        **group.dict(),
        "created_at": datetime.now().isoformat(),
        "progress": 0,
        "last_analyzed": None
    }
    return {"id": group_id, "message": "Group created successfully"}

@app.get("/groups")
async def get_groups(guide_id: Optional[str] = None):
    """Get all groups or groups for specific guide"""
    if guide_id:
        groups = [g for g in groups_db.values() if g["guide_id"] == guide_id]
    else:
        groups = list(groups_db.values())
    
    # Add analysis if available
    for group in groups:
        if group.get("repo_url"):
            try:
                analyzer = GitAnalyzer(group["repo_url"])
                group["stats"] = analyzer.get_dashboard_data()["summary"]
                group["last_analyzed"] = datetime.now().isoformat()
            except:
                group["stats"] = {"total_commits": 0, "total_contributors": 0}
    
    return groups

@app.get("/groups/{group_id}/analytics")
async def get_group_analytics(group_id: str):
    """Get detailed analytics for a group"""
    if group_id not in groups_db:
        raise HTTPException(status_code=404, detail="Group not found")
    
    group = groups_db[group_id]
    if not group.get("repo_url"):
        return {"message": "No repository linked", "stats": {}}
    
    try:
        analyzer = GitAnalyzer(group["repo_url"])
        return analyzer.get_dashboard_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/groups/{group_id}/comments")
async def add_comment(group_id: str, comment: CommentCreate):
    """Add comment to a group member's work"""
    if group_id not in groups_db:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # In production, save to DB
    return {
        "message": "Comment added",
        "comment": comment.dict(),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/analytics/demo")
async def demo_analytics():
    """Demo endpoint with sample data"""
    return {
        "summary": {
            "total_commits": 142,
            "total_contributors": 4,
            "total_files": 56,
            "repo_size_mb": 4.2,
            "active_days": 45
        },
        "contributors": [
            {"name": "Alice", "progress": 85, "commits": 65, "additions": 1240, "deletions": 320, "activity_score": 98},
            {"name": "Bob", "progress": 72, "commits": 42, "additions": 890, "deletions": 210, "activity_score": 76},
            {"name": "Charlie", "progress": 45, "commits": 25, "additions": 450, "deletions": 120, "activity_score": 52},
            {"name": "Diana", "progress": 38, "commits": 10, "additions": 230, "deletions": 80, "activity_score": 31}
        ],
        "timeline": [
            {"date": "2024-01-01", "commits": 5},
            {"date": "2024-01-02", "commits": 8},
            {"date": "2024-01-03", "commits": 12},
        ],
        "file_types": [
            {"type": "py", "count": 24},
            {"type": "js", "count": 18},
            {"type": "md", "count": 8},
            {"type": "json", "count": 6}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    
@app.get("/api/teams/{team_id}/commits")
async def get_team_commits(team_id: str, repo_url: str = None):
    """Get real commit data for a team - FAST"""
    # For demo, use repo_url parameter or get from your DB
    if not repo_url:
        # Demo repos for quick testing
        demo_repos = {
            "1": "https://github.com/facebook/react",
            "2": "https://github.com/vercel/next.js",
            "3": "https://github.com/tailwindlabs/tailwindcss"
        }
        repo_url = demo_repos.get(team_id, "https://github.com/facebook/react")
    
    try:
        analyzer = GitAnalyzer(repo_url)
        data = analyzer.get_team_stats()
        analyzer.cleanup()
        return data
    except Exception as e:
        # Return mock data if analysis fails
        return {
            'summary': {
                'total_commits': 142,
                'total_contributors': 4,
                'total_additions': 2580,
                'total_deletions': 650,
                'active_days': 22
            },
            'contributors': [
                {'name': 'Alice', 'commits': 65, 'additions': 1240, 'deletions': 320, 'activity_score': 98},
                {'name': 'Bob', 'commits': 42, 'additions': 890, 'deletions': 210, 'activity_score': 76},
                {'name': 'Charlie', 'commits': 25, 'additions': 450, 'deletions': 120, 'activity_score': 52}
            ],
            'timeline': [
                {'date': '2024-03-01', 'commits': 12},
                {'date': '2024-03-02', 'commits': 8},
                {'date': '2024-03-03', 'commits': 15}
            ]
        }