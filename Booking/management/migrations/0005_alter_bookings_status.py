# Generated by Django 5.0 on 2024-01-29 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0004_alter_bookings_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookings',
            name='status',
            field=models.CharField(choices=[('p', 'Pending'), ('s', 'Scheduled'), ('w', 'ongoing'), ('c', 'Completed'), ('d', 'Canceled')], default='p', max_length=1),
        ),
    ]
