# Generated by Django 3.2.6 on 2021-09-01 15:57

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('to_do_list', '0005_tasks_task_completed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='user_email',
            field=models.EmailField(max_length=254, unique=True, validators=[django.core.validators.EmailValidator()]),
        ),
    ]
