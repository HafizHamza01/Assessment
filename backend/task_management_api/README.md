
## Task Management App

The Task Management App is a full-stack web application designed to help users efficiently organize, track, and manage their daily tasks.
Built with a modern tech stack:

Backend: Django REST Framework for API development
Frontend: React.js for a fast and responsive UI
Database: PostgreSQL for robust data storage

## Project Description
This application enables users to:
Create new tasks with relevant details like title, description, and status
View a list of all tasks in a clean and user-friendly interface
Edit existing tasks to update content or change the status (e.g., from "In Progress" to "Completed")
Delete tasks that are no longer needed


## Setup Instructions
git clone https://github.com/your-username/task-manager.git

cd backend/task_management_api


## Database
Configure postgress database

## virtual environment
python -m venv venv
source venv/bin/activate

## packages
pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
