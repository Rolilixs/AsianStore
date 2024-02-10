from Auth.models import User
from django.http import JsonResponse
from .serializers import *
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class PaymentTypeListView(generics.ListAPIView):
    queryset = PaymentType.objects.all()
    serializer_class = PaymentTypeSerializer


class DeliveryTypeListView(generics.ListAPIView):
    queryset = DeliveryType.objects.all()
    serializer_class = DeliveryTypeSerializer


class ProductsByCategoryListView(generics.ListAPIView):
    serializer_class = ProductsByCategorySerializer

    # def get(self, request, **kwargs):
    #     print(self.request.data)
    #     # serializer = ProductsByCategorySerializer(self.request.data)
    #     # return JsonResponse(serializer.data)

    def get_queryset(self):
        print(self.request.GET)
        category_id = self.request.GET['category_id'][0]
        return Product.objects.filter(category_id=category_id)
        # return Product.objects.all()


class ProfileData(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(self.request.user)
        return JsonResponse(serializer.data)

    def patch(self, request):
        serializer = UserUpdateSerializer(self.request.user,
                                          data=self.request.data,
                                          partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)


@csrf_exempt
def login(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        user = authenticate(
            request,
            phone_number=data['phone_number'],
            password=data['password'])
        if user is None:
            return JsonResponse(
                {'error': 'unable to login. check username and password'},
                status=400)
        else:
            try:
                token = Token.objects.get(user=user)
            except Exception as _:  # if token not in db, create a new one
                token = Token.objects.create(user=user)
            return JsonResponse({'token': str(token), 'username': user.username}, status=201)


@csrf_exempt
def register(request):
    if request.method == "POST":
        try:
            data = JSONParser().parse(request)
            user = User.objects.create(username=data["username"],
                                       password=make_password(data["password"]),
                                       phone_number=data["phone_number"],
                                       email=data["email"])
            user.save()

            token = Token.objects.create(user=user)
            return JsonResponse({'token': str(token)}, status=201)
        except IntegrityError:
            return JsonResponse(
                {'error': 'username taken. choose another username'},
                status=400)
