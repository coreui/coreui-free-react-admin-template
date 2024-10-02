from database import Base
from sqlalchemy import Integer, String, Column, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "app_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    failed_logins = Column(Integer, default=0)
    locked_until = Column(Float, default=0)
    wallets = relationship("Wallet", back_populates="user")

class Wallet(Base):
    __tablename__ = "app_wallets"

    id = Column(Integer, primary_key=True, index=True)
    personal_account = Column(Integer)
    balance = Column(Float)
    currency = Column(String, default="USD")
    user_id = Column(Integer, ForeignKey("app_users.id"))
    user = relationship("User", back_populates="wallets")


class Transaction(Base):
    __tablename__ = "app_transactions"

    id = Column(Integer, primary_key=True, index=True)
    wallet_id = Column(Integer, ForeignKey("app_wallets.id"))
    amount = Column(Float)
    type = Column(String)

class Income(Base):
    __tablename__ = "app_incomes"

    id = Column(Integer, primary_key=True, index=True)
    wallet_id = Column(Integer, ForeignKey("app_wallets.id"))
    amount = Column(Float)
    type = Column(String)

class Expense(Base):
    __tablename__ = "app_expenses"

    id = Column(Integer, primary_key=True, index=True)
    wallet_id = Column(Integer, ForeignKey("app_wallets.id"))
    amount = Column(Float)
    type = Column(String)