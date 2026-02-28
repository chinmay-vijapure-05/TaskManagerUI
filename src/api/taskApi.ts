import axiosClient from "./axiosClient";

export const getTasksByProject = async (projectId: number) => {
    const response = await axiosClient.get(`/api/tasks/project/${projectId}`);
    return response.data;
};

export const createTask = async (data: any) => {
    const response = await axiosClient.post("/api/tasks", data);
    return response.data;
  };

export const deleteTask = async (taskId: number) => {
    const response = await axiosClient.delete(`/api/tasks/${taskId}`);
    return response.data;
};

export const updateTask = async (taskId: number, data: any) => {
    const response = await axiosClient.put(`/api/tasks/${taskId}`, data);
    return response.data;
};