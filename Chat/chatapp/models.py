from django.db import models
from django.contrib.postgres.fields import JSONField

class User(models.Model):
    username = models.CharField(max_length=255)
    is_online = models.BooleanField(default=False)
    def __str__(self):
        return self.username



class Room(models.Model):
    name = models.CharField(max_length=100)
    userslist = models.ManyToManyField(to=User, blank=True)
    @property
    def online(self):
        return self.userslist.filter(is_online=True)
    
    
    
class Rooms(models.Model):
    name = models.CharField(max_length=100)
    mechanic = models.IntegerField()
    user = models.IntegerField()
    
class Message(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, related_name="messages", on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(default=False)
    class Meta:
        db_table = "chat_message"
        ordering = ("timestamp",)

    
class Messages(models.Model):
    room = models.ForeignKey(Rooms, related_name="messages", on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(default=False)
    class Meta:
        db_table = "chat_messages"
        ordering = ("timestamp",)


