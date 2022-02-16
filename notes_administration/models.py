from django.db import models
from django.conf import settings

class Users(models.Model):
    #name = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.TextField()
    email = models.EmailField(default=None)
    users_id = models.IntegerField()

    def publish(self):
        self.save()



class Note(models.Model):
    author = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='+')
    #author = models.ManyToManyField(Users)
    #author = models.TextField()
    text = models.TextField()
    to_whom = models.TextField()
    #to_whom = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='+', default=None) 

    def publish(self):
        self.save()



# Create your models here.
