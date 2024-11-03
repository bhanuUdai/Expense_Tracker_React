from django.apps import AppConfig
from .firebase import initialize_firebase

class ExpenseTrackerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'expense_tracker'

    def ready(self):
        initialize_firebase()