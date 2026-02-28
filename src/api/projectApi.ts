import axiosClient from "./axiosClient";

export const getProjects = async () => {    
    const response = await axiosClient.get('/api/projects');
    return response.data;
};

export const createProject = async (data: any) => {
    const response = await axiosClient.post('/api/projects', data);
    return response.data;
};

export const deleteProject = async (projectId: number) => {
    const response = await axiosClient.delete(`/api/projects/${projectId}`);
    return response.data;
};