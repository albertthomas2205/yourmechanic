# Generated by Django 5.0 on 2024-01-17 04:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookings',
            name='place',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
