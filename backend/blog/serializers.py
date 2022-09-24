from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .models import Post, Comment, Category, Section, Tag, STATUS
from django.db import models

# Serializers define the API representation.

class UserSerializer(serializers.ModelSerializer):
    # posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # categories = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'comments']

# Serializer for post sections
class SectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Section
        fields = '__all__'

# Serializer for Tags
class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = '__all__'

# Serializer for viewing a post without pk values
class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    sections = SectionSerializer(many=True, read_only=True)
    category = serializers.ReadOnlyField(source='category.name')
    tags = TagSerializer(many=True)

    class Meta:
        model = Post
        fields = ('id', 'title', 'image', 'description', 'sections', 'author', 'category', 'created_at', 'updated_at', 'status', 'tags')

# Serializer for creating a new post
class PostCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'

# Serializer for updating a post
class PostUpdateSerializer(serializers.ModelSerializer):
    # sections = SectionSerializer(many=True)
    class Meta:
        model = Post
        fields = '__all__'
# Serializer for retrieving a new post with all pk values
class PostRetrieveSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True)
    class Meta:
        model = Post
        fields = ('id', 'title', 'image', 'description', 'sections', 'author', 'category',  'status')
        
class CommentSerializer(serializers.ModelSerializer):
    # owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Comment
        fields = ['id', 'post', 'body', 'owner']

# Serializer for categories
class CategorySerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'posts']
