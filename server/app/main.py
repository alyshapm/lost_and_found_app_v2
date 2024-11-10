from fastapi import FastAPI
from api import items, meetings,notifications
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from db import itemsCollection, meetingsCollection, client


app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.items_router, prefix="/items", tags=["items"])
app.include_router(meetings.meetings_router, prefix="/meeting", tags=["meetings"])
app.include_router(notifications.notifs_router, prefix="/notification", tags=["notifications"])
# app.include_router(user_service.user_router, prefix="/user", tags=["user"])


@app.get("/")
async def index():
    return {"message" : "Welcome to our API!"}


# async def listen_to_changes():
#     async with itemsCollection.watch() as stream:
#         async for change in stream:
#             if change['operationType'] == 'update':
#                 item_id = change['documentKey']['_id']
#                 updated_fields = change['updateDescription']['updatedFields']

#                 # Ensure item_id is in ObjectId format
#                 if not isinstance(item_id, ObjectId):
#                     item_id = ObjectId(item_id)

#                 # Prepare the update fields for meetings
#                 update_fields = {f"item.$.{key}": value for key, value in updated_fields.items()}

#                 # Update meetings with the updated item details
#                 result = await meetingsCollection.update_many(
#                     {"item._id": item_id},
#                     {"$set": update_fields}
#                 )
#                 if result.modified_count > 0:
#                     print(f"Updated {result.modified_count} meetings with item ID {item_id}")

# @app.on_event("startup")
# async def startup_event():
#     # Start the change stream listener in the background
#     asyncio.create_task(listen_to_changes())

# @app.on_event("shutdown")
# async def shutdown_event():
#     # Close the MongoDB connection gracefully
#     client.close()




