
from typing import List

from fastapi import HTTPException
from bson import ObjectId

from models import Notifications
from db import notifsCollection

class NotificationsCrud:
    
    # notifications = Notifications()
    async def send_notification(meeting):
        await notifsCollection.insert_one(meeting)
        


    # notification = Notifications(
    #     user_id=updated_meeting.get("user_id"),
    #     item_id= updated_meeting.get("item_id"),
    #     title= "Meeting Rejected",
    #     message="Your meeting request has been rejected.",
    #     type="meeting_rejected",
    #     read=False
    # )