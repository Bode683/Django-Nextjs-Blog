
from django.urls import path, include
from blog import views
# import routers
from rest_framework import routers

# import everything from views
from .views import *
# from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('', views.home, name="home"),
    path('summernote/', include('django_summernote.urls')),
]


# define the router
router = routers.DefaultRouter()

# define the router path and viewset to be used
router.register(r'post', PostViewSet)

# specify URL Path for rest_framework
urlpatterns = [
	path('', include(router.urls)),
	path('api-auth/', include('rest_framework.urls')),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>/', views.CommentDetail.as_view()),
    path('categories/', views.CategoryList.as_view()),
    path('categories/<int:pk>/', views.CategoryDetail.as_view()),
    path('section/', views.SectionList.as_view()),
    path('section/<int:pk>/', views.SectionDetail.as_view()),
]
# urlpatterns = format_suffix_patterns(urlpatterns)