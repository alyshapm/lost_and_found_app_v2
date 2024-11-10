from typing import List

from fastapi import HTTPException
from bson import ObjectId

from models import ItemsCollection, Meeting,Item
from db import itemsCollection
from datetime import datetime
class ItemsCrud:

    # get all data

    async def list_allItems() :
        return ItemsCollection(items=await itemsCollection.find().to_list(1000))
 
    async def create_item(item):
        return await itemsCollection.insert_one(dict(item))

    async def get_item_byId(id):
        return await itemsCollection.find_one({"_id": ObjectId(id)})

    async def delete_item(id):
        return await itemsCollection.delete_one({"_id": ObjectId(id)})

    async def update_item_status(items_collection , id, update_fields):
        # Convert the id to ObjectId
        object_id = ObjectId(id)

        # Update the item
        result = await items_collection.update_one(
            {"_id": object_id},
            {"$set": update_fields}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Item not found")

        # Fetch the updated item
        updated_item = await items_collection.find_one({"_id": object_id})
        
        if updated_item:
            return updated_item
        else:
            raise HTTPException(status_code=404, detail="Item not found")
    
    async def approve_item(item_id: str):
        try:
            # Convert item_id to ObjectId
            object_id = ObjectId(item_id)
            
            # Update the status to 'Approved'
            result = await itemsCollection.update_one(
                {"_id": object_id},
                {"$set": {"status": "active", "published_at": str(datetime.now().isoformat())}}
                
            )
            
            if result.matched_count == 0:
                return None  # No item found with this id
            
            # Fetch the updated item
            updated_item = await itemsCollection.find_one({"_id": object_id})
            
            if updated_item:
                updated_item["_id"] = str(updated_item["_id"])

            return updated_item
        
        
        except Exception as e:
            print(f"Error: {e}")
            return None
    
    # async def activate_item()



    async def set_item_status(item_id: str, status: str):
        try:
            # Convert item_id to ObjectId
            object_id = ObjectId(item_id)
            
            # Update the status
            result = await itemsCollection.update_one(
                {"_id": object_id},
                {"$set": {"status": status}}
            )
            
            if result.matched_count == 0:
                return None  # No item found with this id
            
            # Fetch the updated item
            updated_item = await itemsCollection.find_one({"_id": object_id})
            return updated_item
        
        except Exception as e:
            print(f"Error: {e}")
            return None




        
    


