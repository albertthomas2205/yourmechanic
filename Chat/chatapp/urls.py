from django.urls import path

from . import views


urlpatterns = [
    path(
        "messages/",
        views.MessageList.as_view(),
        name="chat-messages",
    ),
       path(
        "messagess/",
        views.MessagesList.as_view(),
        name="chat-messages",
    ),
    path("chatrooms/", views.Chatroomlist.as_view(), name="chatrooms"),
    path("chatroomlist/", views.Listrooms.as_view(), name="chatrooms"),
    path("chatroommechanic/", views.Listroomsmechanic.as_view(), name="chatrooms"),
    path("findroom/", views.FindRoom.as_view(), name="findroom"),
     path("findrooms/", views.FindRooms.as_view(), name="findrooms"),
    path("getuser/", views.GetUser.as_view(), name="getuser"),
    path('lastmessage/',views.GetLastMessage.as_view(),name="lastmessage"),
]
