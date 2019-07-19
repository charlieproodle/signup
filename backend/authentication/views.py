from django.shortcuts import render

from rest_framework import views, status 
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response 
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserSerializer

from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Q
from django.core.files.base import ContentFile
from django.core.mail import send_mail



# --- Some auxillary functions --- #

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# --- Main views --- #

class LoginView(views.APIView):

	permission_classes = (AllowAny,) 

	def post(self, request):
		user = authenticate(
			username = request.data['username'], 
			password = request.data['password']
			)
		# If the user exists send back details
		if user is not None:
			serializer = UserSerializer(user)
			return_data = {
				"tokens" : get_tokens_for_user(user), 
				"user_details": serializer.data
			}
			return Response(return_data, status = status.HTTP_200_OK)
		# Otherwise send back login failure
		else:
			return Response({ "detail" : "Username or password invalid" }, status = status.HTTP_401_UNAUTHORIZED)

class RegisterView(views.APIView):

	# This allows a global permission 
	permission_classes = (AllowAny,) 

	def post(self, request):
		details = request.data
		username = details['username']
		password = details['password']
		# Check if user exists
		if len(User.objects.filter(username = username)) == 0:
			# Create user if user doesn't exists
			user = User.objects.create(
				username = username,
				password = password
				)
			serializer = UserSerializer(user)
			return_data = {
				"tokens": get_tokens_for_user(user),
				"user_details": serializer.data
			}
			return Response(return_data, status = status.HTTP_201_CREATED)
		# If user does exist send back an error
		else:
			return Response({"detail": "User already exists"}, status = status.HTTP_401_UNAUTHORIZED)


class AuthView(views.APIView):
	def get(self, request):
		user = request.user
		serializer = UserSerializer(user)
		tokens = get_tokens_for_user(user)
		authResponse = {
			'user': serializer.data,
			'tokens': tokens
		}
		return Response(authResponse, status = status.HTTP_200_OK)

			