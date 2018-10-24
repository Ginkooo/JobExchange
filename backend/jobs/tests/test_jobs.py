from django.test import TestCase
from django.contrib.auth import get_user_model

from jobs import models


class JobTests(TestCase):

    def test_can_list_jobs(self):
        user = get_user_model().objects.create_user(
            username='spam',
            password='s3cr3t',
            email='foo@bar.com'
        )
        self.client.login(username=user.username, password='s3cr3t')
        job1 = models.Job.objects.create(name='cleaning')
        job1.users_doing.add(user)
        job2 = models.Job.objects.create(name='dishing')
        job2.users_wanting.add(user)

        resp = self.client.get('/api/job/').json()

        self.assertListEqual([
            {
                'id': job1.id,
                'name': job1.name,
                'would_want': False,
                'would_do': True,
            },
            {
                'id': job2.id,
                'name': job2.name,
                'would_want': True,
                'would_do': False,
            }
        ],
            resp
        )
