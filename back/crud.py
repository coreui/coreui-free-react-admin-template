from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone


def registration(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(
        email=user.email, 
        username=user.username, 
        hashed_password=fake_hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    create_wallet(db, schemas.WalletCreate(user_id=db_user.id))
    return db_user

def get_user_by_id( db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email( db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username( db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()
def get_active_users(db: Session):
    return db.query(models.User).filter(models.User.is_active == True).all()

def get_wallet_by_user(db: Session, user_id: int):
    return db.query(models.Wallet).filter(models.Wallet.user_id == user_id).first()

def get_wallet_by_id(db: Session, wallet_id: int):
    return db.query(models.Wallet).filter(models.Wallet.id == wallet_id).first()

def get_wallet_by_user_id(db: Session, user_id: int):
    return db.query(models.Wallet).filter(models.Wallet.user_id == user_id).first()

def create_wallet(db: Session, wallet: schemas.WalletCreate):
    db_wallet = models.Wallet(
        user_id=wallet.user_id, 
        personal_account=wallet.personal_account
        )
    db.add(db_wallet)
    db.commit()
    db.refresh(db_wallet)
    return db_wallet

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
def get_password_hash(password):
    return pwd_context.hash(password)

def login_attempts(db: Session, db_user: models.User):
    if db_user.failed_logins < 5:
        db_user.failed_logins += 1
        db.commit()
    else:
        db_user.is_active = False
        db_user.locked_until = datetime.now(timezone.utc) + timedelta(minutes=5)
        db.commit()

def user_unlocked(db: Session, db_user: models.User):
    if db_user.locked_until and db_user.locked_until < datetime.now(timezone.utc):
        db_user.is_active = True
        db_user.failed_logins = 0
        db_user.locked_until = None
        db.commit()

