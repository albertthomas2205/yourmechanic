# Generated by Django 4.1.4 on 2023-12-27 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_customuser_is_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_mechanicactive',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='customuser',
            name='is_useractive',
            field=models.BooleanField(default=False),
        ),
    ]
