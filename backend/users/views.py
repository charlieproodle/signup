from django.shortcuts import render

from rest_framework import views, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView

from .serializers import UserSerializer

from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Q
from django.core.files.base import ContentFile
from django.core.mail import send_mail

from django.contrib.auth.models import User


# --- Some auxillary functions --- #


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {"refresh": str(refresh), "access": str(refresh.access_token)}


# --- Main views --- #


class LoginView(views.APIView):

    # Allow any request
    permission_classes = (AllowAny,)

    def post(self, request):
        # We authenticate the user here
        user = authenticate(
            username=request.data["username"], password=request.data["password"]
        )
        # If the user exists create tokens
        if user is not None:
            serializer = UserSerializer(user)
            return_data = {
                "tokens": get_tokens_for_user(user),
                "user_details": serializer.data,
            }
            tokens = get_tokens_for_user(user)
            return Response(tokens, status=status.HTTP_200_OK)
        # Otherwise send back login failure
        else:
            return Response(
                {"error": True, "detail": "Username or password invalid"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class RegisterView(CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data["username"])
            user = User.objects.get(username=serializer.data["username"])
            return Response(get_tokens_for_user(user), status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors)

class AuthView(views.APIView):
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        tokens = get_tokens_for_user(user)
        authResponse = {"user": serializer.data, "tokens": tokens}
        return Response(authResponse, status=status.HTTP_200_OK)
