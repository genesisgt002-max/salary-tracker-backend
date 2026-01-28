from .models import Salary, Expense
from django.db.models import Sum

def calculate_balance(user):
    salary = Salary.objects.filter(user=user).aggregate(total=Sum('amount'))['total'] or 0
    expenses = Expense.objects.filter(user=user).aggregate(total=Sum('amount'))['total'] or 0
    return salary - expenses
