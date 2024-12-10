from django.apps import AppConfig

class AdsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ads'

    def ready(self):
        # Import signals to ensure they're registered
        import ads.signals