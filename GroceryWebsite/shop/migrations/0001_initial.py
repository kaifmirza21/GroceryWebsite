# Generated by Django 3.2.9 on 2022-06-01 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('cat_ID', models.AutoField(primary_key=True, serialize=False)),
                ('cat_name', models.CharField(max_length=30)),
                ('cat_image', models.ImageField(default='', upload_to='shop/images')),
            ],
        ),
    ]
