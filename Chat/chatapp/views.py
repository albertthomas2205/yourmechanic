

# Create your views here.

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Message
from .serializers import MessageSerializer  # Import your serializer

class RoomMessagesAPIView(APIView):
    def get(self, request, room_name):
        # Retrieve messages for the specified room
        messages = Message.objects.filter(room=room_name)[:25]

        # Serialize the messages
        serializer = MessageSerializer(messages, many=True)

        return Response({"messages": serializer.data, "room_name": room_name})

    def post(self, request, room_name):
        # Deserialize the incoming data
        serializer = MessageSerializer(data=request.data)

        if serializer.is_valid():
            # Save the new message with the specified room name
            serializer.save(room=room_name)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
