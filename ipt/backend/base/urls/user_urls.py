from django.urls import path

from base.views.user_views import (
    RegisterUserView,
    GetUserView,
    UserProfileView,
    UpdateUserProfileView,
    UpdateUserView,
    DeleteUserView,
    GetUserByIdView,
    CustomTokenObtainPairView
)

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', GetUserView.as_view(), name='get_users'),
    path('profile/<str:username>/', UserProfileView.as_view(), name='get_user_profile'),
    path('update/profile/<int:pk>/', UpdateUserProfileView.as_view(), name='update_user_profile'),
    path('user/update/', UpdateUserView.as_view(), name='update_user'),
    path('user/delete/<int:pk>/', DeleteUserView.as_view(), name='delete_user'),
    path('user/<int:pk>/', GetUserByIdView.as_view(), name='get_user_by_id'),
]
