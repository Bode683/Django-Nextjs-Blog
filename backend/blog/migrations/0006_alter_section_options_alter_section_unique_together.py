# Generated by Django 4.0.4 on 2022-05-25 05:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_remove_post_body_alter_section_post'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='section',
            options={'ordering': ['order']},
        ),
        migrations.AlterUniqueTogether(
            name='section',
            unique_together={('post', 'order')},
        ),
    ]
