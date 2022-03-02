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
        Note.objects.create(author=Users.objects.get(user_id=2), text="bad", to_whom=3, note_id=2)

    #def tearDown(self):
    #    pass
   

    def test_json(self):
        c = Client()
        resp1 = c.get('/api/notes/?format=json')
        self.assertEqual(resp1.status_code, 200)
        a = {"note_id":1,"text":"good","to_whom":"3","author":1}
        b = {'author': 2, 'note_id': 2, 'text': 'bad', 'to_whom': '3'}
        self.assertJSONEqual(str(resp1.content, encoding='utf8'), [a, b])
        resp2 = c.get('/api/notes/2/?format=json')
        self.assertEqual(resp2.status_code, 200)  
        self.assertJSONEqual(str(resp2.content, encoding='utf8'), b)
        resp3 = c.get('/api/notes/3/?format=json')
        self.assertEqual(resp3.status_code, 404)  
        self.assertJSONEqual(str(resp3.content, encoding='utf8'), {"detail":"Not found."})

   
