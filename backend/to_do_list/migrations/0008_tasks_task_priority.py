# Generated by Django 3.2.6 on 2021-09-01 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('to_do_list', '0007_auto_20210901_1808'),
    ]

    operations = [
        migrations.AddField(
            model_name='tasks',
            name='task_priority',
            field=models.CharField(default=None, max_length=1),
        ),
    ]
