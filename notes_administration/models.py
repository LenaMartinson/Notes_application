from django.db import models
from django.conf import settings

class Users(models.Model):
    name = models.TextField()
    email = models.EmailField(default=None)
    user_id = models.IntegerField(primary_key=True, auto_created=True)

    def publish(self):
        self.save()



class Note(models.Model):
    author = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='+')
    text = models.TextField()
    to_whom = models.TextField()
    note_id = models.IntegerField(primary_key=True, auto_created=True)

    def publish(self):
        self.save()



