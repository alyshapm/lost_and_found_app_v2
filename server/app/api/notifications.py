from fastapi import APIRouter, HTTPException
from db import notifsCollection
from models import Notifications, NotifResponse
from bson import ObjectId
from typing import List
from pymongo import DESCENDING


notifs_router = APIRouter()



@notifs_router.get("/read/{user_id}", response_description="Fetch notifications by user", response_model=List[NotifResponse])
async def fetch_notifications_by_user(user_id: int):
    notifications_cursor = notifsCollection.find({"user_id": user_id}).sort("created_at", -1)
    notifications = await notifications_cursor.to_list(length=100)

    if notifications:
        return [NotifResponse(**{**notif, "id": notif["_id"]}) for notif in notifications]  # Changed _id to notif_id
    else:
        raise HTTPException(status_code=404, detail="No notifications found for this user")

@notifs_router.get("/read-all", response_description="Fetch all notifications", response_model=List[NotifResponse])
async def fetch_all_notifications():
    # Fetch all notifications sorted by creation date in descending order (latest first)
    notifications_cursor = notifsCollection.find().sort("created_at", DESCENDING)
    
    # Convert the cursor to a list with a limit of 100 (or change to the desired limit)
    notifications = await notifications_cursor.to_list(length=100)

    if notifications:
        # Prepare the response, mapping MongoDB's _id to 'id'
        return [NotifResponse(**{**notif, "id": str(notif["_id"])}) for notif in notifications]
    else:
        raise HTTPException(status_code=404, detail="No notifications found")

@notifs_router.put("/change_status/{notif_id}", response_description="Change notification status to read")
async def read_notifications(notif_id: str):  # Changed parameter name to notif_id
    try:
        notification_object_id = ObjectId(notif_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid notification ID format: {str(e)}")

    notification = await notifsCollection.find_one({"_id": notification_object_id})
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")

    update_result = await notifsCollection.update_one(
        {"_id": notification_object_id},
        {"$set": {"read": True}}
    )

    if update_result.modified_count == 1:
        return {"message": "Notification status updated"}
    else:
        raise HTTPException(status_code=500, detail="Failed to update notification status")
