import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from .models import Messages, Rooms, User
import random
import string

class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = None
        self.room_group_name = None
        self.room = None
        self.user = None
    

    async def connect(self):
        print("Connecting...")
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.user = self.scope["url_route"]["kwargs"]["user_id"] or "Anonymous"
        print(self.user)
     
        if not self.room_name or len(self.room_name) > 100:
            await self.close(code=400)
            return
        self.room_group_name = f"chat_{self.room_name}"
        self.room = await self.get_or_create_room()
 
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
      

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data.get("message")  # Use get to avoid KeyError
        if not message or len(message) > 555:
            return 

        message_obj = await self.create_message(message)
        if message_obj:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": message_obj.content,
                    "timestamp": str(message_obj.timestamp),
                    "seen": message_obj.seen,
                    'senderid':message_obj.senderid
                },
            )

  
    async def chat_message(self, event):
        message = event["message"]
        timestamp = event["timestamp"]
        senderid = event["senderid"]
        await self.send(
            text_data=json.dumps(
                {"message": message, "timestamp": timestamp,"senderid":senderid}
            )
        )


    @database_sync_to_async
    def create_message(self, message):
        try:
           
            return Messages.objects.create(
                room=self.room, content=message,senderid =self.user
            )
        except Exception as e:
            print(f"Error creating message: {e}")
            return None

    @database_sync_to_async
    def get_or_create_room(self):
        room, _ = Rooms.objects.get_or_create(name=self.room_name)
        return room

 