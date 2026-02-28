import { useState, useEffect } from "react";
import { getProjects, createProject, deleteProject } from "../api/projectApi";
import Tasks from "./Tasks";

interface Project {
  id: number;
  name: string;
  description: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    await createProject({ name, description });
    setName("");
    setDescription("");
    loadProjects();
  };

  const handleDelete = async (id: number) => {
    await deleteProject(id);

    // If the deleted project was selected, clear it
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }

    loadProjects();
  };

  return (
    <div>
      <h2>Projects</h2>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedProject(project)}
            >
              {project.name}
            </strong>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedProject && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Project: {selectedProject.name}</h3>
          <Tasks projectId={selectedProject.id} />
        </div>
      )}
    </div>
  );
};

export default Projects;