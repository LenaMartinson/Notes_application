#from urllib import response
from django.shortcuts import render
from .models import Note
from .models import Users

def notes_list(request):
    notes = Note.objects.all()
    users = Users.objects.all()
    return render(request, 'notes_administration/notes_list.html', {'notes' : notes, 'users' : users})

def users_list(request):
    users = Users.objects.all()
    return render(request, 'notes_administration/users_list.html', {'users' : users})


from rest_framework import viewsets
from .serializers import NoteSerializer, UsersSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('note_id')
    serializer_class = NoteSerializer

class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all().order_by('user_id')
    serializer_class = UsersSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
