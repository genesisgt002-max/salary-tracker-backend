from rest_framework import serializers
from .models import Salary, Expense, Category

class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = '__all__'
        read_only_fields = ['user']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]

class ExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    class Meta:
        model = Expense
        fields = [
            "id",
            "title",
            "amount",
            "date",
            "category",       # FK ID (for POST)
            "category_name",  # readable name (for UI)
        ]
        read_only_fields = ["user"]

