# Generated by Django 4.1.4 on 2023-12-25 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_mechanic'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_user',
            field=models.BooleanField(default=False),
        ),
    ]
