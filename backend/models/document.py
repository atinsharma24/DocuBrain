from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from utils.db import Base  # make sure this is your declarative_base()

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    path = Column(String, nullable=False)
    upload_time = Column(DateTime, default=datetime.utcnow)
    content = Column(Text, nullable=True)
