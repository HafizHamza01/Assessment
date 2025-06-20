import { useState, useEffect } from "react";
import "./TaskForm.css";

function TaskForm({ task, onCreate, onCancel, onUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "Todo",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        content: task.content || "",
        status: task.status || "Todo",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && formData) {
      onUpdate(task, formData);
    } else if (formData) {
      onCreate(formData);
      setFormData({ title: "", content: "", status: "Todo" });
    } else {
      alert("Content is required.");
    }
  };

  return (
    <div className="modal">
      <div className="form-card">
        <div className="form-card-header">
          <h2 className="form-card-title">
            {task ? "Edit Task" : "Create Task"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Describe the task..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Todo">Todo</option>
              <option value="Inprogress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              {task ? "Update Task" : "Create Task"}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
