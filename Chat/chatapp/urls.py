from django.urls import path

from . import views


urlpatterns = [
    path(
        "messages/",
        views.MessageList.as_view(),
        name="chat-messages",
    ),
    path("chatrooms/", views.Chatroomlist.as_view(), name="chatrooms"),
    path("findroom/", views.FindRoom.as_view(), name="findroom"),
    path("getuser/", views.GetUser.as_view(), name="getuser"),
    path('lastmessage/',views.GetLastMessage.as_view(),name="lastmessage"),
]
