from django.db import models
from django.contrib.auth.models import User

class Habit(models.Model):
    title =  models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habits')

    def __str__(self):
        return self.title