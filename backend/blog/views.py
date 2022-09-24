from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from blog.pagination import CustomPageNumberPagination,PostListPagination

# import permissions
from rest_framework import permissions
from blog.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAdminUser
from rest_framework.filters import SearchFilter, OrderingFilter
from django.views.generic import ListView

# import viewsets
from rest_framework import viewsets, generics
from blog import serializers
from django.contrib.auth.models import User
  
# import local data
# from .serializers import PostSerializer, CommentSerializer, UserSerializer, CategorySerializer, SectionSerializer, TagSerializer
from .models import Post, Comment, Category, Section, Tag
  

def home(request):
    return render(request, 'home.html')

# class SearchResultsView(generics.ListCreateAPIView):
#     queryset = Post.objects.all()
#     serializer_class = serializers.PostSerializer(many=True)
    
    
    # filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    # filterset_fields = ['id','title', 'description']
    # search_fields = ['title', 'description']
    # odering_fields = ['id','created_at',
    #     'updated_at']

    # pagination_class = PageNumberPagination

# This view lists all users
class UserList(generics.ListCreateAPIView):
    # permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter,]
    filterset_fields = ['id','title', 'description',]
    pagination_class = None

# This view handles user details
class UserDetail(generics.RetrieveAPIView):
    # permission_classes = [IsAdminUser]

    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


# This view lists all posts with pagination
class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer
    
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter,]
    filterset_fields = ['id','title', 'author', 'category', 'status', ]
    search_fields = ['title', 'description', 'category__name', 'tags__name', '=author__username', 'sections__title',  'sections__text',]
    odering_fields = ['id','created_at',
        'updated_at',]

    # pagination_class = PostListPagination

# This view lists all posts without pagination
# class PostPagination(generics.ListCreateAPIView):
#     queryset = Post.objects.all()
#     serializer_class = serializers.PostSerializer
    
#     filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter,]
#     filterset_fields = ['id','title', 'author', 'category', 'status', ]
#     search_fields = ['title', 'description', 'category__name', 'tags__name', '=author__username', 'sections__title',  'sections__text',]
#     odering_fields = ['id','created_at',
#         'updated_at',]

    # pagination_class = PostListPagination

#This view handles post details without pk values
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer

#This view is used to create a new post
class PostCreate(generics.ListCreateAPIView):
    # permission_classes = [IsAdminUser]

    queryset = Post.objects.all()
    serializer_class = serializers.PostCreateSerializer

#This view retrieves a post with pk values
class PostRetrieve(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAdminUser]

    queryset = Post.objects.all()
    serializer_class = serializers.PostRetrieveSerializer

#This view is used to update a post
class PostUpdate(generics.RetrieveUpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = serializers.PostUpdateSerializer


# This view lists all sections without pagination
class SectionList(generics.ListCreateAPIView):
    queryset = Section.objects.all()
    serializer_class = serializers.SectionSerializer

    # pagination_class = CustomPageNumberPagination

#This view handles the details of each section
class SectionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Section.objects.all()
    serializer_class = serializers.SectionSerializer

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    pagination_class = None

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


# This view lists all categories
class CategoryList(generics.ListCreateAPIView):
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter,]
    filterset_fields = ['id','name',]

    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = None

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


# This view lists all Tags
class TagList(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter,]
    filterset_fields = ['id','name',]
    search_fields = ['name', ]
    odering_fields = ['id','name',]

    pagination_class = None

class TagDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# create the viewsets
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class PostViewSet(viewsets.ModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

# class CommentViewSet(viewsets.ModelViewSet):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer

# class CategoryViewSet(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer

# class SectionViewSet(viewsets.ModelViewSet):
#     queryset = Section.objects.all()
#     serializer_class = SectionSerializer

# class TagViewSet(viewsets.ModelViewSet):
#     queryset = Tag.objects.all()
#     serializer_class = TagSerializer

# class SearchViewSet(viewsets.ModelViewSet):
#     queryset = Post.objects.filter(title__icontains='main')
#     serializer_class = PostSerializer
