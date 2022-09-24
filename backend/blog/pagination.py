from rest_framework import pagination

class PostListPagination(pagination.PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 50

class CustomPageNumberPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50

class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000