from pydantic import BaseModel

class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    password: str



class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

class WalletCreate(BaseModel):
    currency: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResetPassword(Token):
    password: str

class TokenData(BaseModel):
    username: str | None = None



class ByMonth(BaseModel):
    wallet_id: int
    month: int

class ByYear(BaseModel):
    wallet_id: int
    year: int

class ByCategory(BaseModel):
    wallet_id: int
    category: str

class IncomesByMonth(ByMonth):
    pass
class ExpensesByMonth(ByMonth):
    pass
  
class IncomesByCategory(ByCategory):
    pass
class ExpensesByCategory(ByCategory):
    pass

class IncomesByYear(ByYear):
    pass
class ExpensesByYear(ByYear):
    pass