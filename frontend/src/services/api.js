import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
}

export const signup = async (name, email, password) => {
    const { data } = await api.post('/auth/signup', {name, email, password });
    return data;
}


export const getProfile = async () => {
    const { data } = await api.get('/user/profile');
    return data;
}

export const updateProfile = async (name, password) => {
    const { data } = await api.put('/user/update', { name, password });
    return data;
}

export const getArticles = async () => {
    const { data } = await api.get('/articles/');
    console.log("HAMED",data);
    return data;
}

export const getArticle = async (id) => {
    const { data } = await api.get(`/articles/${id}`);
    return data;
}

export const createArticle = async (title, content) => {
    const { data } = await api.post('/articles/create', { title, content });
    return data;
}

export const updateArticle = async (id, title, content) => {
    const { data } = await api.put(`/articles/update/${id}`, { title, content });
    return data;
}

export const deleteArticle = async (id) => {
    const { data } = await api.delete(`/articles/delete/${id}`);
    return data;
}




