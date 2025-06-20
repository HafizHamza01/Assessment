from rest_framework.views import APIView
from .serializers import TaskSerializer
from rest_framework.response import Response
from rest_framework import status
from ...models import Task


class CreateTask(APIView):
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateTask(APIView):
    def put(self, request):
        task_id = request.GET.get("task_id")
        if not task_id:
            return Response({"error": "task_id is required"},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response({"error": "Task not found"},
                            status=status.HTTP_404_NOT_FOUND)

        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetTask(APIView):
    def get(self, request):
        task_id = request.GET.get("task_id")
        if task_id:
            try:
                task = Task.objects.get(id=task_id)
                serializer = TaskSerializer(task)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Task.DoesNotExist:
                return Response({"error": "Task not found"},
                                status=status.HTTP_404_NOT_FOUND)
        else:
            queryset = Task.objects.all()
            serializer = TaskSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteTask(APIView):
    def delete(self, request):
        task_id = request.GET.get("task_id")
        if not task_id:
            return Response({"Task id is required"},
                            status=status.HTTP_404_NOT_FOUND)

        try:
            task = Task.objects.filter(id=task_id).first()
            if task.status == "Completed":
                return Response("Task has Completed")
            task.delete()
            return Response({'message': 'Task deleted'},
                            status=status.HTTP_204_NO_CONTENT)
        except Task.DoesNotExist:
            return Response({"error": "Task not found"},
                            status=status.HTTP_404_NOT_FOUND)


class TasksCount(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        completed_tasks = tasks.filter(status="Completed")
        inprogress_tasks = tasks.filter(status="Inprogress")
        todo_tasks = tasks.filter(status="Todo")

        total_tasks = len(completed_tasks) + len(inprogress_tasks) + len(todo_tasks)

        counts = {
            "completed_tasks": len(completed_tasks),
            "inprogress_tasks": len(inprogress_tasks),
            "todo_tasks": len(todo_tasks),
            "total_tasks": total_tasks
        }

        return Response(counts, status=status.HTTP_200_OK)
