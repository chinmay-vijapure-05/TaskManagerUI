import { useEffect, useState } from "react";
import { getTasksByProject, createTask, deleteTask, updateTask } from "../api/taskApi";
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

  const handleUpdate = async (task: any, newStatus: string) => {
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

  return (
    <div>
      <h3>Tasks</h3>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select priority</option>
          <option value="URGENT">Urgent</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <DatePicker
          placeholderText="DueDate"
          selected={dueDate ? new Date(dueDate) : null}
          onChange={(date: Date | null) => {
            if (!date) {
              setDueDate("");
              return;
            }
            const pad = (n: number) => n.toString().padStart(2, "0");
            const formatted =
              `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
              `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
            setDueDate(formatted);
          }}
          dateFormat="yyyy-MM-dd"
        />
        <button type="submit">Create Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>

            <select
              value={task.status}
              onChange={(e) => handleUpdate(task, e.target.value as TaskStatus)}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="IN_REVIEW">IN_REVIEW</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>

            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
