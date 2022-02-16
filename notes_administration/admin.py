from django.contrib import admin
from .models import Note
from .models import Users

admin.site.register(Note);
admin.site.register(Users);

# Register your models here.
