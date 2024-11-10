from typing import Optional, List

from datetime import datetime
from bson import DBRef

from server.app.models import ItemsCollection
from db import meetingsCollection

class MeetingsCrud:
    # # post
    # @staticmethod
    # async def create_tracker(user: User, data: TrackerCreate) -> Tracker:
    #     tracker = Tracker(**data.dict(), owner=user)
    #     return await tracker.insert()

    # # get all data
    # async def 
   
    # @staticmethod
    # async def get_trackers_between_dates(user: User, past_week: datetime, today: datetime) -> List[Tracker]:
    #     owner_ref = DBRef('users', user.id)
    #     trackers = await Tracker.find({"owner": owner_ref, "date": {"$gte": past_week, "$lte": today}}).to_list()
    #     return trackers

