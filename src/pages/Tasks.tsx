import { useEffect, useState } from "react";
import {
  getTasksByProject,
  createTask,
  deleteTask,
  updateTask,
} from "../api/taskApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "COMPLETED"
  | "CANCELLED";

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: string;
  dueDate: string;
}

const Tasks = ({ projectId }: { projectId: number }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");

  const loadTasks = async () => {
    const data = await getTasksByProject(projectId);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    await createTask({
      projectId,
      title,
      description,
      status: "TODO",
      priority,
      dueDate,
    });
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
    loadTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleUpdate = async (task: Task, newStatus: TaskStatus) => {
    await updateTask(task.id, {
      projectId,
      title: task.title,
      description: task.description,
      status: newStatus,
      priority: task.priority,
      dueDate: task.dueDate,
    });
    loadTasks();
  };

  const formatDueDate = (iso: string) => {
    if (!iso) return "No due date";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString();
  };

  const priorityClass = (priority: string) => {
    const key = priority.toLowerCase();
    if (key === "urgent") return "badge-priority-urgent";
    if (key === "high") return "badge-priority-high";
    if (key === "medium") return "badge-priority-medium";
    if (key === "low") return "badge-priority-low";
    return "";
  };

  const statusClass = (status: TaskStatus) => {
    switch (status) {
      case "TODO":
        return "badge-status-todo";
      case "IN_PROGRESS":
        return "badge-status-in_progress";
      case "IN_REVIEW":
        return "badge-status-in_review";
      case "COMPLETED":
        return "badge-status-completed";
      case "CANCELLED":
        return "badge-status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="tasks-section">
      <form className="task-form form-grid" onSubmit={handleCreate}>
        <div className="field">
          <label htmlFor="task-title">Title</label>
          <input
            id="task-title"
            className="input"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="task-description">Description</label>
          <input
            id="task-description"
            className="input"
            placeholder="Optional details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            className="select-input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select priority</option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="task-due-date">Due date</label>
          <DatePicker
            id="task-due-date"
            className="date-input"
            placeholderText="Select date"
            selected={dueDate ? new Date(dueDate) : null}
            onChange={(date: Date | null) => {
              if (!date) {
                setDueDate("");
                return;
              }
              const pad = (n: number) => n.toString().padStart(2, "0");
              const formatted =
                `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
                  date.getDate()
                )}` +
                `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
                  date.getSeconds()
                )}`;
              setDueDate(formatted);
            }}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Create task
        </button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-card">
            <div className="task-main">
              <div className="task-title">{task.title}</div>
              {task.description && (
                <div className="task-desc">{task.description}</div>
              )}
              <div className="task-meta-row">
                <span className={`badge ${statusClass(task.status)}`}>
                  {task.status.replace("_", " ")}
                </span>
                <span
                  className={`badge ${priorityClass(task.priority)}`}
                >
                  {task.priority}
                </span>
                <span className="muted">
                  Due: {formatDueDate(task.dueDate)}
                </span>
              </div>
            </div>

            <div className="task-actions">
              <select
                className="select-input task-status-select"
                value={task.status}
                onChange={(e) =>
                  handleUpdate(task, e.target.value as TaskStatus)
                }
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="IN_REVIEW">IN_REVIEW</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>

              <button
                className="btn btn-danger"
                type="button"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="muted">No tasks yet. Create your first task.</li>
        )}
      </ul>
    </div>
  );
};

export default Tasks;
