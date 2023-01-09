import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    return req;
});
export const  postTransaction= (authData) => API.post("/user/addTransaction", authData);
export const deleteTransaction = (id) => API.delete(`/user/deleteTransaction/${id}`);
export const getAllTransactions = () => API.get("/user/getTransactions");
export const updateTransaction = (id,updateData) => API.put(`user/updateTransaction/${id}`,updateData)
export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);
export const fetchAllUsers = () => API.get("/user/getAllUsers");
export const getUser=(id)=>API.get(`user/getCurrentUser/${id}`);
