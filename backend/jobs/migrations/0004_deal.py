# Generated by Django 2.1.2 on 2018-11-04 18:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_auto_20181017_1623'),
    ]

    operations = [
        migrations.CreateModel(
            name='Deal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee_approved', models.BooleanField(default=False)),
                ('employer_approved', models.BooleanField(default=False)),
                ('employee', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='deals_gave', to=settings.AUTH_USER_MODEL)),
                ('employer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='deals_took', to=settings.AUTH_USER_MODEL)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='deals', to='jobs.Job')),
            ],
        ),
    ]
