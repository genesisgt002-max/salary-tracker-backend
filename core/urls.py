from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SalaryListCreateView,
    ExpenseListCreateView,
    BalanceView,
    ExpenseViewSet,
    CategoryViewSet,
    MonthlySummaryView,
)

router = DefaultRouter()
router.register("expenses", ExpenseViewSet, basename="expenses")
router.register("categories", CategoryViewSet, basename="categories")

urlpatterns = [
    path("salary/", SalaryListCreateView.as_view(), name="salary"),
    path("balance/", BalanceView.as_view(), name="balance"),
    # Include all routes from the router
    path("", include(router.urls)),
    path("summary/", MonthlySummaryView.as_view()),
]
