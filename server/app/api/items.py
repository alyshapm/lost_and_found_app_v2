from fastapi import APIRouter, HTTPException
from db import itemsCollection, notifsCollection
from models import Item, ItemsCollection, ItemResponse, ClaimItem, Notifications
from bson import ObjectId
from crud.items_crud import ItemsCrud
from datetime import datetime



items_router = APIRouter()

@items_router.post("/new", response_description="Post a new lost item")
async def create_item(item: Item):

    result = await ItemsCrud.create_item(item)
    if result.inserted_id:
         # Notify the founder for verification
        notification = Notifications(
        user_id=item.founded_by,
        item_id= result.inserted_id,
        title= "Found Item Pending Approval",
        message = f"Please confirm and verify the {item.name} you found.",
        type="verification_request",
        read=False
        )
        await notifsCollection.insert_one(notification.dict())

        return {"message": "Item posted successfully"}
    
    else:
        raise HTTPException(status_code=500, detail="Failed to post item")

@items_router.get("/", response_description="List all items", response_model=ItemsCollection)

async def list_items():
    """
    List all of the items in the database.

    The response is unpaginated and limited to 1000 results.
    """
    return await ItemsCrud.list_allItems()


@items_router.get("/{id}", response_description="Get a specific item", response_model=Item)
async def get_item(id: str):
    item = await ItemsCrud.get_item_byId(id)
    if item is not None:
                
        return item
    
    raise HTTPException(status_code=404, detail="Item not found")



@items_router.delete("/delete/{id}", response_description="Delete an item")
async def delete_item(id: str):

    result = await ItemsCrud.delete_item(id)
    if result.deleted_count:
        return {"message": "Item deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Item not found")



@items_router.put("/claim/{item_id}", response_description="Claim an item", response_model=ItemResponse)
async def claim_item(item_id: str, claim: ClaimItem):
    # Define the updated fields
    update_fields = {
        "status": "claimed",
        "claimed_by": claim.claimed_by,
        "claim_date": str(datetime.now().isoformat)
    }

    # Call the CRUD function to update the item
    updated_item = await ItemsCrud.update_item_status(itemsCollection, item_id, update_fields)

    return ItemResponse(**updated_item)
    


@items_router.put("/update/{item_id}", response_description="Update item details", response_model=Item)
async def update_item(update: ItemResponse):
    try:
        # Convert item_id to ObjectId
        object_id = ObjectId(update.id)
        
        # Convert update fields to dictionary and remove None values
        update_data = {k: v for k, v in update.dict().items() if v is not None}
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No fields to update provided")
        
        # Update the item in the collection
        result = await itemsCollection.update_one(
            {"_id": object_id}, 
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Item not found")
        
        # Fetch and return the updated item
        updated_item = await itemsCollection.find_one({"_id": object_id})
        if updated_item:
            return Item(**updated_item)
        else:
            raise HTTPException(status_code=404, detail="Item not found after update")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@items_router.put("/approve/{item_id}", response_description="Founder approve item")
async def approve_item(item_id):
    try:
        # Call the CRUD function to approve the item
        updated_item = await ItemsCrud.approve_item(item_id)
        
        if updated_item:
            # # Notify the founder for verification
            # notification = Notifications(
            # user_id=updated_item.get("founded_by"),
            # item_id= updated_item.get("_id"),
            # message="Your meeting has been approved. Please be on time.",
            # type="meeting_approved",
            # read=False
            # )
            # await notifsCollection.insert_one(notification.dict())
                    

            return {"message": "Item approved successfully", "item": updated_item}
        else:
            raise HTTPException(status_code=404, detail="Item not found")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")




# waitiing for approval 

# active 

# on hold claimed


