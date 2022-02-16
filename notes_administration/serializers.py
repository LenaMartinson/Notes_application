from rest_framework import serializers

from .models import Note, Users

class NoteSerializer(serializers.ModelSerializer):
    #url = serializers.HyperlinkedIdentityField(view_name="notes_administration:user-detail")

    class Meta:
        model = Note
        fields = '__all__'

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
