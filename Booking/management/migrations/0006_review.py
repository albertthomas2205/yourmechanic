# Generated by Django 5.0 on 2024-01-29 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0005_alter_bookings_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField()),
                ('review', models.CharField(max_length=250)),
                ('mechanic_id', models.IntegerField(null=True)),
                ('service_name', models.CharField(max_length=250)),
                ('user_name', models.CharField(max_length=250)),
                ('booking_id', models.IntegerField(null=True, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
