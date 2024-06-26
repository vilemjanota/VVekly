from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Habit

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ['user', 'id', 'title', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        extra_kwargs = {'user': {'read_only': True}}