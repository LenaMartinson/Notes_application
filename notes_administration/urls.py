from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'notes', views.NoteViewSet)
router.register(r'users', views.UsersViewSet)

urlpatterns = [
    path('notes/', views.notes_list, name='notes_list'),
    path('users/', views.users_list, name='users_list'),
    path('api/', include(router.urls)),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
