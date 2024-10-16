from fastapi import APIRouter,  Query
from app.data_validators.schemas.request_schemas.release_notes import ReleaseNotesRequest
from app.services.release_notes_service import create_release_notes, get_release_notes, delete_release_notes


release_notes_router = APIRouter(prefix="/v1", tags=['Release Notes'], deprecated=True)


@release_notes_router.get('/release-notes')
async def get_release_notes_with_version(version: str = Query(None, regex="^Version-(\d+)\.(\d+)\.(\d+)$",
                                                              description='Format is Version-1.1.1')):
    return get_release_notes(version)


@release_notes_router.post('/push-release-notes')
async def create_new_release_notes(notes: ReleaseNotesRequest,
                                   version: str = Query(regex="^Version-(\d+)\.(\d+)\.(\d+)$", description='Format is Version-1.1.1'),
                                   release_date: str = Query(None, description="Format : yyyy-mm-dd"),
                                   ):
    return create_release_notes(version, release_date, notes)


@release_notes_router.delete('/delete-release-notes')
async def delete_release_notes_with_version(version: str = Query(regex="^Version-(\d+)\.(\d+)\.(\d+)$",
                                                                 description='Format is Version-1.1.1')):
    return delete_release_notes(version)
