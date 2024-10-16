
from typing import List
from fastapi import HTTPException
from app.core.database import release_notes_instance
from datetime import datetime

from app.data_validators.schemas.request_schemas.release_notes import ReleaseNotesRequest


def get_release_notes(version: str):
    version_notes = release_notes_instance.get_release_notes_version(version)
    if version_notes:
        return version_notes
    raise HTTPException(status_code=204)


def create_release_notes(version: str, release_date: str, notes: ReleaseNotesRequest):
    if release_notes_instance.get_version(version):
        raise HTTPException(status_code=400, detail=f'Notes with {version} already exists.')

    if release_date == None:
        release_date = datetime.now().strftime('%Y-%m-%d')
    release_note = {'version': version,
                    'release_date': release_date,
                    'sprint_link': notes.sprint_link,
                    'mini_notes': notes.mini_notes
                    }
    if notes.ui_notes:
        release_note['ui_notes'] = notes.ui_notes.model_dump()
    if notes.backend_notes:
        release_note['backend_notes'] = notes.backend_notes.model_dump()
    release_notes_instance.create_release_notes(release_note)
    return get_release_notes(version)[0]


def delete_release_notes(version: str):
    if not release_notes_instance.get_version(version):
        raise HTTPException(status_code=404, detail=f'Notes with {version} not found.')
    release_notes_instance.delete_release_notes_with_version(version)
    return f'Deleted the notes with {version}'
