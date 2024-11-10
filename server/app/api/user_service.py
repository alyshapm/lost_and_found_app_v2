from fastapi import APIRouter, HTTPException
from crud.user_service_crud import UserCrud
from models import UserSignUp, UserSignIn
user_router= APIRouter()


# POST route for user signup
@user_router.post("/signup", response_description="Sign up a new user")
async def signup(user: UserSignUp):
    """Sign up a new user by forwarding data to an external API."""
    result = await UserCrud.signup(user)
    return {"message": "User signed up successfully", "data": result}

# POST route for user signin
@user_router.post("/signin", response_description="User login")
async def signup(user: UserSignIn):
    result = await UserCrud.signin(user)
    return {"message": "User signed in successfully", "data": result}

@user_router.get("/user_infor", response_class="get current user information")
async def get_current_user():
    result = await UserCrud.get_current_user()
    return {"data": result}

@user_router.get("/all_infor", response_class="get all users information")
async def get_current_user():
    result = await UserCrud.get_all_users()
    return {"data": result}


@user_router.get("/logout", response_description="User log out")
async def signup():
    result = await UserCrud.logout()
    return {"message": "User logged out successfully", "data": result}


@user_router.post("/refresh_token", response_description="Refresh token")
async def refresh_token():
    result = await UserCrud.refresh_token()

    return {"message": "Token refreshed"}


@user_router.post("/forgot", response_description="Forgot password")
async def forgot_password():
    result = await UserCrud.forget_password()
    return {"message": "ok"}


@user_router.put("/update_user", response_description="Update User Information")
async def forgot_password():
    result = await UserCrud.forget_password()
    return {"message": "ok"}




