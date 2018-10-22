from django.test import TestCase
from django.contrib.auth import get_user_model

from jobs import models


class JobTests(TestCase):

    def test_can_list_jobs(self):
        job1 = models.Job.objects.create(name='cleaning')
        job2 = models.Job.objects.create(name='dishing')

        resp = self.client.get('/api/job/').json()

        self.assertListEqual([
            {
                'id': job1.id,
                'name': job1.name
            },
            {
                'id': job2.id,
                'name': job2.name
            }
        ],
            resp
        )
