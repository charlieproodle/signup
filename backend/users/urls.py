from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [

	path('login/', views.LoginView.as_view()),
	path('signup/', views.RegisterView.as_view()),
	path('auth/', views.AuthView.as_view())
	# path(r'^register/', views.RegisterView.as_view()),

]