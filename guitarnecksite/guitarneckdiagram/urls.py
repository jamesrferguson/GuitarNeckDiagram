from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('scale/<str:key>/<str:scaleType>', views.GuitarNeck.as_view(), name='scale'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
        document_root=settings.STATIC_ROOT)