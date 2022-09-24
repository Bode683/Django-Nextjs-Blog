from xml.etree.ElementTree import Comment
from django.contrib import admin
from .models import Category, Post, Comment, Section, Tag


admin.site.register(Post)
admin.site.register(Section)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Tag)
