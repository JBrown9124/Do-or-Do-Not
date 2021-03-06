# Generated by Django 3.2.6 on 2021-09-11 13:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('to_do_list', '0024_rename_users_user'),
        ('friendship', '0004_auto_20200408_1844'),
    ]

    operations = [
        migrations.AlterField(
            model_name='block',
            name='blocked',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blockees', to='to_do_list.user'),
        ),
        migrations.AlterField(
            model_name='block',
            name='blocker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocking', to='to_do_list.user'),
        ),
        migrations.AlterField(
            model_name='follow',
            name='followee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followers', to='to_do_list.user'),
        ),
        migrations.AlterField(
            model_name='follow',
            name='follower',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to='to_do_list.user'),
        ),
        migrations.AlterField(
            model_name='friend',
            name='from_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='_unused_friend_relation', to='to_do_list.user'),
        ),
        migrations.AlterField(
            model_name='friend',
            name='to_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friends', to='to_do_list.user'),
        ),
        migrations.AlterField(
            model_name='friendshiprequest',
            name='from_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friendship_requests_sent', to='to_do_list.user'),
        ),
        migrations.AlterField(
            model_name='friendshiprequest',
            name='to_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friendship_requests_received', to='to_do_list.user'),
        ),
    ]
