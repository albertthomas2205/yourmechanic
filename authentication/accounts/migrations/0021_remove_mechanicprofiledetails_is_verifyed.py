# Generated by Django 5.0 on 2024-01-04 10:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0020_rename_is_verfiyed_mechanicprofiledetails_is_verifyed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mechanicprofiledetails',
            name='is_verifyed',
        ),
    ]