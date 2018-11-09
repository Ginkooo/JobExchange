from django.test import TestCase
from django.contrib.auth import get_user_model

from jobs import models


class UserTests(TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            id=4,
            username='foo',
            password='bar',
        )
        self.client.login(username='foo', password='bar')

    def test_can_list_users_one_can_work_for(self):
        cleaning = models.Job.objects.create(name='cleaning')
        dishing = models.Job.objects.create(name='dishing')
        grooming = models.Job.objects.create(name='grooming')

        users = [
            get_user_model().objects.create_user(
                id=1,
                username='test',
                password='sdfsdf',
            ),
            get_user_model().objects.create_user(
                id=2,
                username='test2',
                password='dsfsd',
            ),
            get_user_model().objects.create_user(
                id=3,
                username='test3',
                password='dsfsd',
            ),
        ]

        self.user.would_want.add(cleaning)
        self.user.would_do.add(dishing)

        users[0].would_do.add(cleaning)
        users[0].would_want.add(dishing, grooming)
        users[1].would_want.add(cleaning, dishing)
        users[2].would_want.add(grooming, cleaning)

        resp = self.client.get('/api/user/?related=true')

        self.maxDiff = None

        self.assertDictEqual(
            {
                'users_would_do': {
                    'cleaning': [
                        {
                            'email': '',
                            'id': 1,
                            'username': 'test',
                            'would_do': [{'id': 1, 'name': 'cleaning'}],
                            'would_want': [
                                {'id': 2, 'name': 'dishing'},
                                {'id': 3, 'name': 'grooming'},
                            ],
                        }
                    ]
                },
                'users_would_employ': {
                    'dishing': [
                        {
                            'email': '',
                            'id': 1,
                            'username': 'test',
                            'would_do': [{'id': 1, 'name': 'cleaning'}],
                            'would_want': [
                                {'id': 2, 'name': 'dishing'},
                                {'id': 3, 'name': 'grooming'},
                            ],
                        },
                        {
                            'email': '',
                            'id': 2,
                            'username': 'test2',
                            'would_do': [],
                            'would_want': [
                                {'id': 1, 'name': 'cleaning'},
                                {'id': 2, 'name': 'dishing'},
                            ],
                        }
                    ]
                },
            },
            resp.json()
        )
