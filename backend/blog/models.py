from sys import maxsize
from turtle import title
from unicodedata import category
from django.db import models
# from django_extensions.db.fields import AutoSlugField
from django.contrib.auth.models import User

# class Profile(models.Model):
#     user = models.OneToOneField(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.PROTECT,
#     )
#     website = models.URLField(blank=True)
#     bio = models.CharField(max_length=240, blank=True)

#     def __str__(self):
#         return self.user.get_username()


# Create your models here.
STATUS = (
    (0, 'draft'),
    (1, 'published')   
)

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=False,null=True, blank=True)
    # post = models.ForeignKey(Post, related_name='tags', on_delete=models.CASCADE)

    def __unicode__(self):
                return self.name

class Category(models.Model):
    name = models.CharField(max_length=100, blank=False, default='')
    # slug = models.SlugField(max_length=255,  null=True, blank=True)
    posts = models.ManyToManyField('Post', related_name='categories', null=True, blank=True)

    class Meta:
        verbose_name_plural = 'categories'
    def __unicode__(self):
                return self.name


# class Author(models.Model):
#     name = models.CharField(max_length=50, unique=True)
#     image = models.ImageField(blank=True, upload_to = "photos/avatar")

class Post(models.Model):
    title = models.CharField(max_length = 255)
    # slug = models.SlugField(max_length=255, null=True, blank=True)
    image = models.ImageField(blank=True, null=True, upload_to = "photos/")
    description = models.TextField(max_length=200, null=True, blank=True)
    author = models.ForeignKey('auth.User', related_name='post', on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT, max_length=20, null=True, blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    status = models.IntegerField(choices=STATUS, default=0)
    tags = models.ManyToManyField(Tag, null=True, blank=True)
    

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title + ' | ' + str(self.author)


class Section(models.Model):
    title = models.CharField(max_length = 255, null=True, blank=True)
    post = models.ForeignKey(Post, related_name='sections', on_delete=models.CASCADE)
    media = models.FileField(upload_to = 'photos', null=True, blank=True)
    text = models.TextField(max_length=2000, null=True, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        unique_together = ['post', 'order']
        ordering = ['order']

    def __str__(self):
        return '%d: %s' % (self.order, self.post.title)

class Comment(models.Model):
    post = models.ForeignKey('Post', related_name='comments', on_delete=models.CASCADE)
    body = models.TextField(blank=False)
    owner = models.ForeignKey('auth.User', related_name='comments', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']
