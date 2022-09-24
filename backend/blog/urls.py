
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
# router.register(r'users', UserViewSet)
# router.register(r'posts', PostViewSet)
# router.register(r'sections', SectionViewSet)
# router.register(r'categories', CategoryViewSet)
# router.register(r'comments', CommentViewSet)
# router.register(r'tag', TagViewSet)
# router.register(r'search', SearchViewSet)

# specify URL Path for rest_framework
urlpatterns = [
	path('', include(router.urls)),
	path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path('update/<int:pk>/', views.PostUpdate.as_view()),
    path('posts/create/', views.PostCreate.as_view()),
    path('posts/retrieve/<int:pk>/', views.PostRetrieve.as_view()),
    # path('posts/pagination/', views.PostPagination.as_view()),
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>/', views.CommentDetail.as_view()),
    path('categories/', views.CategoryList.as_view()),
    path('categories/<int:pk>/', views.CategoryDetail.as_view()),
    path('sections/', views.SectionList.as_view()),
    path('sections/<int:pk>/', views.SectionDetail.as_view()),
    path('tags/', views.TagList.as_view()),
    path('tags/<int:pk>/', views.TagDetail.as_view()),
    # path('search/', views.SearchResultsView.as_view()),
] 
# urlpatterns = format_suffix_patterns(urlpatterns)