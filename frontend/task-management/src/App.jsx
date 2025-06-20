import { useState, useEffect } from "react";
import TaskForm from "./Component/Form/TaskForm";
import "./App.css";
import axios from "axios";
import {
  task_detail,
  create_task,
  get_task,
  update_task,
  dalete_task,
} from "./Component/Constant";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [taskcount, setTaskscount] = useState({});
  const [tasks, setTasks] = useState([]);
  const [seletedTask, setSelectedTask] = useState(null);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const openForm = () => {
    setSelectedTask(null);
    setShowForm(true);
  };

  const handleUpdateTask = (task, Data) => {
    axios
      .put(update_task, Data, {
        params: { task_id: task.id },
      })
      .then((response) => {
        if (response){
          toast.success("Task created successfully!")
        }
        getTask();
        getTasksDetails();
        setShowForm(false);
        setSelectedTask(null);
      })
      .catch((error) => {
        if (error){
          toast.error("Something went wrong")
        }
      });
  };

  const handleCreateTask = (newTask) => {
    axios
      .post(create_task, newTask)
      .then((response) => {
        if (response){
          toast.success("Task created successfully!");
        }
        getTask();
        getTasksDetails();
        setShowForm(false);
      })
      .catch((error) => {
        if (error){
          toast.error("Something went wrong")
        }
      });
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const getTask = () => {
    axios
      .get(get_task)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const getTasksDetails = () => {
    axios
      .get(task_detail)
      .then((response) => {
        setTaskscount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleDelete = (task_id) => {
    const find_task = tasks.find((task) => task.id === task_id);
    axios
      .delete(dalete_task, {
        params: { task_id: task_id },
      })
      .then(() => {
        if (find_task && find_task.status === "Completed") {
          toast.error("Task can not delete, status Completed")
        }else{
          toast.success("Task deleted successfully!")
        }
        getTask();
        getTasksDetails();
      })
      .catch((error) => {
        if (error){
          toast.error("something went wrong")
        }
      });
  };

  const handleStatusChange = (requestedTask, updatedStatus) => {
    const findTask = tasks.find((task) => task.id === requestedTask.id);
    if (findTask) {
      findTask.status = updatedStatus;
    }

    axios
      .put(update_task, requestedTask, {
        params: { task_id: requestedTask.id },
      })
      .then((response) => {
        if (response){
          toast.success("status changed successfully!")
        }
        getTask();
        getTasksDetails();
      })
      .catch((error) => {
        if (error){
          console.error("Error updating task:", error);
        }
      });
  };

  useEffect(() => {
    getTasksDetails();
    getTask();
  }, []);

  const taskSummary = [
    { title: "Total Tasks", key: "total_tasks" },
    { title: "Completed Tasks", key: "completed_tasks" },
    { title: "In Progress", key: "inprogress_tasks" },
    { title: "To-do Tasks", key: "todo_tasks" },
  ];

  return (
    <div className="App">
      <ToastContainer />
      <nav className="navbar">
        <h1 className="logo">Task Manager</h1>
        <button className="add-task-btn" onClick={openForm}>
          Add Task
        </button>
      </nav>

      <div className="cards-container">
        {taskSummary.map(({ title, key }) => (
          <div className="task-detail-card" key={key}>
            <p className="card-detail-title">{title}</p>
            <p className="card-detail-value">{taskcount[key]}</p>
          </div>
        ))}
      </div>

      <div className={`grid-container ${tasks.length === 0 ? "empty" : ""}`}>
        {tasks.length === 0 ? (
          <div className="no-task-card">
            <h3 className="no-task-title">No tasks yet</h3>
            <p className="no-task-subtext">
              Create your first task to get started
            </p>
            <button className="create-task-btn" onClick={openForm}>
              Create Task
            </button>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-info">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-content">{task.content}</p>

                <select
                  className={`task-status ${
                    task.status === "Inprogress"
                      ? "inprogress"
                      : task.status === "Todo"
                      ? "todo"
                      : "completed"
                  }`}
                  value={task.status}
                  onChange={(e) => handleStatusChange(task, e.target.value)}
                >
                  <option value="Todo">Todo</option>
                  <option value="Inprogress">In-progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="task-action">
                <FaEdit
                  title="Edit"
                  className="task-icon"
                  onClick={() => handleEdit(task)}
                />
                <FaTrash
                  title="Delete"
                  className="task-icon"
                  onClick={() => handleDelete(task.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <TaskForm
          task={seletedTask}
          onCreate={handleCreateTask}
          onCancel={handleFormCancel}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
}

export default App;
