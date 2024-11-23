from django.db import models

class Ad(models.Model):
    code = models.TextField()  # Field to store the ad code (HTML/JavaScript)
    start_date = models.DateField()
    end_date = models.DateField()
    active = models.BooleanField(default=True)
    location = models.CharField(max_length=100)  # Field to specify the ad location

    def __str__(self):
        return f"Ad for {self.location} (Active: {self.active})"
