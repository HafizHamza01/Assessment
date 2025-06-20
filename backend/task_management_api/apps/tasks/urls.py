from django.urls import path
from apps.tasks.api.v1.viewsets import GetTask, CreateTask, DeleteTask, UpdateTask, TasksCount


urlpatterns = [
    path('tasks/create/', CreateTask.as_view(), name="task-create"),
    path('tasks/get/', GetTask.as_view(), name="get-tasks"),
    path('tasks/delete/', DeleteTask.as_view(), name="task-delete"),
    path('tasks/update/', UpdateTask.as_view(), name="task-delete"),
    path('tasks/count/', TasksCount.as_view(), name="tasks-count")
]
