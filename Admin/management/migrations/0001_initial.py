# Generated by Django 5.0 on 2023-12-20 05:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('time_required', models.IntegerField(help_text='Time required in minutes')),
                ('image', models.FileField(upload_to='yourmechanic_service')),
            ],
        ),
    ]
