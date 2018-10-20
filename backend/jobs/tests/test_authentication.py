from django.test import TestCase

from django.contrib.auth import get_user_model


class AuthTests(TestCase):

    def test_can_sign_up(self):
        data = {
            'username': 'test',
            'password': 's3cr3t',
            'email': 'test@test.com'
        }

        resp = self.client.post('/signup/', data).json()
        self.assertIn('token', resp)

    def test_can_get_auth_token(self):
        user = get_user_model().objects.create_user(
            username='test',
            password='foo',
            email='test@test.com',
        )
        resp = self.client.get('/get-token/')
        print(resp)
        import ipdb; ipdb.set_trace()
