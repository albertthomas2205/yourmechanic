import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from .models import Message, Room, User
import random
import string

class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = None
        self.room_group_name = None
        self.room = None
        self.user = None
        self.users = None

    async def connect(self):
        print("Connecting...")
        print("rtrt", self.scope["url_route"]["kwargs"]["username"])
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.userr = self.scope["url_route"]["kwargs"]["username"] or "Anonymous"
        if not self.room_name or len(self.room_name) > 100:
            await self.close(code=400)
            return
        self.room_group_name = f"chat_{self.room_name}"
        self.room = await self.get_or_create_room()
        self.user = await self.get_or_create_user()

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.create_online_user(self.user)
        await self.send_user_list()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        # await self.remove_online_user(self.user)
        await self.send_user_list()

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
                    "username": message_obj.user.username,
                    "timestamp": str(message_obj.timestamp),
                    "seen": message_obj.seen,
                },
            )

    async def send_user_list(self):
        user_list = await self.get_connected_users()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "user_list",
                "user_list": user_list,
            },
        )

    async def chat_message(self, event):
        message = event["message"]
        username = event["username"]
        timestamp = event["timestamp"]
        await self.send(
            text_data=json.dumps(
                {"message": message, "username": username, "timestamp": timestamp}
            )
        )

    async def user_list(self, event):
        user_list = event["user_list"]
        await self.send(text_data=json.dumps({"user_list": user_list}))

    @database_sync_to_async
    def create_message(self, message):
        try:
            user_instance, _ = User.objects.get_or_create(username=self.user.username)
            return Message.objects.create(
                room=self.room, content=message, user=user_instance
            )
        except Exception as e:
            print(f"Error creating message: {e}")
            return None

    @database_sync_to_async
    def get_or_create_room(self):
        room, _ = Room.objects.get_or_create(name=self.room_name)
        return room

    @database_sync_to_async
    def get_or_create_user(self):
        userr = User.objects.get_or_create(username=self.userr)
        user = User.objects.get(username=self.userr)
        return user

    @database_sync_to_async
    def create_online_user(self, user):
        try:
            self.room.userslist.add(user.id)
            self.room.save()
            self.user.is_online = True
            self.user.save()
        except Exception as e:
            print("Error joining user to room:", str(e))
            return None

    @database_sync_to_async
    def remove_online_user(self, user):
        try:
            self.room.userslist.remove(user)
            self.room.save()
            self.user.is_online = False
            self.user.save()
        except Exception as e:
            print("Error removing user to room:", str(e))
            return None

    @database_sync_to_async
    def get_connected_users(self):
        return [user.username for user in self.room.userslist.all()]









# class NotificationConsumer(AsyncWebsocketConsumer):
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.room_name = None
#         self.room = None
#         self.user = None
#         self.room_group_name = None
        
#     async def connect(self):
#         print("Connecting...")
#         self.userr = self.scope["url_route"]["kwargs"]["username"] or "Anonymous"
#         if not self.userr or len(self.userr) > 100:
#             await self.close(code=400)
#             return
#         self.user = await self.get_or_create_user()
#         self.room = await self.get_or_create_room()
#         self.room_group_name = self.room_name
#         await self.channel_layer.group_add(self.room_group_name, self.channel_name)
#         await self.accept()
#         await self.create_online_user()
        

#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
#         await self.remove_online_user()
        
#     async def send_notification(self, event):
#         await self.send(text_data=json.dumps({ 'user':event['user'],"notification_type":event["notification_type"],
#                                               'post_id':event['post_id'],'by_user':event['by_user']}))
        
#     # async def send_notification(self, notification):
#     #     await self.channel_layer.group_send(
#     #         self.room_group_name,
#     #         {
#     #             'type': 'notification',
#     #             'message': notification.content,
#     #             'timestamp': notification.created_at,
#     #             'seen': notification.seen,
#     #         },
#     #     )
        
            
        
#     # async def notification(self, event):
#     #     content = event['message']
#     #     created_at = event['timestamp']
#     #     seen = event['seen']
#     #     await self.send(
#     #         text_data=json.dumps(
#     #             {"content": content, "created_at": created_at, "seen": seen}
#     #         )
#     #     )
#     #     print('done')



#     def generate_mixed_string(self, length=10):
#         characters = string.digits + string.ascii_letters 
#         mixed_string = ''.join(random.choice(characters) for _ in range(length))
#         return mixed_string
    
#     @database_sync_to_async
#     def get_or_create_room(self):
#         try:
#             room = NotificationRoom.objects.get(user=self.user)
#             self.room_name = room.name
#             print(self.room_name)
#         except:
#             self.room_name = self.generate_mixed_string()
#             room = NotificationRoom.objects.create(user=self.user, name=self.room_name)
#         return room

#     @database_sync_to_async
#     def get_or_create_user(self):
#         userr = User.objects.get_or_create(username=self.userr)
#         user = User.objects.get(username=self.userr)
#         print("user_created", user.id)
#         return user
    
#     @database_sync_to_async
#     def create_online_user(self):
#         self.user.is_online = True
#         self.user.save()

#     @database_sync_to_async
#     def remove_online_user(self):
#         self.user.is_online = False
#         self.user.save()