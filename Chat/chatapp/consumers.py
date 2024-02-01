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
    

    async def connect(self):
        print("Connecting...")
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
     
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
                },
            )

  
    async def chat_message(self, event):
        message = event["message"]
        timestamp = event["timestamp"]
        await self.send(
            text_data=json.dumps(
                {"message": message,  "timestamp": timestamp}
            )
        )


    @database_sync_to_async
    def create_message(self, message):
        try:
           
            return Messages.objects.create(
                room=self.room, content=message
            )
        except Exception as e:
            print(f"Error creating message: {e}")
            return None

    @database_sync_to_async
    def get_or_create_room(self):
        room, _ = Rooms.objects.get_or_create(name=self.room_name)
        return room

    # @database_sync_to_async
    # def get_or_create_user(self):
    #     userr = User.objects.get_or_create(username=self.userr)
    #     user = User.objects.get(username=self.userr)
    #     return user

    # @database_sync_to_async
    # def create_online_user(self, user):
    #     try:
    #         self.room.userslist.add(user.id)
    #         self.room.save()
    #         self.user.is_online = True
    #         self.user.save()
    #     except Exception as e:
    #         print("Error joining user to room:", str(e))
    #         return None

    # @database_sync_to_async
    # def remove_online_user(self, user):
    #     try:
    #         self.room.userslist.remove(user)
    #         self.room.save()
    #         self.user.is_online = False
    #         self.user.save()
    #     except Exception as e:
    #         print("Error removing user to room:", str(e))
    #         return None

    # @database_sync_to_async
    # def get_connected_users(self):
    #     return [user.username for user in self.room.userslist.all()]
    
# consumers.py
# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from asgiref.sync import sync_to_async
# from .models import Messages, Rooms

# class ChatConsumer(AsyncWebsocketConsumer):
#     print("albertttt")
#     async def connect(self):
#         self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.room_group_name = f"chat_{self.room_name}"

#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )

#         await self.accept()

#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )

#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         message = data['message']

#         await self.save_message(message)

#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 'type': 'chat.message',
#                 'message': message
#             }
#         )

#     async def chat_message(self, event):
#         message = event['message']

#         await self.send(text_data=json.dumps({
#             'message': message
#         }))

#     @sync_to_async
#     def save_message(self, message):
#         room = Rooms.objects.get(name=self.room_name)
#         Messages.objects.create(room=room, content=message)
