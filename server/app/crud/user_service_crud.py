# services/users_service.py

import httpx
from fastapi import HTTPException
import os
from dotenv import load_dotenv

load_dotenv()

api = os.getenv("USER_API_URL")



# Define your external API endpoint (e.g., user API)

class UserCrud:

    async def signup(user_data):
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(f"{api}/signup", json=user_data.dict())
                response.raise_for_status()  # Raise an exception if the status code is not 200-299
                return response.json()
            except httpx.HTTPStatusError as exc:
                raise HTTPException(status_code=response.status_code, detail=f"Error signing up user: {exc}")
            except httpx.RequestError as exc:
                raise HTTPException(status_code=500, detail=f"Error communicating with user service api: {exc}")
            
    
    async def signin(input):
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(f"{api}/signin", json=input)
                response.raise_for_status()
                return response.json()
            except httpx.HTTPStatusError as exc:
                raise HTTPException(status_code=response.status_code, detail=f"Error signing in: {exc}")
            except httpx.RequestError as exc:
                raise HTTPException(status_code=500, detail=f"Error communicating with user service api {exc}")
            

    async def logout():
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(f"{api}/logout")
                response.raise_for_status()
                return response.json()
            except httpx.HTTPStatusError as exc:
                raise HTTPException(status_code=response.status_code, detail=f"Error logging out: {exc}")
            except httpx.RequestError as exc:
                raise HTTPException(status_code=500, detail=f"Error communicating with user service api {exc}")
    
    # async def get_user(user_id: str):
    #     """Fetch user details from an external API."""
    #     async with httpx.AsyncClient() as client:
    #         try:
    #             # Make a request to the external API to get user info
    #             response = await client.get(f"{api}/{user_id}")
    #             response.raise_for_status()  # Raise exception if the status code is not 200
    #             user_data = response.json()
    #             return user_data
    #         except httpx.HTTPStatusError:
    #             raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found")
    #         except httpx.RequestError as exc:
    #             raise HTTPException(status_code=500, detail=f"Error communicating with user service: {exc}")

    async def get_current_user():
        """Fetch current users from an external API."""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(f"{api}/user_infor")
                response.raise_for_status()
                users_data = response.json()
                return users_data
            except httpx.HTTPStatusError:
                raise HTTPException(status_code=404, detail="User not found")
            except httpx.RequestError as exc:
                raise HTTPException(status_code=500, detail=f"Error communicating with user service: {exc}")
            
    async def get_all_users():
        """Fetch a list of all users from an external API."""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(f"{api}/all_infor")
                response.raise_for_status()
                users_data = response.json()
                return users_data
            except httpx.HTTPStatusError:
                raise HTTPException(status_code=404, detail="Users not found")
            except httpx.RequestError as exc:
                raise HTTPException(status_code=500, detail=f"Error communicating with user service: {exc}")
 

    async def refresh_token():
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(f"{api}/refresh_token")
                response.raise_for_status()
                users_data = response.json()
                return users_data
            except httpx.HTTPStatusError:
                raise HTTPException(status_code=404, detail="Error refreshing token")
            except httpx.RequestError as exc:
                raise HTTPException(status_code=500, detail=f"Error communicating with user service: {exc}")
            
    async def forget_password():
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(f"{api}/forgot")
                response.raise_for_status()
                users_data = response.json()
                return users_data
            except httpx.HTTPStatusError:
                raise HTTPException(status_code=404, detail="Error requesting password reset")
            except httpx.RequestError as exc:
                raise HTTPException(status_code=500, detail=f"Error communicating with user service: {exc}")


