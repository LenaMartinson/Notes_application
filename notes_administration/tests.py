from django.test import TestCase
from .models import Note, Users

class CreatingDb(TestCase):
    #def setUp(self):
        Note.objects.all().delete()
        Users.objects.all().delete()
        Users.objects.create(name="Ann", email="ann@ann.ann", users_id=1)
        Users.objects.create(name="Jane", email="jane@jane.jane", users_id=2)
        Users.objects.create(name="Nick", email="nick@nick.nick", users_id=3)
        Note.objects.create(author=Users.objects.get(users_id=1), text="good", to_whom=3)

    #def tearDown(self):
    #    pass
   

    #def test_something(self):
    #    self.assertEqual(1, 1)
   
