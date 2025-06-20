from django.db import models


class Task(models.Model):
    TASK_STATUS = (
        ("Todo", "Todo"),
        ("Inprogress", "Inprogress"),
        ("Completed", "Completed")
    )
    title = models.CharField(max_length=250, blank=True, null=True)
    content = models.TextField()
    status = models.CharField(choices=TASK_STATUS, default="Todo")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
