# Generated by Django 3.2.6 on 2021-09-01 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('to_do_list', '0006_alter_users_user_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tasks',
            name='task_priority',
        ),
        migrations.AlterField(
            model_name='users',
            name='user_email',
            field=models.EmailField(max_length=254),
        ),
    ]