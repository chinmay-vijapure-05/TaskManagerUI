import axiosClient from "./axiosClient";

export const login = async (email: string, password: string) => {
    const response = await axiosClient.post("/api/auth/login", {
        email,
        password
    });
    return response.data;
};

export const register = async (data: any) => {
    const response = await axiosClient.post("/api/auth/register", data);
    return response.data;
}