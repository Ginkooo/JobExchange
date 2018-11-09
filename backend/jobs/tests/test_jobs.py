from django.test import TestCase
from django.contrib.auth import get_user_model

from jobs import models


class JobTests(TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='spam',
            password='s3cr3t',
            email='foo@bar.com'
        )
        self.client.login(username=self.user.username, password='s3cr3t')

    def test_can_list_jobs(self):
        job1 = models.Job.objects.create(name='cleaning')
        job1.users_doing.add(self.user)
        job2 = models.Job.objects.create(name='dishing')
        job2.users_wanting.add(self.user)

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

    def test_can_add_favorite_job(self):
        job_do = models.Job.objects.create(name='cleaning')
        job_want = models.Job.objects.create(name='dishing')

        resp_do = self.client.put('/api/favjob/', {
                            'id': job_do.id,
                            'would_do': True,
                        },
                        content_type='application/json')
        self.assertEqual(200, resp_do.status_code)

        resp_want = self.client.put('/api/favjob/', {
                            'id': job_want.id,
                            'would_want': True,
                        },
                        content_type='application/json')
        self.assertEqual(200, resp_want.status_code)

        self.assertEqual(job_want.id, resp_want.data['id'])

        self.assertIn(self.user, job_do.users_doing.all())
        self.assertIn(self.user, job_want.users_wanting.all())

    def test_can_list_related_jobs(self):
        pass
