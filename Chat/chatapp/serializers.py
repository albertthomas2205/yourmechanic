from .models import Room, Message, User,Rooms
from rest_framework import serializers


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"
        
class RoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = "__all__"



class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ("id", "room", "user", "content", "timestamp", "seen")
        read_only_fields = ("id", "timestamp")



class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ("id", "room", "content", "timestamp", "seen")
        read_only_fields = ("id", "timestamp")

class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
