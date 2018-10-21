from django.test import TestCase

from django.contrib.auth import get_user_model


class AuthTests(TestCase):

    def test_can_sign_up(self):
        data = {
            'username': 'test',
            'password': 's3cr3t',
            'email': 'test@test.com'
        }

        resp = self.client.post('/signup/', data, content_type='application/json')
        self.assertEqual(201, resp.status_code)
        user = get_user_model().objects.get(username='test')
        self.assertEqual('test@test.com', user.email)

    def test_can_get_auth_token(self):
        get_user_model().objects.create_user(
            username='test',
            password='foo',
            email='test@test.com',
        )

        data = {
            'username': 'test',
            'password': 'foo',
        }

        resp = self.client.post('/get-token/', data).json()

        self.assertIn('token', resp)
