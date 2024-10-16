import os
from fastapi import APIRouter
from git import Repo
from app.core.decorators import log_time_taken
from app.data_validators.schemas.response_schemas.common_schemas import ReleaseInfo
release_info_api_router = APIRouter(prefix="/v1/release-info", tags=['Release Info'])


@release_info_api_router.get("")
@log_time_taken
async def fetch_release_info() -> ReleaseInfo:
    repo = Repo(os.getcwd())
    branch = repo.active_branch.name
    last_commit = repo.head.commit
    last_commit_id = last_commit.hexsha
    last_commit_time = last_commit.committed_datetime.strftime('%Y-%m-%d %H:%M:%S')
    return ReleaseInfo(
        branch=branch,
        last_commit_id=last_commit_id,
        last_commit_time=last_commit_time
    )
