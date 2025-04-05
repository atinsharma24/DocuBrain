from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine

Base = declarative_base()

DATABASE_URL = "sqlite:///./db.sqlite3"
engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_db():
    Base.metadata.create_all(engine)

def get_session():
    return SessionLocal()
