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

    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }

    loadProjects();
  };

  return (
    <div className="projects-layout">
      <section className="card">
        <div className="projects-header">
          <h2 className="section-title">Projects</h2>
        </div>

        <form className="form-grid" onSubmit={handleCreate}>
          <div className="field">
            <label htmlFor="project-name">Name</label>
            <input
              id="project-name"
              className="input"
              type="text"
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="project-description">Description</label>
            <input
              id="project-description"
              className="input"
              type="text"
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Create project
          </button>
        </form>

        <ul className="project-list">
          {projects.map((project) => (
            <li
              key={project.id}
              className="project-item"
              onClick={() => setSelectedProject(project)}
            >
              <div>
                <div className="project-name">{project.name}</div>
                {project.description && (
                  <div className="project-meta">{project.description}</div>
                )}
              </div>
              <button
                className="btn btn-danger"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(project.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
          {projects.length === 0 && (
            <li className="muted">No projects yet. Create your first one.</li>
          )}
        </ul>
      </section>

      <section className="card tasks-section">
        {selectedProject ? (
          <>
            <div className="projects-header">
              <h3 className="section-title">
                Tasks for {selectedProject.name}
              </h3>
            </div>
            <Tasks projectId={selectedProject.id} />
          </>
        ) : (
          <p className="muted">
            Select a project on the left to view and manage its tasks.
          </p>
        )}
      </section>
    </div>
  );
};

export default Projects;