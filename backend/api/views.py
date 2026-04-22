from rest_framework import viewsets, generics, permissions
from django.contrib.auth.models import User
from .models import Task
from .serializers import TaskSerializer, UserSerializer

# Registration View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

# Task CRUD View
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff: # Admin sees all
            return Task.objects.all()
        return Task.objects.filter(owner=user) # User sees their own

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)