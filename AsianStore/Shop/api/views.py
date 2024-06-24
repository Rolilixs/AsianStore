from .serializers import *
from Auth.models import User
from django.db import IntegrityError
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, permissions, mixins, status
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class PaymentTypeListView(generics.ListAPIView):
    queryset = PaymentType.objects.all()
    serializer_class = PaymentTypeSerializer


class DeliveryTypeListView(generics.ListAPIView):
    queryset = DeliveryType.objects.all()
    serializer_class = DeliveryTypeSerializer


class ProductsListView(generics.ListAPIView):
    serializer_class = ProductsSerializer

    def get_queryset(self):
        return Product.objects.filter(category_id=self.kwargs['category_id'])


class ProductPhotosListView(generics.ListAPIView):
    serializer_class = ProductImageSerializer

    def get_queryset(self):
        return ProductImage.objects.filter(product_id=self.kwargs['product_id'])


class ProductDetailsView(generics.RetrieveAPIView):
    serializer_class = ProductDetailsSerializer
    queryset = Product


class FavouritesListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductsSerializer

    def get_queryset(self):
        user_favourites = Favourite.objects.filter(user_id=self.request.user.id)
        return Product.objects.filter(pk__in=user_favourites)


class FavouritesCreateDestroyView(generics.GenericAPIView, mixins.CreateModelMixin, mixins.DestroyModelMixin):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FavouritesSerializer
    queryset = Favourite

    def post(self, request, *args, **kwargs):
        product_id = kwargs.get('product_id')
        try:
            product = Product.objects.get(pk=product_id)
        except Exception:
            return JsonResponse({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        data = {'product_id': product_id}
        serializer = self.get_serializer(data=data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        # return self.create(request, *args, **kwargs)

    # def delete(self, request, *args, **kwargs):
    #     return self.destroy(request, *args, **kwargs)


class DBusketAPI(APIView):

    def get(self, request):  # Хуйня, исправить
        if request.GET['items'] != '':
            items = list(map(int, request.GET['items'].split(',')))
            products = Product.objects.filter(pk__in=items)
            serializer = ProductDetailsSerializer(products, many=True)
            return JsonResponse(serializer.data, safe=False)

        return JsonResponse([], safe=False)


class ProfileDataAPI(APIView):  # Тоже хуйня, переделать на генерики
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
                {'error': 'Неудачный вход, неверный логин или пароль.'},
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
                {'error': 'Пользователь с таким номером уже зарегистрирован. Выполните вход'},
                status=400)
