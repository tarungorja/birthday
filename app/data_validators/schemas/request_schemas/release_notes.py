from pydantic import BaseModel
from typing import List, Dict, Optional


class UINotes(BaseModel):
    new_features: Optional[Dict[str, str]] = None
    enhancements: Optional[Dict[str, str]] = None
    bug_fixes: Optional[Dict[str, str]] = None


class BackendNotes(BaseModel):
    new_apis: Optional[Dict[str, str]] = None
    modified_apis: Optional[Dict[str, str]] = None
    bug_fixes: Optional[Dict[str, str]] = None
    deprecated_apis: Optional[Dict[str, str]] = None


class ReleaseNotesRequest(BaseModel):
    sprint_link: str
    mini_notes: List[str]
    ui_notes: Optional[UINotes] = None
    backend_notes: Optional[BackendNotes] = None
