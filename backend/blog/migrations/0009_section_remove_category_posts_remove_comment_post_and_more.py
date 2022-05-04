# Generated by Django 4.0.4 on 2022-05-04 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_rename_post_comment_post_alter_post_cartegory_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='photos')),
                ('content', models.TextField(max_length=2000)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='category',
            name='posts',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='Post',
        ),
        migrations.DeleteModel(
            name='post',
        ),
    ]
