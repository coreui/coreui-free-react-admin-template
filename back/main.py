from fastapi import FastAPI, Depends, HTTPException, status
from database import SessionLocal, engine
import models, schemas, crud
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
import jwt
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError

models.Base.metadata.create_all(bind=engine)


app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

SECRET_KEY = "02b11ec3ea564e5372ca7be5bee87afd6bcb181974d8f5d058f1c18abc042848"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
    current_user: Annotated[schemas.User, Depends(get_current_user)],
):
    if current_user.is_active == False:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def authenticate_user(db, username: str, password: str):
    user = crud.get_user_by_username(db, username)
    if not user or not crud.verify_password(password, user.hashed_password):
        crud.login_attempts(db, user)
        return False
    return user

@app.post("/login", response_model=schemas.User)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    crud.user_unlocked(db, user)
    current_user = get_current_active_user(user)
    user = authenticate_user(db, current_user.username, current_user.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
            )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return schemas.Token(access_token=access_token, token_type="bearer")


@app.post("/registration", response_model=schemas.User)
def registration(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if not user.username:
        raise HTTPException(status_code=400, detail="Username is required")
    if not user.email:
        raise HTTPException(status_code=400, detail="Email is required")
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    registered_user = crud.registration(db=db, user=user)
    return registered_user

@app.post("/wallet", response_model=schemas.WalletCreate)
def create_wallet(wallet: schemas.WalletCreate, db: Session = Depends(get_db)):
    return crud.create_wallet(db=db, wallet=wallet)

@app.get("/users/me/", response_model=schemas.User)
async def read_users_me(
    current_user: Annotated[schemas.User, Depends(get_current_active_user)],
):
    return current_user



def verify_token(token: str, SECRET_KEY):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/forgot_password")
async def send_token(email: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=email)
    if not user:
        raise HTTPException(status_code=404, detail="Incorrect email address") 
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    token = schemas.Token(access_token=access_token, token_type="bearer")
    return {"token": token}

@app.post("/reset_password", response_model=schemas.UserResetPassword)
async def reset_password(password_reset: schemas.UserResetPassword, db: Session = Depends(get_db)):
    payload = verify_token(password_reset.access_token, SECRET_KEY)
    user = crud.get_user_by_username(db, username=payload["sub"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    crud.reset_password(db, user, password_reset.password)
    return {"message": "Password reset successfully"}
