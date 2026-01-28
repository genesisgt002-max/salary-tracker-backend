from rest_framework import generics, permissions
from .models import Salary, Expense, Category
from .serializers import SalarySerializer, ExpenseSerializer, CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .services import calculate_balance

from rest_framework.viewsets import ModelViewSet
from datetime import date
from django.db.models import Sum

class MonthlySummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = date.today()
        year = today.year
        month = today.month

        salary = Salary.objects.filter(
            user=request.user,
            month__year=year,
            month__month=month
        ).aggregate(total=Sum("amount"))["total"] or 0

        expenses = Expense.objects.filter(
            user=request.user,
            date__year=year,
            date__month=month
        ).aggregate(total=Sum("amount"))["total"] or 0

        return Response({
            "total_income": salary,
            "total_expenses": expenses,
            "remaining_balance": salary - expenses
        })


class SalaryListCreateView(generics.ListCreateAPIView):
    serializer_class = SalarySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Salary.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ExpenseListCreateView(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

        


class BalanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        balance = calculate_balance(request.user)
        return Response({"balance": balance})
    

class ExpenseViewSet(ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

