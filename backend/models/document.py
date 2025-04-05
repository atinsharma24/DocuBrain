from sqlmodel import Field, SQLModel
from datetime import datetime
from typing import Optional

class Document(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filename: str
    upload_time: datetime
    path: str
