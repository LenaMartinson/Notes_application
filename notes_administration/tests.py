from django.test import TestCase
from .models import Note, Users
from django.test import Client

class CreatingDb(TestCase):
    def setUp(self):
        Note.objects.all().delete()
        Users.objects.all().delete()
        Users.objects.create(name="Ann", email="ann@ann.ann", user_id=1)
        Users.objects.create(name="Jane", email="jane@jane.jane", user_id=2)
        Users.objects.create(name="Nick", email="nick@nick.nick", user_id=3)
        Note.objects.create(author=Users.objects.get(user_id=1), text="good", to_whom=3, note_id=1)

    #def tearDown(self):
    #    pass
   

    def test_something(self):
        c = Client()
        response = c.get('/api/notes/?format=json')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
         [{"note_id":1,"text":"good","to_whom":"3","author":1}])
   
