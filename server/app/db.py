import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("MONGO_URL")
db = os.getenv("DB_NAME") 



client = motor.motor_asyncio.AsyncIOMotorClient(url)
db = client.get_database(db)
itemsCollection = db.get_collection("items")
meetingsCollection = db.get_collection('meetings')
notifsCollection = db.get_collection("notifications")
logsCollection = db.get_collection("logs")


# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You have successfully connected to MongoDB!")
# except Exception as e:
#     print(e)




