import axios from "axios";

const API = "http://localhost:3000/api/events";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getAllEvents = async () => {
    const res = await axios.get(`${API}/read`, authHeader());
    return res.data;
};

export const createEvent = async (data) => {
    await axios.post(`${API}/create`, data, authHeader());
};

export const updateEvent = async (id, data) => {
    await axios.put(`${API}/update/${id}`, data, authHeader());
};

export const deleteEvent = async (id) => {
    await axios.delete(`${API}/delete/${id}`, authHeader());
};
