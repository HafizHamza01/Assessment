# Generated by Django 5.2.3 on 2025-06-19 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('Todo', 'Todo'), ('Inprogress', 'Inprogress'), ('Completed', 'Completed')], default='Todo'),
        ),
    ]
