from rest_framework import generics, permissions
from base.models import Cart, CartItem, Order
from base.serializers import CartSerializer, CartItemSerializer, OrderSerializer, CartItemSerializerNoProduct
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


class CartListCreateView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]  # Kullanıcı yetkilendirme kontrolü

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Yeni sepet oluşturulurken kullanıcının atanması

class CartRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]  # Kullanıcı yetkilendirme kontrolü

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(user=self.request.user)  # Yalnızca kullanıcının kendi sepetini getirmek için filtreleme

class CartItemCreateView(generics.CreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]  # Kullanıcı yetkilendirme kontrolü

class CartItemRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]  # Kullanıcı yetkilendirme kontrolü

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(cart__user=self.request.user)  # Yalnızca kullanıcının kendi sepetindeki ürünleri getirmek için filtreleme

class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]  # Kullanıcı yetkilendirme kontrolü

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Yeni sipariş oluşturulurken kullanıcının atanması

class OrderRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]  # Kullanıcı yetkilendirme kontrolü

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(user=self.request.user)  # Yalnızca kullanıcının kendi siparişlerini getirmek için filtreleme


@api_view(['POST'])
def create_cart_items_bulk(request):

    if request.method == 'POST':
        serializer = CartItemSerializerNoProduct(data=request.data, many=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Hataları yazdır
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)